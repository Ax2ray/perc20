// Import necessary modules from Hardhat and SwisstronikJS
const { network, web3 } = require("hardhat");
const { abi } = require("../artifacts/contracts/PERC20.sol/PERC20.json");
const { SwisstronikPlugin } = require("@swisstronik/web3-plugin-swisstronik");

async function main() {
  web3.registerPlugin(new SwisstronikPlugin(network.config.url));

  const contractAddress = "0xBEc49fA140aCaA83533fB00A2BB19bDdd0290f25";

  const [from] = await web3.eth.getAccounts();
  const to = "0xbec49fa140acaa83533fb00a2bb19bddd0290f25";
  const amount = 1*10**18;

  console.log("Transferring tokens from account", from);

  const contract = new web3.eth.Contract(abi, contractAddress);

  const transferTx = await contract.methods.transfer(to, amount).send({ from });

  console.log("Transaction Receipt: ", transferTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});