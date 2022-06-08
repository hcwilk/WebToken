import React, {useEffect, useState} from 'react'
import Web3Modal from 'web3modal'
import {web_address} from '../webconfig';
import Web from '../artifacts/contracts/Web.sol/Web.json' 
import Oracle from '../artifacts/contracts/Oracle.sol/Oracle.json'
import Stable from '../artifacts/contracts/Stable.sol/Stable.json'
import {Contract, ethers} from 'ethers';
import { oracle_address } from '../../oracle_config'
import { stable_add, stable_abi } from '../stable.config'
import axios from "axios";
import ExitTable from './Components/exit_table'







export default function Home() {
	const [userWeb, setUserWeb] = useState(0);
	const [user, setUser] = useState(1);
	const [data, setData] = useState(0);
	const [tower, setTower] = useState('a');
	const [userData, setUserData] = useState(0);
	const [conversion, setConversion] = useState(0);
	const [newConversion, setNewConversion] = useState(0);
	const [loadingState, setLoadingState] = useState('not-loaded');
	const [gigs_C, setGigs_C] = useState(0);
	const [gigs_D, setGigs_D] = useState(0);
	const [totalData, setTotalData] = useState(0);
	const [web, setWeb] = useState(0);
	const [id, setId] = useState("213");
	const [id2, setId2] = useState("21212123");
	const [burn, setBurn] = useState(0);
  

	useEffect(()=> {
		// axios.get('https://sheet.best/api/sheets/b4732bc1-b493-417e-9a28-60913dffe8a2')
		// .then((dataa) => {
		// 	setData(dataa.data)
		// 	console.log(dataa)
		
		// })

		console.log(totalData)

		init()



	},[])


	// useEffect(()=>{
	// 	window.localStorage.setItem('TOTAL_GIGS',totalData)
	
	//   }, [gigs_C]);




 
	async function init(){
		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const WebContract = new ethers.Contract(web_address, Web.abi, signer );
		const StableContract = new ethers.Contract(stable_add, Stable.abi, signer );

		console.log('signer',signer.provider.provider.selectedAddress)

		const data = await StableContract.balanceOf(signer.provider.provider.selectedAddress)

		console.log('balance shit',data)

		setUserData(parseInt(data._hex)/100000)




		// const some_data = await OracleContract.requestData(12)

		// console.log(some_data)

		console.log(WebContract) 

		const balance = await WebContract.get_bal();
		const balancee = parseInt(balance._hex)
		setUserWeb(balancee/1000000000)


		const contr = await WebContract.balanceOf(web_address)

		console.log(parseInt(contr._hex))
	

		setLoadingState("loaded")


	}


	function populateTable(){
		axios.get('https://sheet.best/api/sheets/b4732bc1-b493-417e-9a28-60913dffe8a2')
		.then((dataa) => {
			setData(dataa.data)
			console.log(dataa)
		})
	}

	async function changeConversion(){
		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const WebContract = new ethers.Contract(web_address, Web.abi, signer);

		const transaction2 = await WebContract.set_conversion(newConversion*(10**9));
		await transaction2.wait()


		init()
		setId(Math.random().toString())

	}


	async function payHost(){

		var sum = 0
		if(tower=='a'){
			for(var i = 0; i<data.length; i++){
				sum += parseFloat(data[i].a)
			}
		}
		else if(tower=='a'){
			for(var i = 0; i<data.length; i++){
				sum += parseFloat(data[i].b)
			}
		}
		else{
			for(var i = 0; i<data.length; i++){
				sum += parseFloat(data[i].c)
			}
		}

		

		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const WebContract = new ethers.Contract(web_address, Web.abi, signer);

		const what = Math.floor(1000000*sum)/1000000
		console.log(what)
		const tx = await WebContract.pay_host(Math.floor(what*1000000000), 4000000000)

		await tx.wait()




		console.log(tx)

	}


	async function addd(){
		console.log("bro")
	
		try {
		  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
		  const wasAdded = await ethereum.request({
			method: 'wallet_watchAsset',
			params: {
			  type: 'ERC20', // Initially only supports ERC20, but eventually more!
			  options: {
				address: web_address, // The address that the token is at.
				symbol: 'WEB', // A ticker symbol or shorthand, up to 5 chars.
				decimals: 9, // The number of decimals in the token
			  },
			},
		  });
	
		  init()
		
		  if (wasAdded) {
			console.log('Thanks for your interest!');
		  } else {
			console.log('Your loss!');
		  }
		} catch (error) {
		  console.log(error);
		}
	  }


	  async function adddd(){
	
		try {
		  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
		  const wasAdded = await ethereum.request({
			method: 'wallet_watchAsset',
			params: {
			  type: 'ERC20', // Initially only supports ERC20, but eventually more!
			  options: {
				address: stable_add, // The address that the token is at.
				symbol: 'RLY', // A ticker symbol or shorthand, up to 5 chars.
				decimals: 5, // The number of decimals in the token
			  },
			},
		  });
	
		  init()
		
		  if (wasAdded) {
			console.log('Thanks for your interest!');
		  } else {
			console.log('Your loss!');
		  }
		} catch (error) {
		  console.log(error);
		}
	  }


	// const checkEvents = async() => {

	// 	const web3Modal = new Web3Modal()
	// 	const connection = await web3Modal.connect()
	// 	const provider = new ethers.providers.Web3Provider(connection);
	// 	const signer = provider.getSigner();

	// 	const OracleContract = new ethers.Contract(oracle_address, Oracle.abi, signer);

	// 	console.log(OracleContract)

	// 	OracleContract.on("DataRequested",(from,number) => {
	// 		console.log("Got the event!");
	// 		console.log(from,number.toString())
	// 	})
	// }

	async function requestdata(){
		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const OracleContract = new ethers.Contract(oracle_address, Oracle.abi, signer);

		let tx = await OracleContract.requestData(32)

		await tx.wait()

		checkEvents()
	}

	async function buyData(_amount){
		axios.patch(`https://sheet.best/api/sheets/b4732bc1-b493-417e-9a28-60913dffe8a2/${user}/a`,gigs_C)
		.then((dataa) => {
			setData(dataa.data)
			console.log(dataa)

			setLoadingState('loaded')
		})
	}

	async function useData(_amount){
		setGigs_C(gigs_C+_amount)
		setGigs_D(gigs_D+_amount)
	}

	async function endSession(){
		let obj
		if(tower=='a'){
			const current = parseFloat(data[user-1].a)
			obj = {a:gigs_C + current}	
		}
		else if	(tower=='b'){
			const current = parseFloat(data[user-1].b)
			console.log('bro',current)
			obj = {b:gigs_C + current}	
		}
		else{
			const current = parseFloat(data[user-1].c)
			console.log(current)
			console.log(data[user-1].c)
			obj = {c:gigs_C + current}	
		}
		axios.patch(`https://sheet.best/api/sheets/b4732bc1-b493-417e-9a28-60913dffe8a2/user/${user}`,obj)
		.then((dataa) => {
			setData(dataa.data)
			console.log(dataa)

			setLoadingState('loaded')
		})
		setGigs_C(0)
		setGigs_D(0)
	}

	function changeUser(_user){
		setUser(_user)
		setGigs_C(0)
	}


	function changeTower(_tower){
		setTower(_tower)
		setGigs_C(0)
	}


	
	// async function exchange(_amount){
	// 	const web3Modal = new Web3Modal()
	// 	const connection = await web3Modal.connect()
	// 	const provider = new ethers.providers.Web3Provider(connection);
	// 	const signer = provider.getSigner();
	// 	const WebContract = new ethers.Contract(web_address, Web.abi, signer );
	// 	const StableContract = new ethers.Contract(stable_add, Stable.abi, signer);

	// 	console.log(_amount)

	// 	let tx = await StableContract.burn_stable(burn*100000)
	// 	await tx.wait()

	// 	let tx2 = await WebContract.exchange(burn*100000)

	// 	await tx2.wait()

	// 	setBurn(0)
	// 	init()
	// }





  return (
	<> 
  		<div className='flex flex-col gap-20'>
				<div className='flex justify-center'>
					<h1 className='text-4xl underline font-semibold'>Really</h1> 
					<h1 className='text-4xl font-semibold ml-8'>User {user}</h1> 
					<h1 className='text-4xl font-semibold ml-8'>Tower {tower}</h1> 
				</div>

				<div className='flex justify-center'>
					<h1 className=' text-4xl text-center'>      Current WebToken Balance =  {userWeb}</h1>
				</div>

				<div className='flex justify-center'>
					<h1 className='text-3xl mx-16'> Data Used : {gigs_C}</h1>
					<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {changeUser(1)}}>User 1</button>
					<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {changeUser(2)}}>User 2</button>
					<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {changeUser(3)}}>User 3</button>				
				</div>

				<div className='flex justify-center'>
					<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {changeTower('a')}}>Tower a</button>
					<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {changeTower('b')}}>Tower b</button>
					<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {changeTower('c')}}>Tower c</button>				
				</div>

				<div className='flex justify-center'>
					<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {useData(.1)}}>Use .1 gig</button>
					<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {useData(.5)}}>Use .5 gig</button>
					<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {useData(1)}}>Use 1 gig</button>				
				</div>

				<div className='flex justify-center '>
					<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {endSession()}}>End Session</button>
					<h1 className='text-2xl'>(Session ends when user disconnects from host)</h1>
				</div>

				{ totalData==0 ? ( 
				<></> 
				 ):( 
				<div className='flex justify-center mt-2 pt-3 pr-1 pl-2'>
					<h1 className='text-2xl'>Total GIGS used by Tower {tower} : {totalData}</h1>
				</div>
				)}

				<div className='flex justify-center mt-2 pt-3 pr-1 pl-2'>
					<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {payHost()}}>Pay Host</button>
					<h1 className='text-2xl'></h1>
				</div>
		</div>
	</>

  )
}
