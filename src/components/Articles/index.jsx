import React, { useState } from 'react'
import Button from '../buttons'
import { articleList } from './articles';
import Tablebody from '../tableBody';
import Animation from '../animation';
import { Link } from 'react-router-dom';

export default function Article() {
    const [list, setList] = useState(articleList)

    const handleSort = (sort) => {
        let sorted;
        if(sort==="Most Upvoted"){
            sorted = [...articleList].sort((a, b) => a["upvotes"] - b["upvotes"]).reverse();
        }
        else{
            sorted = [...articleList].sort((a, b) => a["date"] - b["date"]);
        }
        setList(sorted);
    };

  return (
    <Animation>
    <div className='flex justify-center flex-col items-center h-custom-1'>
        <div className='flex items-center mb-6'>
            <p className='text-[#726e6e] font-medium text-base mr-3'>SORT BY</p>
            <Button text="Most Upvoted" onclick={()=>handleSort("Most Upvoted")}/>
            <Button text="Most Recent" onclick={()=>handleSort("Most Recent")} />
        </div>
        <table className='shadow-2xl w-[800px]' aria-label="Outside Table">
            <thead>
                <tr>
                    <th className='text-[#726e6e] text-base font-medium min-w-[200px] p-5'>Title</th>
                    <th className='text-[#726e6e] text-base font-medium min-w-[130px] p-5'>Upvotes</th>
                    <th className='text-[#726e6e] text-base font-medium min-w-[100px] p-5'>Date</th>
                </tr>
            </thead>
            <Tablebody list={list} />
        </table>
        <div className='mt-5'>
            <Link to="/">
                <Button text="Click on previous page"/>
            </Link>
            <Link to="/order">
                <Button text="Click on next page"/>
            </Link>
        </div>
    </div>
    </Animation>
  )
}
