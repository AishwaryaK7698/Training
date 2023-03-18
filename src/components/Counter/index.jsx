import React, { useState } from 'react'

export default function Counter() {

    const [count, setCount] = useState(1)

    return (
        <>
        <div>Counter</div>
        <button>-</button>
        <p>{count}</p>
        <button>+</button>
        </>
    )
}
