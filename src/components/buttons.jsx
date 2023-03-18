import React from 'react'

export default function Button({text, disabled, onclick}) {
  return (
        <button onClick={onclick} type='button' disabled={disabled} className={['py-2.5 px-10 text-lg mr-3 text-bold ', text==="Reset"?"bg-[#FFFFFF] border border-[#149e2b] text-[#149e2b] disabled:bg-opacity-[0.2] disabled:text-[#c0bebe] ": (text==="QUICK ADD"?"bg-[#c53737] text-[#FFFFFF] px-5 rounded-md mr-0 text-base disabled:bg-opacity-[0.2] disabled:text-[#c0bebe] ":(text==="ADDED"?"rounded-md mr-0 bg-[#149e2b] px-5 text-[#FFFFFF] disabled:bg-[#55a763] disabled:text-[#FFFFFF] disabled:bg-opacity-100 ":"text-[#FFFFFF] bg-[#149e2b] disabled:bg-opacity-[0.2] disabled:text-[#c0bebe] "))].join('')}>{text}</button>
  )
}
