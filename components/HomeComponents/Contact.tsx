import Image from 'next/image'
import React from 'react'

const Contact = () => {
    return (
        <section className='general-container py-20 flex-center bg-[#F9FAFB] w-full'>
            <div className='flex items-center gap-6 w-full'>
                <div className='flex flex-col gap-4'>
                    <h6 className='text-[#7745A2] text-sm font-semibold uppercase'>Contact Us</h6>
                    <h2 className='text-black font-semibold text-[36px] leading-[45px]'>Our team is ready to <br /> support you.</h2>
                    <div className='pt-6 flex items-center gap-5'>
                        <div className='w-[48px] h-[48px] rounded-full flex-center bg-[#7745A21A]'>
                            <Image src={"/mail.svg"} alt='mail' width={24} height={24} />
                        </div>
                        <p className='text-[#707070] font-medium'>support@print.sa</p>
                    </div>
                    <div className='pt-6 flex items-center gap-5'>
                        <div className='w-[48px] h-[48px] rounded-full flex-center bg-[#7745A21A]'>
                            <Image src={"/mobile.svg"} alt='mobile' width={24} height={24} />
                        </div>
                        <p className='text-[#707070] font-medium'>(+966) 599139318</p>
                    </div>
                </div>


                <div className='ps-[96px] flex-1'>
                    <div className='p-12 rounded-[24px] bg-white shadow-form flex flex-col'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-6 w-full'>
                                <div className='flex items-center gap-6 w-full'>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <label htmlFor="name" className='text-black font-semibold text-sm'>Name</label>
                                        <input id='name' type="text" placeholder='Your name...' className='rounded-[6px] border border-[#E5E7EB] bg-white px-[17px] pt-[13.5px] pb-[14px]' />
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <label htmlFor="phone" className='text-black font-semibold text-sm'>Phone Number</label>
                                        <input id='phone' type="text" placeholder='Type phone number...' className='rounded-[6px] border border-[#E5E7EB] bg-white px-[17px] pt-[13.5px] pb-[14px]' />
                                    </div>
                                </div>
                                <div className='w-full flex flex-col gap-2'>
                                    <label htmlFor="email" className='text-black font-semibold text-sm'>Email Address</label>
                                    <input type="email" placeholder='Your email...' className='rounded-[6px] border border-[#E5E7EB] bg-white px-[17px] pt-[13.5px] pb-[14px]' />
                                </div>
                                <div className='w-full flex flex-col gap-2'>
                                    <label htmlFor="message" className='text-black font-semibold text-sm'>Email Address</label>
                                    <textarea name="message" id="message" placeholder='Type messages..' rows={4} className='rounded-[6px] border border-[#E5E7EB] bg-white px-[17px] pt-[13.5px] pb-[14px]'></textarea>
                                </div>
                            </div>

                            <div className='bg-[#ECECEC] py-[3.95px] pr-[15.79px] pl-[3.95px] rounded-[71.6px] shadow-item w-fit'>
                                <button className='flex items-center gap-[9.21px] cursor-pointer'>
                                    <div className='bg-[#7745A2] px-[42px] py-[13.16px] rounded-[26.23px] shadow-button'>
                                        <p className='font-medium text-white'>Send</p>
                                    </div>
                                    <Image src={"/arrowRightThick.svg"} alt='arrowRight' width={24} height={24}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact