//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";



contract Web is ERC20, ReentrancyGuard{

	address manager;

	// StableInterface public stable_contract;

	// mapping(address => bool) is_host;
	mapping(address => uint) redeemable_WEB;


	constructor(uint supply) ReentrancyGuard() ERC20("WebToken", "WEB") {
		manager = msg.sender;
		_mint(address(this),supply * 10**9);
		// stable_contract = StableInterface(_stable);
	}

	modifier manager_function(){
    	require(msg.sender==manager,"Only the manager can call this function");
    _;}

	// modifier host_function(){
    // require(is_host[msg.sender]==true,"Only a host can call this function");
    // _;}

	function get_bal() public view returns (uint){
		return balanceOf(msg.sender);
	}

	function decimals() public pure override returns (uint8) {
        return 9;
    }

	function setRedeemableWeb(address _host, uint _amount) public manager_function{
		redeemable_WEB[_host] += _amount;
	}

	function getRedeemableWeb() public view returns(uint){
		return redeemable_WEB[msg.sender];
	}


	// function add_host(address _host) external manager_function{
	// 	is_host[_host]=true;
	// }


	// What are we going to use to report this value to the contract?
	// Once the user session ends, something (assuming that we write) needs to feel these values into this contract
	function redeemWeb(uint _amount) external nonReentrant(){
		require(redeemable_WEB[msg.sender]>=_amount,"You don't have that much WEB to redeem!");
		redeemable_WEB[msg.sender]-=_amount;
		_mint(msg.sender,_amount);
	}

}
