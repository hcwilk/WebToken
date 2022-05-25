//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";



contract Web is ERC20, ReentrancyGuard{

	address manager;
	uint conversion;

	mapping(address => bool) is_host;

	

	constructor(uint supply) ReentrancyGuard() ERC20("WebToken", "WEB") {
		manager = msg.sender;
		_mint(address(this),supply * 10**9);
		conversion =2000000000;
	}

	modifier manager_function(){
    require(msg.sender==manager,"Only the manager can call this function");
    _;}

	modifier host_function(){
    require(is_host[msg.sender]==true,"Only a host can call this function");
    _;}

	function get_bal() public view returns (uint){
		return balanceOf(msg.sender);
	}

	function decimals() public pure override returns (uint8) {
        return 9;
    }

	function add_host(address _host) external manager_function{
		is_host[_host]=true;
	}

	function set_conversion (uint _conversion) public{
		conversion = _conversion;
	}

	function get_conversion() public view returns(uint){
		// This is going to be a Chainlink call in production
		return conversion;
	}

	// Needs to be pulled from a Chainlink Oracle
	// Almost certain this means that we're going to need two contracts
	function get_web (uint _bytes) public view returns(uint){

		uint nanodollars = _bytes/2;

		uint web = (nanodollars * get_conversion())/(10**9);

		return web;
	}

	// What are we going to use to report this value to the contract?
	// Once the user session ends, something (assuming that we write) needs to feel these values into this contract
	function pay_host(uint _bytes_C, uint _bytes_D) external {
		require(_bytes_C==_bytes_D,"CORE DOES NOT AGREE WITH DEVICE");
		uint tokens_due = get_web((_bytes_C));
		_transfer(address(this),msg.sender,tokens_due);
	}


}
