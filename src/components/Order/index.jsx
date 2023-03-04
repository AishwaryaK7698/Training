/* eslint-disable array-callback-return */
/* eslint-disable no-mixed-operators */
import React, { useState } from 'react'
import Button from '../buttons'
import Animation from '../animation'
import Tablebody from '../tableBody'

export default function Order() {
    const [loader, setLoader] = useState(false)
    let state = {
        order_number: '',
        date: '',
        customer_name: '',
        total_amount: '',
        product_details: [{
            item_name: '',
            quantity: '',
            price_unit: '',
            total_price: ''
        }]
    }
    const [form, setForm] =  useState({
        order_number: '',
        date: '',
        customer_name: '',
        total_amount: '',
        product_details: [{
            item_name: '',
            quantity: '',
            price_unit: '',
            total_price: ''
        }]
    })
    const [error, setError] =  useState({
        order_number: false,
        date: false,
        customer_name: false,
        total_amount: false,
        // product_details: [{
        //     item_name: false,
        //     quantity: false,
        //     price_unit: false,
        //     total_price: false
        // }]
    })
    const [selectedItems, setSelectedItems] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [showList, setShowList] = useState(false)
    
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setForm((prevState) => ({
            ...prevState,
            [id]: value
        }));
    }
    const handleProductInputChange = (e, index) =>{
        e.preventDefault();
        const { id, value } = e.target;
        form.product_details[index][id] = value
        setForm((prevState) => ({
            ...prevState,
            product_details: form.product_details,
        }));
    }
    const validate = () => {
        let isvalid = true;
        Object.keys(form).forEach((key) => {
            switch (key) {
            case 'order_number':
            case 'date':
            case 'customer_name':
            case 'total_amount':
                if (key!=="product_details" && form[key] === '') {
                    setError((prevState) => ({
                        ...prevState,
                        [key]: `${key} is required`,
                    }));
                    isvalid = false;
                }
                break;
            case 'product_details':
                break;
            default: break;
            }
        });
        return isvalid;
    };
    const handleSubmit = (e)=>{
        e.preventDefault()
        setLoader(true);
        if(!validate()) {
            setLoader(false);
        }
        else{
        setShowList(true)
        let arr = [...selectedItems]
        let obj = {}
            if(!Object.keys(arr).includes(form['order_number'])){
                obj[form['order_number']] = form
            }
            arr.push(obj)
        setSelectedItems(arr)
        setLoader(false);
        }
        setForm({
            order_number: '',
            date: '',
            customer_name: '',
            total_amount: '',
            product_details: [{
                item_name: '',
                quantity: '',
                price_unit: '',
                total_price: ''
            }]
        })
        setError({
            order_number: false,
            date: false,
            customer_name: false,
            total_amount: false,
        })
    }
    
    const handleAdd = (e) =>{
        e.preventDefault()
        state = {
            item_name: '',
            quantity: '',
            price_unit: '',
            total_price: ''
        }
        setForm((prevState) => ({
            ...prevState,
            product_details: [...form.product_details, state]
        }));
    }
    const handleRemove = (e, index) =>{
        e.preventDefault()
        state = {
            item_name: '',
            quantity: '',
            price_unit: '',
            total_price: ''
        }
        form.product_details.splice(index, 1)
        setForm((prevState) => ({
            ...prevState,
            product_details: form.product_details
        }));
    }
    console.log(error, "error")
  return (
    <Animation>
        <div className='flex justify-center items-center flex-col'>
            <div className='border border-[#399c33] p-10 w-[1280px] mx-auto my-20'>
                <h1 className='text-bold text-[#000000] text-4xl pb-7'>ORDER PAGE1</h1>
                <form>
                    <div className='flex -mx-2.5'>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='order_number' className='text-base text-[#000000] font-bold mb-2.5'>Order No</label>
                            <input type="number" id='order_number' className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={form.order_number} onChange={(e)=>handleInputChange(e)}></input>
                            <p className='text-left text-xs text-red-800 py-1'>{error.order_number}</p>
                        </div>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='date' className='text-base text-[#000000] font-bold mb-2.5'>Purchase Date</label>
                            <input type="date" id='date' className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={form.date} onChange={(e)=>handleInputChange(e)}></input>
                            <p className='text-left text-xs text-red-800 py-1'>{error.date}</p>
                        </div>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='customer_name' className='text-base text-[#000000] font-bold mb-2.5'>Customer Name</label>
                            <input type="text" id='customer_name' className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={form.customer_name} onChange={(e)=>handleInputChange(e)}></input>
                            <p className='text-left text-xs text-red-800 py-1'>{error.customer_name}</p>
                        </div>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='total_amount' className='text-base text-[#000000] font-bold mb-2.5'>Total Amount</label>
                            <input type="number" id='total_amount' className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={form.total_amount} onChange={(e)=>handleInputChange(e)}></input>
                            <p className='text-left text-xs text-red-800 py-1'>{error.total_amount}</p>
                        </div>
                    </div>
                    {form.product_details.length>0 && form.product_details.map((product_detail, index = 0)=>(
                    <div className='flex -mx-2.5 mt-5 items-end'>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor="item_name" className='text-base text-[#6489d8] font-bold mb-2.5'>Enter Item Name</label>
                            <input id="item_name" type="text" className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={product_detail.item_name} onChange={(e)=>handleProductInputChange(e,index)}></input>
                        </div>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='quantity' className='text-base text-[#6489d8] font-bold mb-2.5'>Enter Quantity</label>
                            <input id='quantity' type="number" className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={product_detail.quantity} onChange={(e)=>handleProductInputChange(e,index)}></input>
                        </div>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='price_unit' className='text-base text-[#6489d8] font-bold mb-2.5'>Enter Price Unit</label>
                            <input id='price_unit' type="number" className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={product_detail.price_unit} onChange={(e)=>handleProductInputChange(e,index)}></input>
                        </div>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='total_price' className='text-base text-[#6489d8] font-bold mb-2.5'>Enter Total Price</label>
                            <input id='total_price' type="number" className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={product_detail.total_price} onChange={(e)=>handleProductInputChange(e,index)}></input>
                        </div>
                        {form.product_details.length>1&&<button type='button' className='bg-[#d31616] text-[#FFFFFF] rounded-2xl py-2 px-5 mr-3' onClick={(e)=>{handleRemove(e, index)}}>remove</button>}
                        <button type='button' className='bg-[#1633d3] text-[#FFFFFF] rounded-2xl py-2 px-5 disabled:bg-[#e9e9e9]' disabled={form.product_details.length-1!==index} onClick={(e)=>{handleAdd(e)}}>Add</button>
                    </div>))}
                    <div className='mt-5'>
                        <Button text="Save" onclick={(e)=>handleSubmit(e)} disabled={loader}/>
                    </div>
                </form>
            </div>
            {showList &&
                <div className='w-[600px]'>
                    <div className='flex'>
                        <div className='text-lg text-[#9d9d9d] font-semibold min-w-[230px] text-center'>ORDER NUMBER</div>
                        <div className='text-lg text-[#9d9d9d] font-semibold min-w-[230px] text-center'>ITEM(S)</div>
                    </div>
                    <Tablebody list={selectedItems} order={true}/>
                </div>
            }
        </div>
    </Animation>
  )
}
