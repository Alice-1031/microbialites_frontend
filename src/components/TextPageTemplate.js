import React from 'react';
import Navbar from './Navbar';
import image1 from '../assets/images/headerbar 1.png';
import '../assets/css/page.css'

const page = ({title, body}) => {
    return (
        <div className='page'>
            <Navbar/>
            <img src={image1} alt="" className='headerbar1Icon'/>
            <div className='aboutItem'>
                <div className='body'>{body}</div>
            </div>
            <b className='title'>{title}</b>
        </div>
    );
};

export default page;