import Image from 'next/image'
import React from 'react'

const Contact = () => {
    return (
        <section className='general-container py-8 flex-center bg-[#F9FAFB] w-full lg:py-10 xlg:!py-20'>
            <div className='flex flex-col items-center gap-6 w-full lg:flex-row lg:justify-between'>
                <div className='flex flex-col items-center gap-4 lg:items-start'>
                    <h6 className='text-[#7745A2] text-sm font-semibold uppercase'>Contact Us</h6>
                    <h2 className='text-black font-semibold text-center text-[22px] leading-[26px] lg:text-start lg:text-[28px] xlg:!leading-[45px] xlg:!text-[36px]'>Our team is ready to <br /> support you.</h2>
                    <div className='pt-6 flex items-center flex-col lg:flex-row gap-3 lg:gap-5'>
                        <div className='w-[48px] h-[48px] rounded-full flex-center bg-[#7745A21A]'>
                            <Image src={"/mail.svg"} alt='mail' width={24} height={24} />
                        </div>
                        <p className='text-[#707070] font-medium'>support@print.sa</p>
                        <p className='block text-[#7745A2] font-bold uppercase cursor-pointer lg:hidden'>say hello</p>
                    </div>
                    <div className='pt-6 flex items-center flex-col lg:flex-row gap-3 lg:gap-5'>
                        <div className='w-[48px] h-[48px] rounded-full flex-center bg-[#7745A21A]'>
                            <Image src={"/mobile.svg"} alt='mobile' width={24} height={24} />
                        </div>
                        <p className='text-[#707070] font-medium'>(+966) 599139318</p>
                        <p className='block text-[#7745A2] font-bold uppercase cursor-pointer lg:hidden'>call now</p>
                    </div>
                </div>


                <div className='flex-1 w-[359px] max-[375px]:w-[310px] md:w-[567px] lg:ps-5 lg:w-[500px] xl:w-fit xl:ps-10 xlg:!ps-[96px] max-w-[809px]'>
                    <div className='p-12 rounded-[24px] bg-white shadow-form flex flex-col'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-6 w-full'>
                                <div className='flex flex-col items-center gap-6 lg:flex-row w-full'>
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

                            <div className='bg-[#ECECEC] py-[2.73px] pl-[2.73px] pr-[10.91px] rounded-[49.47px] shadow-item w-fit self-center lg:py-[3.95px] lg:pr-[15.79px] lg:pl-[3.95px] lg:rounded-[71.6px] lg:self-start'>
                                <button className='flex items-center gap-[6.37px] lg:gap-[9.21px] cursor-pointer'>
                                    <div className='bg-[#7745A2] px-[29.02px] py-[9.09px] rounded-[18.19px] shadow-button lg:px-[42px] lg:py-[13.16px] lg:rounded-[26.23px]'>
                                        <p className='font-medium text-white text-[10.91px] lg:text-base'>Send</p>
                                    </div>
                                    <Image src={"/arrowRightThick.svg"} alt='arrowRight' width={24} height={24} className='w-[14px] h-[14px] lg:w-[24px] lg:h-[24px]'/>
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