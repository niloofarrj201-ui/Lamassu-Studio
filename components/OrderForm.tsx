import React, { useState } from 'react';
import { UserIcon } from './UserIcon';
import { PhoneIcon } from './PhoneIcon';
import { ListIcon } from './ListIcon';
import { PencilIcon } from './PencilIcon';
import { ArrowLeftIcon } from './ArrowLeftIcon';
import { ChevronDownIcon } from './ChevronDownIcon';


export const OrderForm: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section 
            id="order-form" 
            className="relative w-full py-20 md:py-28 overflow-hidden" 
            style={{ backgroundColor: '#46236A' }}
        >
             <div 
                className="absolute top-0 right-0 h-full w-1/2 bg-no-repeat opacity-5 pointer-events-none"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3e%3cpath d='M200 0L0 200' stroke='%23C71A78' stroke-width='1'/%3e%3cpath d='M200 25L25 200' stroke='%23C71A78' stroke-width='1'/%3e%3cpath d='M200 50L50 200' stroke='%23C71A78' stroke-width='1'/%3e%3cpath d='M200 75L75 200' stroke='%23C71A78' stroke-width='1'/%3e%3cpath d='M200 100L100 200' stroke='%23C71A78' stroke-width='1'/%3e%3cpath d='M200 125L125 200' stroke='%23C71A78' stroke-width='1'/%3e%3c/svg%3e\")",
                    backgroundSize: '400px 400px',
                    backgroundPosition: '120% -20%',
                }}
            ></div>
            <div 
                className="absolute top-0 left-0 h-full w-1/2 bg-no-repeat opacity-5 pointer-events-none"
                 style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3e%3ccircle cx='100' cy='100' r='100' fill='none' stroke='%23EB008B' stroke-width='1' /%3e%3ccircle cx='100' cy='100' r='80' fill='none' stroke='%23EB008B' stroke-width='1' /%3e%3ccircle cx='100' cy='100' r='60' fill='none' stroke='%23EB008B' stroke-width='1' /%3e%3c/svg%3e\")",
                    backgroundSize: '300px 300px',
                    backgroundPosition: '-20% 120%',
                }}
            ></div>

            <div className="relative z-10 container mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Text Section */}
                    <div className="text-center lg:text-right animate-fade-in-down">
                        <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
                            همین حالا سفارش خود را ثبت کنید.
                        </h2>
                        <p className="text-white/80 text-lg">
                            ما در کمترین زمان ممکن با شما تماس خواهیم گرفت.
                        </p>
                    </div>
                    
                    {/* Form Section */}
                    <div className="bg-white rounded-2xl p-8 shadow-2xl animate-fade-in-up min-h-[420px]">
                        {submitted ? (
                            <div className="text-center text-gray-800 flex flex-col items-center justify-center h-full">
                                <h3 className="font-display text-2xl text-purple-700 mb-3">از اعتماد شما سپاسگزاریم!</h3>
                                <p>پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name Input */}
                                    <div className="relative">
                                        <input type="text" placeholder="نام و نام خانوادگی" required className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow text-gray-700"/>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                                            <UserIcon className="w-5 h-5"/>
                                        </span>
                                    </div>
                                    {/* Phone Input */}
                                    <div className="relative">
                                        <input type="tel" placeholder="شماره همراه" required className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow text-gray-700"/>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                                            <PhoneIcon className="w-5 h-5"/>
                                        </span>
                                    </div>
                                </div>

                                {/* Package Select */}
                                <div className="relative">
                                    <select required className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow appearance-none text-gray-700 cursor-pointer">
                                        <option value="">انتخاب پکیج</option>
                                        <option>عکاسی</option>
                                        <option>فیلمبرداری</option>
                                        <option>تیزر تبلیغاتی</option>
                                        <option>تولید محتوا</option>
                                    </select>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 pointer-events-none">
                                        <ListIcon className="w-5 h-5"/>
                                    </span>
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                                        <ChevronDownIcon className="w-5 h-5"/>
                                    </span>
                                </div>
                                
                                {/* Description Textarea */}
                                <div className="relative">
                                    <textarea placeholder="توضیحات سفارش" rows={4} className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow resize-none text-gray-700"></textarea>
                                    <span className="absolute top-3 right-0 flex items-center pr-4 text-gray-400">
                                        <PencilIcon className="w-5 h-5"/>
                                    </span>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end items-center pt-2">
                                    <span className="text-gray-600 mr-4 font-semibold">ارسال پیام</span>
                                    <button type="submit" className="w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded-full text-white flex items-center justify-center transition-transform transform hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                        <ArrowLeftIcon className="w-6 h-6"/>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};