/* eslint-disable no-mixed-operators */
import React from 'react'

export default function Tablebody({list,order}) {
  return (
        <>
            {(order) ? 
                <>
                <div className='flex mt-5 border-t border-l border-r border-[#757070] flex-col'>
                    {list.length > 0 && list.map((item, index) => (
                        Object.keys(item).map((key)=>(
                            <>
                            <div className='flex border-b border-[#474545] w-full'>
                                <div className='w-1/2 bg-[#dde8f1] p-4'>Order {key}</div>
                                <div className='w-1/2 p-4'>
                                    {Object.keys(item[key]).map((order)=>(
                                        order==="product_details" &&
                                        (item[key]['product_details'].length>0 && Object.values(item[key]['product_details']).map((product_detail) => (
                                            <div className='border border-[#000000] p-4'>
                                                <div className='pb-5 flex items-center'>
                                                    <p className='text-[#000000] text-base font-semibold mr-2 min-w-[150px] text-left'>Name : </p>
                                                    <p className='text-[#000000] text-sm font-normal'>{product_detail['item_name']}</p>
                                                </div>
                                                <div className='pb-5 flex items-center'>
                                                    <p className='text-[#000000] text-base font-semibold mr-2 min-w-[150px] text-left'>Price Unit : </p>
                                                    <p className='text-[#000000] text-sm font-normal'>{product_detail['price_unit']}</p>
                                                </div>
                                                <div className='pb-5 flex items-center'>
                                                    <p className='text-[#000000] text-base font-semibold mr-2 min-w-[150px] text-left'>Quantity : </p>
                                                    <p className='text-[#000000] text-sm font-normal'>{product_detail['quantity']}</p>
                                                </div>
                                                <div className='pb-5 flex items-center'>
                                                    <p className='text-[#000000] text-base font-semibold mr-2 min-w-[150px] text-left'>Total Price : </p>
                                                    <p className='text-[#000000] text-sm font-normal'>{product_detail['total_price']}</p>
                                                </div>
                                            </div>
                                        )))
                                    ))}
                                </div>
                            </div>
                            </>
                        ))
                    ))}
                </div>
                </>
            :
            <tbody>
                {(list.map((item,index)=>(
                    <>
                    <tr key={index}>
                        <td className='text-[#000000] text-sm font-normal min-w-[200px] p-5'>{item.title}</td>
                        <td className='text-[#000000] text-sm font-normal min-w-[200px] p-5'>{item.upvotes}</td>
                        <td className='text-[#000000] text-sm font-normal min-w-[200px] p-5'>{item.date}</td>
                    </tr>
                    </>
                )))}
            </tbody>}
        </>  
        )
}

