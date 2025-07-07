import React from 'react'

const About = () => {
    return (
        <section className='general-container flex-center flex-col py-8 lg:py-10 lg:px-6 xlg:!py-20'>
            <div className='flex-center flex-col gap-6 py-[2px]'>
                <h6 className='text-[#7745A2] font-semibold uppercase text-xs lg:text-sm'>about</h6>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col items-center gap-3'>
                        <h2 className='text-black font-medium text-center text-[28px] lg:text-[36px]'>Print Smarter. Live Simpler.</h2>
                        <p className='text-[#7745A2] text-center max-w-[680px] text-base lg:text-[20px]'>Print.sa was built to solve a simple problem — getting documents printed shouldn’t be complicated.</p>
                    </div>
                    <p className='text-[#707070] text-center text-base lg:text-[22px]'>Whether you’re a student rushing to submit a project, a business needing high- <br /> volume documents, or someone printing from home — Print.sa gives you control, <br /> speed, and peace of mind.
                        <br/> <br/>
                        From file upload to delivery, every step is designed to be simple, secure, and fast.We <br /> connect you with certified printing agents across Saudi Arabia, offer full <br /> customization, and make it easy to choose the best price for your needs.</p>
                </div>
            </div>
        </section>
    )
}

export default About