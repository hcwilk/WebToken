const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {

	console.log("what")

	
  

	it("Should work", async function () {

		const Web = await hre.ethers.getContractFactory("Web");
		const web = await Web.deploy();
	
		await web.deployed();

		console.log("Web deployed to:", web.address);


		await web.balanceOf()

	
	  });


	  it("Should read me a value", async function () {


		console.log("please",web.address)


	})
});
