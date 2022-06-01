// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

contract Collection is ERC721, Ownable {
    struct NFT {
        uint256 price;
        string symbol;
        uint16 finalToken;
        uint16 initialToken;
        uint16 tokensMinted;
        bool exists;
    }

    string public baseURI;
    mapping(string => NFT) public NFTs;
    address[] public whitelistedAddresses;
    uint256 public saleDateTime;
    address payable public payments;

    constructor(
        string memory name,
        string memory symbol,
        string memory _newBaseURI,
        string[] memory nftSymbols,
        uint256[] memory nftPrices,
        uint16[] memory nftInitialTokens,
        uint16[] memory nftFinalTokens,
        address[] memory _whitelistedAddresses,
        uint256 _saleDateTime,
        address _payments
    ) ERC721(name, symbol) {
        setBaseURI(_newBaseURI);
        saleDateTime = _saleDateTime;
        whitelistedAddresses = _whitelistedAddresses;
        payments = payable(_payments);

        for (uint16 i = 0; i < nftSymbols.length; i++) {
            NFTs[nftSymbols[i]] = NFT({
                symbol: nftSymbols[i],
                price: nftPrices[i],
                initialToken: nftInitialTokens[i],
                finalToken: nftFinalTokens[i],
                tokensMinted: 0,
                exists: true
            });
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setWhitelistedAddresses(address[] memory _addresses)
        public
        onlyOwner
    {
        whitelistedAddresses = _addresses;
    }

    function setSaleDateTime(uint256 _saleDateTime) public onlyOwner {
        saleDateTime = _saleDateTime;
    }

    function isWhitelisted(address _user) public view returns (bool) {
        for (uint16 i = 0; i < whitelistedAddresses.length; i++) {
            if (whitelistedAddresses[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function safeMint(address to, string memory _symbol) public payable {
        require(
            block.timestamp >= saleDateTime || isWhitelisted(to),
            "Sale not started!"
        );

        NFT storage nft = NFTs[_symbol];

        require(nft.exists, "NFT not found");

        require(msg.value >= nft.price, "Insufficient funds!");

        uint256 tokenId = nft.initialToken + nft.tokensMinted;

        require(tokenId <= nft.finalToken, "Max limit reached!");

        nft.tokensMinted++;
        _safeMint(to, tokenId);
        (bool success, ) = payable(payments).call{value: address(this).balance}(
            ""
        );

        require(success);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
