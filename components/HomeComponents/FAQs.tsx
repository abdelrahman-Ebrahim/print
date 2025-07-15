import React from 'react';

const FAQs = () => {
    return (
        <section className='general-container py-8 flex-center flex-col gap-8 lg:py-10 xlg:!py-20'>
            <div className='flex-center flex-col gap-3 lg:gap-12'>
                <div className='flex-center flex-col gap-2'>
                    <h6 className='text-[#7745A2] font-semibold text-xs lg:text-sm'>FAQs</h6>
                    <h4 className='font-bold text-center text-[28px] lg:text-[32px] xlg:!text-[36px]'>Frequently asked <span className='text-[#7745A2]'>questions</span></h4>
                    <p className='text-[#51564E] opacity-80 text-base lg:text-lg lg:text-[#7745A2]'>Got questions about files, delivery, or pricing? We&apos;ve got you.</p>
                </div>

                <div className='w-full grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-2 xlg:!grid-cols-3'>
                    <div className='min-w-[340px] max-[375px]:min-w-[310px] flex flex-col gap-2 lg:gap-4'>
                        <p className='text-[#7745A2] font-semibold text-[20px] max-[375px]:text-base'>What are pickup points?</p>
                        <p className='text-[#51564E] font-medium max-[375px]:text-xs'>They are points set to enable the customers to get their prints for free. A message will be sent to the customers&apos; mobile to inform them that their order is ready in the pickup points.</p>
                    </div>

                    <div className='min-w-[340px] max-[375px]:min-w-[310px] flex flex-col gap-2 lg:gap-4'>
                        <p className='text-[#7745A2] font-semibold text-[20px] max-[375px]:text-base'>What are the available payment methods?</p>
                        <p className='text-[#51564E] font-medium max-[375px]:text-xs'>Online payment by credit card &quot;Visa or <br /> MasterCard&quot;. <br /> <br />
                            Direct payment through Bank Cards that are supported by Mada service and have three numbers in the back which is called CVV or CVC.</p>
                    </div>

                    <div className='min-w-[340px] max-[375px]:min-w-[310px] flex flex-col gap-2 lg:gap-4'>
                        <p className='text-[#7745A2] font-semibold text-[20px] max-[375px]:text-base'>Who is service provider in Print Platform?</p>
                        <p className='text-[#51564E] font-medium max-[375px]:text-xs'>Service Provider is someone who provide printing services and receive printing orders from Print Platform so he print it with his prices that may differ from Print Platform Prices.</p>
                    </div>

                    <div className='min-w-[340px] max-[375px]:min-w-[310px] flex flex-col gap-2 lg:gap-4'>
                        <p className='text-[#7745A2] font-semibold text-[20px] max-[375px]:text-base'>What is the acceptable form of the document to complete the printing process?</p>
                        <p className='text-[#51564E] font-medium max-[375px]:text-xs'>The accepted document is pdf, and you can convert many formats to pdf from your own device such as the known formats for Word and PowerPoint &quot;docx, doc, ppt, pptx&quot;.</p>
                    </div>

                    <div className='min-w-[340px] max-[375px]:min-w-[310px] flex flex-col gap-2 lg:gap-4'>
                        <p className='text-[#7745A2] font-semibold text-[20px] max-[375px]:text-base'>Can I cancel the printing order and when?</p>
                        <p className='text-[#51564E] font-medium max-[375px]:text-xs'>Yes, if you want to cancel the order you can cancel it as long as the status of the order is &quot;pending&quot; by clicking on the icon X in front of the order in the page &quot;my orders&quot;. However, if the order status changed to &quot;under processing&quot;, it is printing and cannot be canceled.</p>
                    </div>

                    <div className='min-w-[340px] max-[375px]:min-w-[310px] flex flex-col gap-2 lg:gap-4'>
                        <p className='text-[#7745A2] font-semibold text-[20px] max-[375px]:text-base'>Does Print platform offer cash on delivery?</p>
                        <p className='text-[#51564E] font-medium max-[375px]:text-xs'>Unfortunately the payment cannot be cash on delivery. It is always before completing the whole printing order.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQs;