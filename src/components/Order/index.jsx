/* eslint-disable array-callback-return */
/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react'
import Button from '../buttons'
import Animation from '../animation'
import Tablebody from '../tableBody'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

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
    const [tempArr, setTempArr] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
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
        const arr = []
        Object.keys(form).forEach((key) => {
            switch (key) {
            case 'order_number':
            case 'date':
            case 'customer_name':
            case 'total_amount':
                if (key!=="product_details" && form[key] === '') {
                    arr.push(key)
                }
                break;
            case 'product_details':
                Object.values(form['product_details']).map((value)=>{
                    Object.keys(value).map((val)=>{
                        if(value[val]===""){
                            arr.push(val)
                        }
                    })
                })
                break;
            default: break;
            }
        });
        setTempArr(arr)
        return arr.length;
    };
    const handleSubmit = (e)=>{
        e.preventDefault()
        setLoader(true);
        if(validate()>0) {
            setLoader(false);
        }
        else{
            setShowList(true)
            let arr = [...selectedItems]
            let obj = {}
            if(arr.length>0){
                arr.map((item)=>{
                console.log(Object.keys(item).includes(form['order_number']),"lkkkk")
                if(Object.keys(item).includes(form['order_number'])===false){
                    obj[form['order_number']] = form
                }
                arr.push(obj)
            })}
            else{
                obj[form['order_number']] = form
                arr.push(obj)
            }
            setSelectedItems(arr)
            setLoader(false);
            setTempArr([])
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
        }
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
  return (
    <Animation>
        <div className='flex justify-center items-center flex-col'>
            <div className='border border-[#399c33] p-10 w-[1280px] mx-auto my-20'>
                <h1 className='text-bold text-[#000000] text-4xl pb-7'>ORDER PAGE</h1>
                <form>
                    <div className='flex -mx-2.5'>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='order_number' className='text-base text-[#000000] font-bold mb-2.5'>Order No</label>
                            <input type="number" id='order_number' className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={form.order_number} onChange={(e)=>handleInputChange(e)}></input>
                            {tempArr.includes("order_number")&&<p className='text-left text-xs text-red-700 py-1'>Please enter the order number</p>}
                        </div>
                        <div className='w-[250px] flex flex-col px-2.5 custom-date'>
                            <label htmlFor='date' className='text-base text-[#000000] font-bold mb-2.5'>Purchase Date</label>
                            {/* <input type="date" id='date' className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={form.date} onChange={(e)=>handleInputChange(e)}></input> */}
                            <Datepicker minDate={new Date()} selected={form.date} onChange={(date)=>setForm({...form,"date": date})}/>
                            {tempArr.includes("date")&&<p className='text-left text-xs text-red-700 py-1'>Please select the date</p>}
                        </div>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='customer_name' className='text-base text-[#000000] font-bold mb-2.5'>Customer Name</label>
                            <input type="text" id='customer_name' className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={form.customer_name} onChange={(e)=>handleInputChange(e)}></input>
                            {tempArr.includes("customer_name")&&<p className='text-left text-xs text-red-700 py-1'>Please enter customer name</p>}
                        </div>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='total_amount' className='text-base text-[#000000] font-bold mb-2.5'>Total Amount</label>
                            <input type="number" id='total_amount' className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={form.total_amount} onChange={(e)=>handleInputChange(e)}></input>
                            {tempArr.includes("total_amount")&&<p className='text-left text-xs text-red-700 py-1'>Please enter the total amount</p>}
                        </div>
                    </div>
                    {form.product_details.length>0 && form.product_details.map((product_detail, index = 0)=>(
                    <div className='flex -mx-2.5 mt-5 items-baseline '>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor="item_name" className='text-base text-[#6489d8] font-bold mb-2.5'>Enter Item Name</label>
                            <input id="item_name" type="text" className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={product_detail.item_name} onChange={(e)=>handleProductInputChange(e,index)}></input>
                            {tempArr.includes("item_name")&&<p className='text-left text-xs text-red-700 py-1'>Please enter the item name</p>}
                        </div>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='quantity' className='text-base text-[#6489d8] font-bold mb-2.5'>Enter Quantity</label>
                            <input id='quantity' type="number" className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={product_detail.quantity} onChange={(e)=>handleProductInputChange(e,index)}></input>
                            {tempArr.includes("quantity")&&<p className='text-left text-xs text-red-700 py-1'>Please enter the quantity</p>}
                        </div>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='price_unit' className='text-base text-[#6489d8] font-bold mb-2.5'>Enter Price Unit</label>
                            <input id='price_unit' type="number" className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={product_detail.price_unit} onChange={(e)=>handleProductInputChange(e,index)}></input>
                            {tempArr.includes("price_unit")&&<p className='text-left text-xs text-red-700 py-1'>Please enter the price unit</p>}
                        </div>
                        <div className='w-[250px] flex flex-col px-2.5'>
                            <label htmlFor='total_price' className='text-base text-[#6489d8] font-bold mb-2.5'>Enter Total Price</label>
                            <input id='total_price' type="number" className='border border-gray-500 text-sm text-[#000000] p-2.5 outline-0 font-normal' 
                            value={product_detail.total_price} onChange={(e)=>handleProductInputChange(e,index)}></input>
                            {tempArr.includes("total_price")&&<p className='text-left text-xs text-red-700 py-1'>Please enter the total prcie</p>}
                        </div>
                        <div className='flex self-center'>
                        {form.product_details.length>1&&<button type='button' className='bg-[#d31616] text-[#FFFFFF] rounded-2xl py-2 px-5 mr-3' onClick={(e)=>{handleRemove(e, index)}}>remove</button>}
                        <button type='button' className='bg-[#1633d3] text-[#FFFFFF] rounded-2xl py-2 px-5 disabled:bg-[#e9e9e9]' disabled={form.product_details.length-1!==index} onClick={(e)=>{handleAdd(e)}}>Add</button>
                        </div>
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
