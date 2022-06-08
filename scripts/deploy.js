// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

//   const Oracle = await hre.ethers.getContractFactory("Oracle");
//   const oracle = await Oracle.deploy();

//   await oracle.deployed();

//   console.log("Oracle deployed to:", oracle.address);




  
//   const Stable = await hre.ethers.getContractFactory("Stable");
//   const stable = await Stable.deploy();

//   await stable.deployed();

//   console.log("Stable deployed to:", stable.address);

  const Web = await hre.ethers.getContractFactory("Web");
  const web = await Web.deploy(100);

  await web.deployed();

  console.log("Web deployed to:", web.address);




  



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // npx hardhat run --network PulseChain scripts/deploy.js 
  // npx hardhat run --network kovan scripts/deploy.js 
  //npx hardhat run --network localhost scripts/deploy.js
