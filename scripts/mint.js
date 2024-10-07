// Import necessary modules from Hardhat and SwisstronikJS
const { network, web3 } = require("hardhat");
const { abi } = require("../artifacts/contracts/PERC20.sol/PERC20.json");
const { SwisstronikPlugin } = require("@swisstronik/web3-plugin-swisstronik");

async function main() {
  web3.registerPlugin(new SwisstronikPlugin(network.config.url));
  const contractAddress = "0xBEc49fA140aCaA83533fB00A2BB19bDdd0290f25";
  const [from] = await web3.eth.getAccounts();

  console.log("Minting 100 tokens using account", from);
  const contract = new web3.eth.Contract(abi, contractAddress);
  
  const mintAmount = web3.utils.toWei("100", "ether"); 
  const mint100TokensTx = await contract.methods.mint(mintAmount).send({ from });

  console.log("Transaction Receipt: ", mint100TokensTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
