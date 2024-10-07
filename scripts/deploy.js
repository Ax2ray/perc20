const { web3 } = require("hardhat");
const {
  abi,
  bytecode,
} = require("../artifacts/contracts/PERC20.sol/PERC20.json");

async function main() {
  // Dapatkan akun deployer dari jaringan
  const [deployer] = await web3.eth.getAccounts();
  console.log(`Deploying contract with the account: ${deployer}`);

  // Membuat instance kontrak dan deploy
  const perc20 = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: ["Sample PERC20", "xSWTR"], 
    })
    .send({
      from: deployer,
      gas: 1500000, // Batasi gas agar deploy lebih stabil
      gasPrice: web3.utils.toWei('20', 'gwei'), // Harga gas opsional
    });

  console.log(`PERC20Sample was deployed to ${perc20.options.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
