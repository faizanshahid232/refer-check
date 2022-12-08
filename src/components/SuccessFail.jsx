import React from 'react';

const SuccessFailure = () => {
    let success_failure = true;
    return (
        <>
        <div className='bg-[#181b1d] relative flex flex-col items-center min-h-screen overflow-hidden h-full'>
            <div className='py-4'>
                <img className='h-[30px]' src='/egold_logo_new.png'/>
            </div>
            {
            success_failure ? 
                <div className='flex flex-col items-center p-[30px] bg-[#25252f] b-rad rounded-[20px] my-5 w-[400px] border-[#6969ae] border-solid border-[2px]'>
                    <h3 className='text-white font-bold text-[16px] mb-5 text-center'>Email Verification Successfully</h3>
                    <img className='h-28' src='/success.png' />
                    <p className='text-[#c4d2fa] text-center mt-5'><a href='#'>Please click here to continue</a></p>
                </div>
            :
                <div className='flex flex-col items-center p-[30px] bg-[#25252f] b-rad rounded-[20px] my-5 w-[400px] border-[#ff0000] border-solid border-[2px]'>
                    <h3 className='text-white font-bold text-[16px] mb-5 text-center'>User Verification Error</h3>
                    <img className='h-28' src='/fail.png' />
                    <p className='text-[#c4d2fa] text-center mt-5'><a href='#'>Please Click here for more information</a></p>
                </div>
            }
        </div>
        </>
    );
}

export default SuccessFailure;