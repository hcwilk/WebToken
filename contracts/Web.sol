//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";



contract Web is ERC20, ReentrancyGuard{

	address manager;

	constructor() ReentrancyGuard() ERC20("WebToken", "WEB") {
		manager = msg.sender;
		_mint(msg.sender,500);
	}

	function get_bal() public view returns (uint){
		return balanceOf(msg.sender);
	}

	function get_conversion () public view returns(uint){
		return 5;
	}


	function pay_host() external {
		transfer(msg.sender,10);

	}





}
