

import React from 'react';
import { ReactTyped } from 'react-typed';
import { useNavigate} from 'react-router-dom';
import bannerImage from '../Pages/Publications/pub_1.jpg'

const Banner = () => {

  const navigate = useNavigate();

  // OnClick handler for the button
  const handleGetStarted = () => {
    navigate('/admission-form');
  };

  return (
    // https://t.ly/phRGB
    <div className="bg-center opacity w-full py-20 bg-no-repeat bg-cover " 
    style={{backgroundImage: `url(${bannerImage})`,
  }}>
     {/*Overlay to darken background */}
     <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className='max-w-7xl my-24 mx-auto  text-center font-bold '> 
        <div className='text-white  text-xl md:text-3xl md:p-6 '>
            We Don't Teach You
        </div>
        <h2 className='text-white blur-none text-2xl md:text-7xl md:p-6'>
          We Help You Learn 
        </h2> 
        <div className=' text-xl md:text-5xl text-white md:p-6'>
            
            <ReactTyped className='p-3'
            strings={['Pure English','Sure English','Any Board','Any Class']}
            typeSpeed={100}
            backSpeed={100}
            loop
            />
        </div>
        <button className='bg-black text-white p-3 rounded'
          onClick={handleGetStarted}
        >Get Started</button>

        </div>
    </div>
  )
}

export default Banner ;
