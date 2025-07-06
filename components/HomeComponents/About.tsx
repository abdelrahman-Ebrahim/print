import React from 'react'

const About = () => {
    return (
        <section className='general-container py-20 flex-center flex-col'>
            <div className='flex-center flex-col gap-6 py-[2px]'>
                <h6 className='text-[#7745A2] font-semibold text-sm uppercase'>about</h6>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col items-center gap-3'>
                        <h2 className='text-black font-medium text-[36px]'>Print Smarter. Live Simpler.</h2>
                        <p className='text-[#7745A2] text-center text-[20px]'>Print.sa was built to solve a simple problem — getting <br /> documents printed shouldn’t be complicated.</p>
                    </div>
                    <p className='text-[#707070] text-[22px] text-center'>Whether you’re a student rushing to submit a project, a business needing high- <br /> volume documents, or someone printing from home — Print.sa gives you control, <br /> speed, and peace of mind.
                        <br /> <br />
                        From file upload to delivery, every step is designed to be simple, secure, and fast.We <br /> connect you with certified printing agents across Saudi Arabia, offer full <br /> customization, and make it easy to choose the best price for your needs.</p>
                </div>
            </div>
        </section>
    )
}

export default About