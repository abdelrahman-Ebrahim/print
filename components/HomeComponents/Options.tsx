import Image from 'next/image'
import React from 'react'

const Options = () => {
    return (
        <section className="general-container flex-center py-20 h-[704px] bg-[url('/dotsBg.png')] ">
            <div className='flex items-center justify-between w-full'>
                <div className='flex flex-col gap-9'>
                    <div className='flex flex-col w-[544px] gap-8'>
                        <div className='flex flex-col gap-4'>
                            <h2 className='font-bold text-[40px] leading-[49px]'>All Your <br /> Printing Options <br /><span className='text-[#7745A2]'>In One Place</span></h2>
                            <p className='text-black font-medium text-[18px]'>Print.sa gives you complete control over how your <br /> documents are printed. From size and color to layout, <br /> sides, and binding — every detail is in your hands.</p>
                        </div>
                    </div>
                </div>
                <Image src={"/iPhoneGroup.svg"} alt='iPhoneGroup' width={646.64} height={591.76}/>
            </div>
        </section>
    )
}

export default Options