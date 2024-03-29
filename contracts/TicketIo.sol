// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract TicketFactory{

    using Counters for Counters.Counter;
    Counters.Counter public ticketCollectionId;
    // Id of ticket collection to it's address
    //Must keep track of ticket collection id in DB
    mapping(uint256 => address) public allCollections;

    // one of our wallets
    // potentially have an array of owners so the whole contract doesn't rely on just one wallet
    address public owner;

    constructor() {
        owner = msg.sender;
    } 

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function newTicketCollection(uint256 totalTickets, string memory baseURI) public onlyOwner {
        TicketCollection ticketCollection = new TicketCollection(totalTickets, msg.sender, baseURI);
        allCollections[Counters.current(ticketCollectionId)] = address(ticketCollection);
        ticketCollectionId.increment();
    }
}

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TicketCollection is ERC1155URIStorage {

    bytes private constant Prefix = '\x19Ethereum Signed Message:\n';
    uint256 private constant MinPrice = 1000000000000000;
    address private constant emptyAddress = 0x0000000000000000000000000000000000000000;
    // Fee to make safeTransferFrom
    uint public safeTransferFromFee = 1000000000000000;
    uint256 public ticketsMinted = 0;
    uint256 public maxTickets;
    address public owner;
    uint public startGas;
    uint public endGas;
    // alternatively we can just keep track of the price and in the mapping
    // We would then have to keep track of the owner of each sale item
    event TicketPurchased(address purchaser, uint256 ticketId);

    constructor(uint256 _maxTickets, address _owner, string memory _baseURI) ERC1155(_baseURI) {
        maxTickets = _maxTickets;
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(tokenId), Strings.toString(tokenId), ".json"));
    }

    function mint(address to) external onlyOwner returns (uint256) {
        startGas = gasleft();
        // current num tickets sold
        // if maxTickets == ticketCount then the last ticket already has been minted
        require(maxTickets >= ticketsMinted, "Sold out");
        // mint token with ticketCount being the ticketId
        _mint(to, ticketsMinted, 1, new bytes(0));
        // set IPFS link for NFT with ticketID
        // _setURI(ticketsMinted, tokenURI); 
        ticketsMinted += 1;
        endGas = startGas - gasleft();
        return ticketsMinted;
    }   

    // Generates Ids and amounts for the mintBatch function
    // Also Sets the uri for all tickets
    function _generateIdsAmounts(uint256 num) internal pure returns (uint256[] memory, uint256[] memory) {
        uint256[] memory ids = new uint256[](num);
        uint256[] memory amounts = new uint256[](num);
        for (uint i = 0; i < num; i++) {
            ids[i]= i;
            amounts[i] = 1;
            // set IPFS link for NFT with ticketID
            // _setURI(i, tokenUris[i]);
        }
        return (ids, amounts);
    }

    // Should only be called when called to mint first tickets
    function mintBatch(uint256 num, address to) external onlyOwner returns (uint256) {
        startGas = gasleft();
        // current num tickets sold
        require(ticketsMinted == 0, "Tickets already minted");
        // if maxTickets == ticketCount then the last ticket already has been minted
        require(maxTickets >= num, "Too many tickets");
        // Generating the ids and amounts arrays for the mintBatch command
        (uint256[] memory ids, uint256[] memory amounts) = _generateIdsAmounts(num);
        // mint token with ticketCount being the ticketId
        _mintBatch(to, ids, amounts, new bytes(0));
        ticketsMinted = num;
        endGas = startGas - gasleft();
        return ticketsMinted;
    }

    // recieves the message we assume the message hash to be and ensures they match and returns the signer of the messsagehash
    function _validateSignature(bytes memory message, bytes32 messageHash, uint8 v, bytes32 r, bytes32 s) pure internal returns(address) {
        bytes32 hash = keccak256(message);
        // ensures hashed message and messagehash parameter match
        require(messageHash == hash, "Invalid Message");
        address recoveredAddress = ECDSA.recover(messageHash, v, r, s);
        return recoveredAddress;
    }

    // Accepts the tokenId which is the token you want to trade and is used to retrieve the message we will compare to the message hash
    // Accepts all values of signed message from NFT owner that authorizing the owner to trade the specified NFT in the message for them
    function transferWithSignedMessage(address from, address to, uint256 tokenId, bytes32 messageHash, uint8 v, bytes32 r, bytes32 s) public onlyOwner {
        startGas = gasleft();
        // gets the uri from the tokenId
        bytes memory _uri = bytes(uri(tokenId));
        // gets the signer address
        address recoveredAddress = 
        _validateSignature(abi.encodePacked(Prefix, bytes(Strings.toString(_uri.length)), bytes(_uri)), messageHash, v, r, s);
        require(recoveredAddress == from, "Invalid Signer");
        // makes the transfer
        _safeTransferFrom(from, to, tokenId, 1, new bytes(0));
        endGas = startGas - gasleft();
    }

    // Users can call this function however we set the transactionFee that they pay
    // We can update the transaction fee by updating the safeTransferFromFee variable
    function paySafeTransferFromFee(address from, address to, uint256 id, uint256 amount, bytes memory data) external payable {
        require(msg.value >= safeTransferFromFee, "Insufficient fee");
        payable(owner).transfer(safeTransferFromFee); // Transfer the fee to the owner
        super.safeTransferFrom(from, to, id, amount, data);
    }

    // Ensure that only the owner can call this function
    // Because of this I don't think this NFT collection would be hosted on NFT platforms
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) public virtual onlyOwner override {
        super.safeTransferFrom(from, to, id, amount, data);
    }
}