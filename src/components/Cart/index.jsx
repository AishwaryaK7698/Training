/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom';
import Animation from '../animation';
import Button from '../buttons';
import CartContext from '../Context/cartContext';
import { dataService } from '../Services/data.service';

export default function CarList() {
    const [listData, setListData] = useState([])
    const {cartCount, setCartCount, cartItems, setCartItems} = useContext(CartContext)
    const [product_in_cart,setProduct_in_cart] = useState([])
    const [showCart, setShowCart] = useState(false)

    const fetchData = useCallback(async()=>{
        const data = await dataService.fetchData();
        setListData(data)
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleAddtoCart = (e, index, item)=>{
        e.preventDefault();
        const added_product = [...product_in_cart]
        added_product.push(index)
        setProduct_in_cart(added_product)
        const cart_items = [...cartItems]
        cart_items.push({
            id: item.id,
            description: item.description,
            price: item.price,
            title: item.title,
            image: item.image,
            quantity: 1
        })
        setCartItems(cart_items)
        setCartCount(cartCount+1)
    }
    const handleViewCart = ()=>{
        setShowCart(true)
    }
    const handleRemoveItem = (index)=>{
        if(cartItems.length===1){
            setShowCart(false)
        }
        const cartItemCopy = [...cartItems]
        cartItemCopy.splice(index, 1)
        const added_product = [...product_in_cart]
        added_product.splice(index,1)
        setProduct_in_cart(added_product)
        setCartItems(cartItemCopy)
        setCartCount(cartCount-1)
    }
    const handleClearAll = () =>{
        setCartItems([])
        setProduct_in_cart([])
        setCartCount(0)
    }
    const handleQuantity = (type, id, index)=>{
        const cart_items = [...cartItems]
            cartItems.map((item)=>{
                let temp = item.quantity
                if(item.id === id) {
                    if(type==="decrement"){
                        if(cart_items[index].quantity===1){
                            handleRemoveItem(index)
                        }
                        else{
                            cart_items[index].quantity = temp-1
                            setCartItems(cart_items)
                        }
                    }
                    else{
                        cart_items[index].quantity = temp+1
                        setCartItems(cart_items)
                    }
                }
            })
        }
    const getTotal = ()=>{
        let total = 0
        cartItems.map((item)=>(
            total+= item.quantity*item.price
        ))
        return total;
    }

    return (
        <>
        <Animation>
            <div className='bg-[#e5e4d4] mx-auto relative'>
                <div className='absolute top-5 right-5'>
                    <button type='button' className='relative'>
                        <img src='/assets/cart-icon-2.png' alt='cart-icon' className='w-[50px] mx-auto'  onClick={()=>handleViewCart()} />
                        <div className='absolute top-0 right-0 bg-[#ffffff] text-[#000000] w-5 h-5 flex justify-center items-center rounded-full font-semibold text-base'>{cartCount}</div>
                        {showCart && 
                            <div className='bg-[#FFFFFF] border border-[#0c1945] absolute top-0 right-0 w-[400px]'>
                                <div className='border-b border-[#0c1945] relative'>
                                    <p className='text-base text-[#0c1945] px-2.5 py-2 text-left font-semibold'>Your Shopping Cart</p>
                                    <div className='w-5 h-5 rounded-full flex justify-center items-center absolute -top-2 -right-3' onClick={()=>setShowCart(false)}>
                                        <img src='/assets/cart-icon1.png' alt='icon'/>
                                    </div>
                                </div>
                                <div className={['flex flex-col overflow-auto items-center ', cartItems.length>0? "h-auto": "h-[200px] justify-center"].join('')}>
                                    {cartItems.length>0 ? 
                                    <>
                                    {cartItems.map((item,index)=>(
                                        <div className='flex justify-between w-full px-2.5 py-3 mb-3'>
                                            <div className='w-[20%] mr-2.5'>
                                                <img src={item.image} alt='icon' className='w-[100px] h-[80px] mx-auto border border-[#646161] rounded-sm p-3' />
                                            </div>
                                            <div className='w-[80%] text-left relative pr-5'>
                                                <div className='flex items-center justify-between'>
                                                    <div>
                                                        <p className='text-sm text-[#0c1945] font-bold'>{item.title}</p>
                                                        <div className='flex items-center'>
                                                            <button className='w-[25px] h-[25px] rounded-full flex items-center justify-center text-2xl text-[#0c1945]' onClick={()=>handleQuantity("decrement", item.id, index)}>-</button>
                                                            <p className='text-base text-[#0c1945] font-semibold mx-2'>{item.quantity}</p>
                                                            <button className='w-[25px] h-[25px] rounded-full flex items-center justify-center text-lg text-[#0c1945]' onClick={()=>handleQuantity("increment", item.id, index)}>+</button>
                                                        </div>
                                                        <p className='text-lg text-[#000000] font-bold'>${item.price*item.quantity}</p>
                                                    </div>
                                                    <div className='ml-2'  onClick={()=>handleRemoveItem(index)}>
                                                        <button type='button' className='border border-[#0c1945] text-[#0c1945] px-2.5 py-2'>Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='w-full px-2.5 py-3 border-t border-[#0c1945]'>
                                        <div className='flex justify-between'>
                                            <p className='text-base text-[#0c1945] font-semibold mr-2'>SubTotal:</p>
                                            <p className='text-base text-[#0c1945] font-semibold'>{getTotal()}</p>
                                        </div>
                                        <div className='flex justify-between mt-2.5'>
                                            <button type='button' className='border border-[#0c1945] px-2.5 py-2 text-sm font-normal mr-2' onClick={()=>handleClearAll()}>EMPTY CART</button>
                                            <button type='button' className='bg-[#0c1945] text-[#FFFFFF] font-normal text-sm px-2.5 py-2'>CHECKOUT</button>
                                        </div>
                                    </div>
                                    </>
                                    :<p className='text-[#0c1945] text-base font-normal px-2.5'>You have no items in your shopping cart, start adding some</p>}
                                </div>
                            </div>
                        }
                    </button>
                </div>
                <div className='mx-auto pt-20 flex flex-wrap justify-between max-w-[1280px]'>
                {listData.length>0 && listData.map((item, index)=>(
                    <div className='w-[24%] p-5 mb-20 border border-[#000000] rounded-lg'>
                        <div className='bg-[#FFFFFF] w-[150px] h-[200px] flex justify-center items-center border border-[#070e48] mx-auto'>
                            <img src={item.image} alt='image' className="w-[100px]" />
                        </div>
                        <p className='py-3 text-[#070e48] font-semibold text-base truncate'>{item.title}</p>
                        <p className='text-[#000000] font-normal text-sm truncate'>{item.description}</p>
                        <div className='flex justify-between items-center pt-3'>
                            <p className='text-[#000000] font-normal text-base'><span className='font-semibold'>$</span>{item.price}</p>
                            {!product_in_cart.includes(index)?<Button text="QUICK ADD" onclick={(e)=>handleAddtoCart(e, index, item)} />:
                            <Button text="ADDED" disabled={product_in_cart.includes(index)}/>}
                        </div>
                    </div>
                ))}
                </div>
            </div>
            </Animation>
        </>
    )
}