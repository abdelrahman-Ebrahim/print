import React from 'react'

const Info = () => {
  return (
    <section className='general-container flex-center py-8 lg:py-10 lg:px-6 xlg:!py-20'>
        <div className='rounded-[18px] w-full py-8 px-8 shadow-info grid grid-cols-2 lg:grid-cols-4 gap-9 xlg:rounded-[36.28px] xlg:py-[47.77px] xlg:px-[97.95px] xlg:gap-[134.83px] max-w-[1920px] xlg:mx-auto'>
            <div className='flex flex-col items-center xlg:gap-[7.42px]'>
                <p className='font-medium text-black text-[32px] xlg:text-[40px]'>500<span className='text-[#7745A2]'>+</span></p>
                <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px]'>Print Agents</p>
            </div>
            <div className='flex flex-col items-center xlg:gap-[7.42px]'>
                <p className='font-medium text-black text-[32px] xlg:text-[40px]'>40<span className='text-[#7745A2]'>+</span></p>
                <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px]'>Cities Covered</p>
            </div>
            <div className='flex flex-col items-center xlg:gap-[7.42px]'>
                <p className='font-medium text-black text-[32px] xlg:text-[40px]'>1.2M<span className='text-[#7745A2]'>+</span></p>
                {/* Switching Text */}
                <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px] text-nowrap hidden lg:flex'>Documents Printed</p>
                <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px] flex lg:hidden'>Printed Files</p>
            </div>
            <div className='flex flex-col items-center xlg:gap-[7.42px]'>
                <p className='font-medium text-black text-[32px] xlg:text-[40px]'>200K<span className='text-[#7745A2]'>+</span></p>
                <p className='text-[#514F6E] font-medium text-center xlg:text-[22.25px]'>Active Users</p>
            </div>
        </div>
    </section>
  )
}

export default Info