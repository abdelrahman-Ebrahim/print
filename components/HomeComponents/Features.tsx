import Image from 'next/image'
import React from 'react'

const Features = () => {
    return (
        <section className='general-container py-20 flex-col gap-[45px] w-full flex-center'>
            <h6 className='text-[#7745A2] uppercase font-semibold text-sm'>features</h6>
            <div className='flex items-start gap-[186px]'>
                <div className='flex flex-col items-center gap-[21.07px]'>
                    <div className='flex-center flex-col w-[272.97px] rounded-[15.8px] py-[21.07px] px-[14.04px] bg-[#7745A214]'>
                        <div className='flex-center w-[70.22px] h-[70.22px] rounded-tr-[28.09px] rounded-br-[49.15px] rounded-tl-[52.31px] rounded-bl-[66.71px] p-[0.88px] border-[0.88px] border-[#E5E7EB] bg-[#7745A21A]'>
                            <Image src={"/file-upload.svg"} alt='fileupload' width={35.11} height={35.11} />
                        </div>
                        <p className='font-semibold text-[17.55px] text-black pt-[14.04px]'>Upload files in seconds</p>
                        <p className='text-sm text-[#4B5563] pt-[7.02px]'>Select from your phone.</p>
                    </div>
                    <div className='flex-center flex-col w-[272.97px] rounded-[15.8px] py-[21.07px] px-[14.04px]'>
                        <div className='flex-center w-[70.22px] h-[70.22px] rounded-tr-[28.09px] rounded-br-[49.15px] rounded-tl-[52.31px] rounded-bl-[66.71px] p-[0.88px] border-[0.88px] border-[#E5E7EB] bg-[#7745A21A]'>
                            <Image src={"/settings.svg"} alt='fileupload' width={35.11} height={35.11} />
                        </div>
                        <p className='font-semibold text-[17.55px] text-black pt-[14.04px]'>Upload files in seconds</p>
                        <p className='text-sm text-[#4B5563] pt-[7.02px]'>Select from your phone.</p>
                    </div>
                    <div className='flex-center flex-col w-[272.97px] rounded-[15.8px] py-[21.07px] px-[14.04px]'>
                        <div className='flex-center w-[70.22px] h-[70.22px] rounded-tr-[28.09px] rounded-br-[49.15px] rounded-tl-[52.31px] rounded-bl-[66.71px] p-[0.88px] border-[0.88px] border-[#E5E7EB] bg-[#7745A21A]'>
                            <Image src={"/store.svg"} alt='fileupload' width={35.11} height={35.11} />
                        </div>
                        <p className='font-semibold text-[17.55px] text-black pt-[14.04px]'>Upload files in seconds</p>
                        <p className='text-sm text-[#4B5563] pt-[7.02px]'>Select from your phone.</p>
                    </div>
                    <div className='flex-center flex-col w-[272.97px] rounded-[15.8px] py-[21.07px] px-[14.04px]'>
                        <div className='flex-center w-[70.22px] h-[70.22px] rounded-tr-[28.09px] rounded-br-[49.15px] rounded-tl-[52.31px] rounded-bl-[66.71px] p-[0.88px] border-[0.88px] border-[#E5E7EB] bg-[#7745A21A]'>
                            <Image src={"/package.svg"} alt='fileupload' width={35.11} height={35.11} />
                        </div>
                        <p className='font-semibold text-[17.55px] text-black pt-[14.04px]'>Upload files in seconds</p>
                        <p className='text-sm text-[#4B5563] pt-[7.02px]'>Select from your phone.</p>
                    </div>

                    <div className='flex items-center gap-[5px]'>
                        <div className='w-[11px] h-[11px] rounded-full bg-[#7745A2]' />
                        <div className='w-[11px] h-[11px] border-[0.8px] border-[#A3A3A3] rounded-full' />
                        <div className='w-[11px] h-[11px] border-[0.8px] border-[#A3A3A3] rounded-full' />
                        <div className='w-[11px] h-[11px] border-[0.8px] border-[#A3A3A3] rounded-full' />
                    </div>
                </div>

                <div className='self-center relative w-[545.37px] flex-center'>
                    {/* Phone Image - maintains original size */}
                    <Image
                        src={"/iPhonelight.svg"}
                        alt='iPhone'
                        width={284.2}
                        height={591.76}
                        className="relative z-10"
                    />

                    {/* Radial circles - smaller than phone */}
                    <div className='absolute inset-0 flex-center'>
                        <div className='w-[75%] h-[75%] bg-[#7745A21A] rounded-full flex-center'>
                            <div className='w-[88.6%] h-[88.6%] bg-[#7745A21A] rounded-full flex-center'>
                                <div className='w-[88.6%] h-[88.6%] bg-[#7745A21A] rounded-full' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features