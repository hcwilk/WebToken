//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";



contract Web is ERC20, ReentrancyGuard{

	address manager;

	constructor(uint supply) ReentrancyGuard() ERC20("WebToken", "WEB") {
		manager = msg.sender;
		// stable_contract = StableInterface(_stable);
	}

	modifier manager_function(){
    	require(msg.sender==manager,"Only the manager can call this function");
    _;}


	function get_bal() public view returns (uint){
		return balanceOf(msg.sender);
	}

	function decimals() public pure override returns (uint8) {
        return 9;
    }

	// What are we going to use to report this value to the contract? (CRON JOB)
	// Once the user session ends, something (assuming that we write) needs to feel these values into this contract
	function mintWeb(uint _amount, address _host) external nonReentrant(){
		_mint(_host,_amount);
	}

}
