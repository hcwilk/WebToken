//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;



interface OracleInterface {
	function requestData() external view returns(uint);

	function changeData(uint) external;
}