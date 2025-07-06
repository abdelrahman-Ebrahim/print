import React from 'react'

const Info = () => {
  return (
    <section className='general-container flex-center py-20'>
        <div className='rounded-[36.28px] py-[47.77px] px-[97.95px] shadow-info flex items-center gap-[134.83px]'>
            <div className='flex flex-col items-center gap-[7.42px]'>
                <p className='font-medium text-[40px] text-black'>500<span className='text-[#7745A2]'>+</span></p>
                <p className='text-[#514F6E] font-medium text-[22.25px]'>Print Agents</p>
            </div>
            <div className='flex flex-col items-center gap-[7.42px]'>
                <p className='font-medium text-[40px] text-black'>40<span className='text-[#7745A2]'>+</span></p>
                <p className='text-[#514F6E] font-medium text-[22.25px]'>Cities Covered</p>
            </div>
            <div className='flex flex-col items-center gap-[7.42px]'>
                <p className='font-medium text-[40px] text-black'>1.2M<span className='text-[#7745A2]'>+</span></p>
                <p className='text-[#514F6E] font-medium text-[22.25px]'>Documents Printed</p>
            </div>
            <div className='flex flex-col items-center gap-[7.42px]'>
                <p className='font-medium text-[40px] text-black'>200K<span className='text-[#7745A2]'>+</span></p>
                <p className='text-[#514F6E] font-medium text-[22.25px]'>Active Users</p>
            </div>
        </div>
    </section>
  )
}

export default Info