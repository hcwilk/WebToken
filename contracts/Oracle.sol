//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;



contract Oracle{
	
	uint public global;


	constructor(){
		global = 4000000000;
	}

	event DataRequested(
		address indexed from,
		uint number
	);


	function requestData() public view returns(uint){
		return global;
	}

	function changeData(uint _number) public{
		global = _number;
	}


	
}