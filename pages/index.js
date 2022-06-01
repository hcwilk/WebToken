import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from 'react'
import Web3Modal from 'web3modal'
import {web_address} from '../webconfig';
import Web from '../artifacts/contracts/Web.sol/Web.json' 
import Oracle from '../artifacts/contracts/Oracle.sol/Oracle.json'
import {Contract, ethers} from 'ethers';
import { oracle_address } from '../../oracle_config'




export default function Home() {
	const [userWeb, setUserWeb] = useState(0);
	const [conversion, setConversion] = useState(0);
	const [newConversion, setNewConversion] = useState(0);
	const [loadingState, setLoadingState] = useState('not-loaded');
	const [gigs_C, setGigs_C] = useState(0);
	const [gigs_D, setGigs_D] = useState(0);
	const [web, setWeb] = useState(0);
	const [id, setId] = useState("213");
	const [id2, setId2] = useState("21212123");
  




	useEffect(()=>{
		init();
	
	  }, []);





	async function init(){
		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const WebContract = new ethers.Contract(web_address, Web.abi, signer );




		// const some_data = await OracleContract.requestData(12)

		// console.log(some_data)

		console.log(WebContract)

		const conversionn = await WebContract.get_conversion();
		console.log(conversionn)
		const conversionnn = parseInt(conversionn._hex)

		setConversion(conversionnn/10**9)

		const balance = await WebContract.get_bal();
		const balancee = parseInt(balance._hex)
		setUserWeb(balancee/1000000000)


		const contr = await WebContract.balanceOf(web_address)

		console.log(parseInt(contr._hex))
	

		setLoadingState("loaded")


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

		try{

		
		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const WebContract = new ethers.Contract(web_address, Web.abi, signer);
		console.log(gigs_C)

		const transaction = await WebContract.pay_host(gigs_C*1000000000,gigs_D*1000000000, '0xD6bf7fD245FC2Cc848264eA8bEAD5558299f2601')

		await transaction.wait()


		init()

		setId(Math.random().toString())
		}
		catch(error){
			console.log(error)
		}
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


	const checkEvents = async() => {

		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const OracleContract = new ethers.Contract(oracle_address, Oracle.abi, signer);

		console.log(OracleContract)

		OracleContract.on("DataRequested",(from,number) => {
			console.log("Got the event!");
			console.log(from,number.toString())
		})
	}

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

	async function buyWeb(_amount){
		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const WebContract = new ethers.Contract(web_address, Web.abi, signer);

		let tx = await WebContract.buy_web({value:_amount})

		await tx.wait()

		init()


	}





  return (
	<> 
  		<div key={id} className="h-screen flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500">

		  {loadingState!=='not-loaded' ? 
			(
				<div className="w-3/5 flex flex-col pt-12 gap-10 ">
						<div className="mx-auto flex w-fit flex-col gap-5 justify-center bg-gradient-to-l from-cyan-200 to-blue-200 rounded-2xl shadow-xl shadow-black">
							<div className='flex justify-center'>
								<h1 className=' text-4xl text-center'>   $.50 / Gig</h1>
							</div>
							<div className='flex justify-center'>
								<h1 className=' text-4xl text-center'>      WebTokens / Gig  =  {conversion/2}</h1>
							</div>
							<div className='flex justify-center'>
								<h1 className=' text-4xl text-center'>      WebTokens / Dollar =  {conversion}</h1>
							</div>
							<div className='flex justify-center'>
								<button className='bg-pink-200 rounded-full py-3 text-xl px-5 ml-10 hover:bg-pink-300' onClick={addd}>Add Web To Metamask!</button>
							</div>

							<div className='flex justify-center'>
								<h1 className='text-3xl'>Choose Monthly Plan!</h1>	
							</div>

							<div className='flex justify-center'>
								<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {buyWeb(10)}} >10 Gigs/month</button>
								<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {buyWeb(20)}} >20 Gigs/month</button>
								<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {buyWeb(50)}} >50 Gigs/month</button>
							</div>

							<div className='flex justify-center'>
								<h1 className=' text-4xl text-center'>      Current WebToken Balance =  {userWeb}</h1>
							</div>
							<div className='flex justify-center'>
								<input className='w-20 rounded-full text-center'   onChange={(e) => setNewConversion(e.target.value)}></input>
								<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={changeConversion} >Set Conversion</button>
							</div>
							
							

							

							


							
						</div>

						<div className=" flex flex-col justify-between  bg-gradient-to-l from-cyan-200 to-blue-200 rounded-2xl shadow-xl shadow-black">
							<div className='flex justify-center'>
								<input className='w-20 h-10 rounded-full mt-5 text-center' onChange={(e) => setGigs_C(e.target.value)}></input>
								<h1 className=' text-4xl mt-5 text-center'>  Gigs reported from Core</h1>
							</div>
							<div className='flex justify-center mt-2 pt-3 pr-1 pl-2'>

								<input className='w-20 rounded-full text-center' onChange={(e) => setGigs_D(e.target.value)}></input>
								<h1 className=' text-4xl text-center '> Gigs reported from User</h1>
							</div>


							
							<div className='flex justify-center mt-2 pt-3 pr-1 pl-2'>
								<button className='bg-blue-300 rounded-full px-5 text-2xl hover:bg-blue-400' onClick={() => {payHost()}}>End Session</button>
							</div>

							

							<div className='flex justify-center'>
							</div>

							<div className='flex justify-center'>
							</div>
					
						</div>

					

					<div className='mx-auto flex w-3/4 flex-col gap-3 justify-center bg-gradient-to-l from-cyan-200 to-blue-200 rounded-2xl shadow-xl shadow-black'>
						

					</div>


				</div>

			):(
				<p>Loading </p>
			)}
  		</div>
  </>

  )
}
