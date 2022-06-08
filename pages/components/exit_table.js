import React, {useEffect, useState} from 'react'
import axios from 'axios';




export default function ExitTable( {data}) {
	const [loadingState, setLoadingState] = useState("not-loaded");
	const [actual, setActual] = useState([]);

    useEffect(()=>{
        init();
      }, []);

  






    async function init(){	
		// axios.get('https://sheet.best/api/sheets/b4732bc1-b493-417e-9a28-60913dffe8a2')
		// .then((dataa) => {
		// 	setData(dataa.data)
		// 	console.log(dataa)

		setActual(data)

		setLoadingState('loaded')
		// })
      }// eslint-disable-line react-hooks/exhaustive-deps
    
    
  return (
	  <> 
	  { loadingState!=='not-loaded' ? ( 
		<div className="w-full mx-auto">
			<div className="flex flex-col">
				<div className="overflow-x-auto shadow-md sm:rounded-lg">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden ">
							<table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
								<thead className="bg-gradient-to-r from-gray-500 to-gray-700 dark:bg-gray-700">
									<tr>
										<th scope="col" className=" text-center py-3   font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400">
										User
										</th>
										
										<th scope="col" className="flex justify-center py-3  text-center font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400">
											Data from Tower A
										</th>
										<th scope="col" className="text-center py-3  font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400">
											Data from Tower B
										</th>
										<th scope="col" className="text-center py-3   font-medium tracking-wider  text-gray-700 uppercase dark:text-gray-400">
											Data from Tower B
										</th>
										
									
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200 dark:bg-gradient-to-r from-gray-600 to-gray-800 dark:divide-gray-700">
									{data.map((user) => ( 
									<>
										<tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
											<td className="py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{user.user}</td>
											<td className="py-4  text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{user.a}</td>
											<td className="py-4  text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{user.c}</td>
											<td className="py-4  text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{user.c}</td>

										</tr>
				
									</>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	  ):( 
			<p>Loading</p>
	  )

									}
    </>)
  }
  