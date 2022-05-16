import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

export default function About (){
    return (
        <div className='martu'>
            <div className='contenedor'>
            <div className='about'>My first weather app  </div>
            <div className='nombre'>  Martina Ortiz Novero</div>
            {/* <div className='link'><button className='bontoncito'><Link to= "/cities" className='link2'>start</Link></button></div> */}
            <Link to= "/cities" className='link2'><div className='start'>start</div></Link>
            </div>
        </div>
    )
}