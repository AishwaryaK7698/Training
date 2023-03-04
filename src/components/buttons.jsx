import React from 'react'

export default function Button({text, disabled, onclick}) {
  return (
        <button onClick={onclick} type='button' disabled={disabled} className={['py-2.5 px-10 text-lg mr-3 text-bold disabled:bg-opacity-[0.2] disabled:text-[#c0bebe] ', text==="Reset"?"bg-[#FFFFFF] border border-[#149e2b] text-[#149e2b]": "text-[#FFFFFF] bg-[#149e2b]"].join('')}>{text}</button>
  )
}
