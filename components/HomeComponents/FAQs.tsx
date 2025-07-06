import React from 'react'

const FAQs = () => {
    return (
        <section className='general-container py-20 flex-center flex-col gap-8'>
            <div className='flex-center flex-col gap-12'>
                <div className='flex-center flex-col gap-2'>
                    <h6 className='text-[#7745A2] font-semibold text-sm'>FAQs</h6>
                    <h4 className='font-bold text-[36px]'>Frequently asked <span className='text-[#7745A2]'>questions</span></h4>
                    <p className='text-[#7745A2] text-lg'>Got questions about files, delivery, or pricing? We’ve got you.</p>
                </div>

                <div className='w-full grid grid-cols-3 gap-8'>
                    <div className='min-w-[340px] flex flex-col gap-4'>
                        <p className='text-[#7745A2] font-semibold text-[20px]'>What are pickup points?</p>
                        <p className='text-[#51564E] font-medium'>They are points set to enable the customers to get their prints for free. A message will be sent to the customers’ mobile to inform them that their order is ready in the pickup points.</p>
                    </div>

                    <div className='min-w-[340px] flex flex-col gap-4'>
                        <p className='text-[#7745A2] font-semibold text-[20px]'>What are the available payment methods?</p>
                        <p className='text-[#51564E] font-medium'>Online payment by credit card "Visa or <br /> MasterCard". <br/> <br />
                            Direct payment through Bank Cards that are supported by Mada service and have three numbers in the back which is called CVV or CVC.</p>
                    </div>

                    <div className='min-w-[340px] flex flex-col gap-4'>
                        <p className='text-[#7745A2] font-semibold text-[20px]'>who is service provider in Print Platform?</p>
                        <p className='text-[#51564E] font-medium'>Service Provider is someone who provide printing services and receive printing orders from Print Platform so he print it with his prices that may differ from Print Platform Prices.</p>
                    </div>

                    <div className='min-w-[340px] flex flex-col gap-4'>
                        <p className='text-[#7745A2] font-semibold text-[20px]'>What is the acceptable form of the document to complete the printing process?</p>
                        <p className='text-[#51564E] font-medium'>The accepted document is pdf, and you can convert many formats to pdf from your own device such as the known formats for Word and PowerPoint "docx, doc, ppt, pptx".</p>
                    </div>

                    <div className='min-w-[340px] flex flex-col gap-4'>
                        <p className='text-[#7745A2] font-semibold text-[20px]'>Can I cancel the printing order and when?</p>
                        <p className='text-[#51564E] font-medium'>Yes, if you want to cancel the order you can cancel it as long as the status of the order is "pending " by clicking on the icon X in front of the order in the page " my orders " However, if the order status changed to " under processing " so it is printing and cannot be canceled.</p>
                    </div>

                    <div className='min-w-[340px] flex flex-col gap-4'>
                        <p className='text-[#7745A2] font-semibold text-[20px]'>Does Print platform offer cash on delivery?</p>
                        <p className='text-[#51564E] font-medium'>Unfortunately the payment cannot be cash on delivery. It is always before completing the whole printing order.</p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default FAQs