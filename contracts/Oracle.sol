//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Oracle{
	
	uint global;


	constructor(){
		global = 10;
	}

	event DataRequested(
		address indexed from,
		uint number
	);


	function requestData(uint _number) public {
		global = _number;


		emit DataRequested(msg.sender, _number);
	}


	
}