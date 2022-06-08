//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";



contract Web is ERC20, ReentrancyGuard{

	address manager;

	// StableInterface public stable_contract;

	mapping(address => bool) is_host;


	constructor(uint supply) ReentrancyGuard() ERC20("WebToken", "WEB") {
		manager = msg.sender;
		_mint(address(this),supply * 10**9);
		// stable_contract = StableInterface(_stable);
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


	// What are we going to use to report this value to the contract?
	// Once the user session ends, something (assuming that we write) needs to feel these values into this contract
	function pay_host(uint _bytes_C, uint conversion) external nonReentrant(){
		uint tokens_due = (_bytes_C * conversion)/(10**9);
		_mint(msg.sender,tokens_due);
	}

}
