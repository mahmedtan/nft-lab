require("dotenv").config();
const { API_URL, PUBLIC_KEY, PRIVATE_KEY } = process.env;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { default: axios } = require("axios");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/Collection.sol/Collection.json");
const contractAddress = "0x6163735b3272F06F39581b662Bc2aB378708E503";

const myFirstNFTContract = new web3.eth.Contract(contract.abi, contractAddress);

const mintNFT = async (tokenURI) => {
  const nonce = await web3.eth.getTransactionCount(
    "0x69a55359b46362a42752e35ff88119fecab88b20",
    "latest"
  );

  const tx = {
    from: "0x69a55359b46362a42752e35ff88119fecab88b20",
    to: contractAddress,
    nonce: nonce,
    gas: 8000000,
    value: web3.utils.toHex(web3.utils.toWei("1")),
    maxPriorityFeePerGas: "39999999999",
    data: myFirstNFTContract.methods
      .mint("0x69a55359b46362a42752e35ff88119fecab88b20", tokenURI)
      .encodeABI(),
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    `0xdd07e511c7794bfc3fc67275d26e74952248ed327a1ae968699df9b770713e1b`
  );

  const txReceipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction
  );
};

mintNFT(21);
