//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



contract Stable is ERC20{

	
	constructor()  ERC20("ReallyToken", "RLY") {
		
	}

	function decimals() public pure override returns (uint8) {
        return 5;
    }

	// In production, this is going to be plugged with a certain payment provider so they pay in cash
	function payment_plan() public payable {
		uint _amount = msg.value;

		require(_amount>0,"You must send something");

		_mint(msg.sender,_amount*100000);
	}

	function pay_host(address _host, uint _credits) external {
		_transfer(msg.sender,_host,_credits);
	}

	function burn_stable(uint amount) public {
		_burn(msg.sender,amount);
	}


}
