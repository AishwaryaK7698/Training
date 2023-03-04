import React, { useState } from 'react'
import { tasks } from './workout-tasks'
import Button from '../buttons'
import Animation from '../animation'
import { Link } from 'react-router-dom'


export default function Workouts() {
    const [pages, setPages] = useState(0)

  return (
    <Animation>
    <div className='flex justify-center items-center h-screen flex-col'>
        <div className='mb-7'>
            <Button text="Reset" onclick={() => setPages(0) } />
            <Button text="Prev" disabled={pages<1} onclick={() => setPages(pages - 1) } />
            <Button text="Next" disabled={pages===tasks.length-1} onclick={() => setPages(pages + 1) } />
        </div>
        <div className='bg-[#FFFFFF] shadow-xl min-w-[700px] p-10 flex h-[400px] justify-center items-center'>
                <div>
                    <div className='text-4xl text-[#000000] font-bold pb-10'>{tasks[pages].name}</div>
                    <div className='text-lg text-[#000000] font-normal'>{tasks[pages].desc}</div>
                </div>
        </div>
        <Link to="articles" className='mt-5'>
          <Button text="Click on next page"/>
        </Link>
    </div>
    </Animation>
  )
}
