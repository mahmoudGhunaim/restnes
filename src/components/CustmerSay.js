import React from 'react'
import "./style/CustmerSay.css"
const CustmerSay = ({imgSrc,des,location,Name}) => {
  return (
    <div className='slider-sec'>
        <div className='slider-container'>
            <div className='slider-img'>
                <img src={imgSrc}/>
            </div>
            <div className='slider-right'>
                <img src='”.svg'/>
                <p className='des'>{des}</p>
                <h3>{Name}</h3>
                <p className='location'>{location}</p>
            </div>
        </div>
    </div>
  )
}

export default CustmerSay