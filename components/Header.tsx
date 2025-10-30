import React, { useState, useRef, useEffect } from 'react';
import { UserIcon } from './UserIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { MenuIcon } from './MenuIcon';
import { CloseIcon } from './CloseIcon';

interface SubMenuItem {
    name: string;
    href: string;
}

interface MenuItem {
    name: string;
    href: string;
    dropdown?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
    { name: 'خانه', href: '#' },
    { name: 'نمونه کارها', href: '#' },
    { 
      name: 'عکاسی', 
      href: '#',
      dropdown: [
        { name: 'پرتره', href: '#' },
        { name: 'صنعتی', href: '#' },
        { name: 'تبلیغاتی', href: '#' },
      ] 
    },
    { 
      name: 'تیزر', 
      href: '#',
      dropdown: [
        { name: 'موشن گرافیک', href: '#' },
        { name: 'رئال', href: '#' },
      ]
    },
    { 
      name: 'گرافیک', 
      href: '#',
      dropdown: [
        { name: 'طراحی لوگو', href: '#' },
        { name: 'هویت بصری', href: '#' },
      ]
    },
    { 
      name: 'سوشال مدیا', 
      href: '#',
      dropdown: [
        { name: 'مدیریت صفحه', href: '#' },
        { name: 'تولید محتوا', href: '#' },
      ]
    },
    { name: 'دوره های آموزشی', href: 'https://www.instagram.com/niloofar_rajabi_/' },
];

/**
 * A dropdown menu component for the main navigation.
 * Closes when clicking outside of it.
 */
const Dropdown: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <li className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-1 px-4 py-2 text-white hover:text-amber-200 transition-colors duration-300"
      >
        {item.name}
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-black/50 backdrop-blur-md rounded-lg shadow-lg py-2 z-50 animate-fade-in-down" style={{animationDuration: '0.3s'}}>
          {item.dropdown?.map((subItem) => (
            <li key={subItem.name}>
              <a href={subItem.href} onClick={(e) => e.preventDefault()} className="block px-4 py-2 text-white hover:bg-white/10">
                {subItem.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};


export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleInactiveLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, itemName: string) => {
    e.preventDefault(); 
    if (itemName === 'خانه') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if(isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className="w-full shadow-lg"
      style={{
        backgroundImage: "linear-gradient(to left, #46236A 0%, #C71A78 80%, #EB008B 100%)",
      }}
    >
      <div className="container mx-auto px-6 sm:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Right side (start in RTL) */}
          <div className="flex items-center gap-4">
              <ul className="hidden lg:flex items-center gap-2">
                {menuItems.map((item) => {
                    const isExternalLink = item.name === 'دوره های آموزشی';
                    return item.dropdown 
                        ? <Dropdown key={item.name} item={item} />
                        : (
                            <li key={item.name}>
                                {isExternalLink ? (
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-white hover:text-amber-200 transition-colors duration-300">
                                        {item.name}
                                    </a>
                                ) : (
                                    <a href={item.href} onClick={(e) => handleInactiveLinkClick(e, item.name)} className="px-4 py-2 text-white hover:text-amber-200 transition-colors duration-300">
                                        {item.name}
                                    </a>
                                )}
                            </li>
                        )
                })}
              </ul>
              <div className="lg:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="باز کردن منو" aria-expanded={isMobileMenuOpen} className="text-white">
                  {isMobileMenuOpen ? <CloseIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
                </button>
              </div>
          </div>
          
          {/* Left side (end in RTL) */}
          <div className="flex items-center">
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="حساب کاربری" className="flex items-center gap-2 text-white hover:text-amber-200 transition-colors duration-300">
                <span className="hidden sm:inline">حساب کاربری</span>
                <UserIcon className="w-7 h-7" />
              </a>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <ul className="flex flex-col items-center gap-4">
              {menuItems.map((item) => {
                  const isExternalLink = item.name === 'دوره های آموزشی';
                  return (
                    <li key={item.name} className="w-full text-center">
                    {item.dropdown ? (
                        <details className="group">
                            <summary className="py-2 text-white cursor-pointer list-none flex items-center justify-center gap-2">
                                {item.name}
                                <ChevronDownIcon className="w-4 h-4 group-open:rotate-180 transition-transform"/>
                            </summary>
                            <ul className="pt-2">
                                {item.dropdown.map(subItem => (
                                    <li key={subItem.name} className="py-1">
                                        <a href={subItem.href} onClick={(e) => e.preventDefault()} className="text-white/80 hover:text-white">
                                            {subItem.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ) : (
                        isExternalLink ? (
                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="block py-2 text-white hover:text-amber-200">
                                {item.name}
                            </a>
                        ) : (
                            <a href={item.href} onClick={(e) => handleInactiveLinkClick(e, item.name)} className="block py-2 text-white hover:text-amber-200">
                                {item.name}
                            </a>
                        )
                    )}
                    </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};