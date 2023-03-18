import React, {useContext } from 'react'
import Animation from '../animation';
import CartContext from '../Context/cartContext';

export default function CartView() {
    const {cartItems, setCartItems} = useContext(CartContext)

    const handleQuantity = (type, id, index)=>{
        const dummyArray = [...cartItems]
        cartItems.map((item)=>{
            let temp = item.quantity
            if(item.id === id) {
                if(type==="decrement"){
                    dummyArray[index].quantity = temp-1
                }
                else{
                    dummyArray[index].quantity = temp+1
                }
            }
        })
        setCartItems(dummyArray)
    }
    const handleRemoveItem = (e, index)=>{
        e.preventDefault();
        const dummyArray = [...cartItems]
        dummyArray.splice(index, 1)
        setCartItems(dummyArray)
    }
    const handleClearAll = () =>{
        setCartItems([])
    }

    return(
        <>
        <Animation>
            <div className='w-[1280px] mx-auto py-20'>
                {cartItems.length>0&&<button type='button' className='underline text-lg text-[#243978] font-normal text-end mb-3 w-full' onClick={()=>handleClearAll()}>Clear All</button>}
                {cartItems.length>0 ?
                cartItems.map((item,index)=>(
                    <div className='flex border border-[#646161] rounded-lg p-5 mb-3'>
                        <div className='w-[20%]'>
                            <img src={item.image} alt='icon' className='w-[200px] h-[200px] mx-auto' />
                        </div>
                        <div className='w-[80%] text-left relative pr-5'>
                            <button type='button' className='absolute top-0 right-5' onClick={(e)=>handleRemoveItem(e, index)}>
                                <img src='/assets/delete-icon.jpg' alt='icon' className='w-[25px]'/>
                            </button>
                            <p className='text-xl text-[#000000] font-bold'>{item.title}</p>
                            <p className='text-base text-[#000000] font-normal py-3'>{item.description}</p>
                            <div className='flex justify-between'>
                            <div className='flex items-center'>
                                <button className='w-[25px] h-[25px] rounded-full border border-[#615b5b] bg-[#d3cfcf] flex items-center justify-center text-lg text-[#000000] disabled:opacity-50' disabled={item.quantity===1} onClick={()=>handleQuantity("decrement", item.id, index)}>-</button>
                                <p className='text-lg text-[#000000] font-semibold mx-3'>{item.quantity}</p>
                                <button className='w-[25px] h-[25px] rounded-full border border-[#615b5b] bg-[#d3cfcf] flex items-center justify-center text-lg text-[#000000]' onClick={()=>handleQuantity("increment", item.id, index)}>+</button>
                            </div>
                            <p className='text-2xl text-[#25316e] font-bold'>${item.price*item.quantity}</p>
                            </div>
                        </div>
                    </div>
                )):
                <div>
                    <div className='flex flex-col items-center h-custom-2 justify-center'>
                        <img src='/assets/empty-cart.png' alt='icon' />
                        <p className='text-lg text-[#000000] font-normal mt-10'>Oops..! Your cart is empty <br />Looks like you haven't made any choices yet.</p>
                    </div>
                </div>
                }
            </div>
            </Animation>
        </>
    )
}