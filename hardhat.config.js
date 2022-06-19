require("@nomiclabs/hardhat-waffle");
const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

console.log(process.env.SHIT)
module.exports = {
  networks: {
    hardhat:{
      chainId:  1337
    },
    PulseChain:{
      url: `https://rpc.v2b.testnet.pulsechain.com`,
      accounts: [privateKey]
    },
	kovan:{
		url:'https://kovan.infura.io/v3/d06042096f7a48b9949608c385bc8ba7',
		accounts: [privateKey]
	},
	rink:{
		url:'https://rinkeby.infura.io/v3/7fc3dd2a897d4441b5efd32fd756bb0e',
		accounts: [privateKey]
	},

  },
  solidity: "0.8.4",
};
