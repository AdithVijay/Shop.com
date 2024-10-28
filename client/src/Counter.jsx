import React, { useState } from 'react'

const Counter = () => {
    const [data, setdata] = useState(1);
    function plus(){
        setdata(data+1)
    }
    function minus(){
        if(data > 1){
            setdata(data-1)
        }
    }
  return (
    <div className=' flex gap-5'>
        <button onClick={plus}>+</button>
        <p>{data}</p>
        <button onClick={minus}>-</button>
    </div>
  )
}

export default Counter
