import React, { useState } from 'react';
import { LightbulbIcon } from './LightbulbIcon';
import { ArrowLeftIcon } from './ArrowLeftIcon';

export const SocialMediaHelper: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetIdeas = async () => {
    if (!topic.trim()) {
      setError('لطفاً موضوع کسب و کار خود را وارد کنید.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setIdeas('');

    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const prompt = `برای یک کسب و کار با موضوع "${topic}"، ۵ ایده خلاقانه برای پست در شبکه های اجتماعی (اینستاگرام) ارائه بده. ایده ها باید شامل عنوان جذاب، متن کوتاه و پیشنهاد برای نوع محتوا (عکس، ویدیو، استوری) باشند. پاسخ را با فرمت Markdown و به زبان فارسی ارائه بده.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setIdeas(response.text);
    } catch (err) {
      console.error(err);
      setError('متاسفانه در دریافت ایده‌ها مشکلی پیش آمد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdownToReact = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] | null = null;

    const processLine = (line: string) => {
         return line.split(/\*\*(.*?)\*\*/g).map((part, index) => {
            return index % 2 === 1 ? <strong key={index}>{part}</strong> : part;
        });
    };

    lines.forEach((line, index) => {
        if (line.startsWith('### ')) {
            if (currentList) {
                elements.push(<ul key={`ul-${index-1}`} className="list-disc list-inside space-y-2 my-3">{currentList}</ul>);
                currentList = null;
            }
            elements.push(<h3 key={index} className="font-display text-xl text-amber-100 mt-4 mb-2">{processLine(line.substring(4))}</h3>);
        } else if (line.startsWith('## ')) {
            if (currentList) {
                elements.push(<ul key={`ul-${index-1}`} className="list-disc list-inside space-y-2 my-3">{currentList}</ul>);
                currentList = null;
            }
            elements.push(<h2 key={index} className="font-display text-2xl text-amber-100 mt-5 mb-3">{processLine(line.substring(3))}</h2>);
        } else if (line.startsWith('- ')) {
            if (!currentList) {
                currentList = [];
            }
            currentList.push(<li key={index}>{processLine(line.substring(2))}</li>);
        } else if (line.trim() === '') {
             if (currentList) {
                elements.push(<ul key={`ul-${index-1}`} className="list-disc list-inside space-y-2 my-3">{currentList}</ul>);
                currentList = null;
            }
        }
        else {
            if (currentList) {
                elements.push(<ul key={`ul-${index-1}`} className="list-disc list-inside space-y-2 my-3">{currentList}</ul>);
                currentList = null;
            }
            if (line) {
                elements.push(<p key={index}>{processLine(line)}</p>);
            }
        }
    });

    if (currentList) {
        elements.push(<ul key="ul-last" className="list-disc list-inside space-y-2 my-3">{currentList}</ul>);
    }

    return <div>{elements}</div>;
  }

  return (
    <section id="social-helper" className="relative w-full py-20 md:py-28" style={{ background: '#3c145a' }}>
        <div className="relative z-10 container mx-auto px-6 sm:px-8 text-center animate-fade-in-up">
            <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-4xl md:text-5xl text-amber-50 mb-4">
                    ایده پرداز شبکه های اجتماعی
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                    موضوع کسب و کارتان را وارد کنید و با کمک هوش مصنوعی، ایده‌های خلاقانه برای تولید محتوا دریافت کنید.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto">
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleGetIdeas()}
                            placeholder="مثلا: کافه رستوران، فروشگاه آنلاین لباس، ..."
                            className="w-full pl-4 pr-12 py-3 bg-white/10 border border-white/20 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all placeholder-white/50"
                            disabled={isLoading}
                            aria-label="موضوع کسب و کار"
                        />
                         <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/60 pointer-events-none">
                            <LightbulbIcon className="w-5 h-5"/>
                        </span>
                    </div>
                    <button 
                        onClick={handleGetIdeas} 
                        disabled={isLoading}
                        className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-600 rounded-full text-purple-900 font-bold transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-purple-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="mr-2">در حال پردازش...</span>
                            </>
                        ) : (
                            <>
                                <span>دریافت ایده</span>
                                <ArrowLeftIcon className="w-5 h-5"/>
                            </>
                        )}
                    </button>
                </div>
                
                {error && <p className="text-red-400 mt-4 text-sm" role="alert">{error}</p>}

                {ideas && (
                    <div className="mt-10 p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-amber-200/30 text-right animate-fade-in-up">
                        <h3 className="font-display text-2xl text-amber-100 mb-4">ایده‌های پیشنهادی برای شما:</h3>
                        <div className="text-white/90 leading-relaxed text-base" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>
                            {renderMarkdownToReact(ideas)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </section>
  );
};