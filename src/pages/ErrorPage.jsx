import Lottie from 'lottie-react';
import error from '../assets/error.json'
import { Link, useRouteError } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

const ErrorPage = () => {
    const errorS = useRouteError()
    const status = errorS?.status
    const statusText = errorS?.statusText
    const errorCode = errorS?.error?.message

     useEffect(()=>{
        window.scrollTo(0,0)
      },[])

    return (
        <div className='h-screen flex items-center justify-center flex-col'>
             <Helmet>
                          <title>Error | Service Scope</title>
                        </Helmet>
            <Lottie className='w-44 lg:w-64' animationData={error}></Lottie>
            <h1 className='text-xl lg:text-3xl font-semibold'>{status}</h1>
            <h2 className=' lg:text-lg font-medium'>{statusText}</h2>
            <h3>{errorCode}</h3>
            <Link to='/' className='btn bg-pColor rounded-full px-8 min-h-max h-max py-3 text-white my-3'>Back to Home</Link>
        </div>
    );
};

export default ErrorPage;