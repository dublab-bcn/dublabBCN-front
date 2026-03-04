import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { navbarS1, navbarS2 } from "../paths";
import DigitalClock from "./RadioBar/DigitalClock";

const SlideOver = () => {
  const [isSlideOverVisible, setSlideOverVisible] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleSlideOver = () => {
    setSlideOverVisible(!isSlideOverVisible);
  };

  const closeSlideOver = () => {
    setSlideOverVisible(false);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSlideOver();
    };

    if (isSlideOverVisible) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isSlideOverVisible]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeSlideOver();
      }
    };

    if (isSlideOverVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSlideOverVisible]);

  useEffect(() => {
    closeSlideOver();
  }, [pathname]);

  return (
    <div className="md:hidden">
      <button
        onClick={toggleSlideOver}
        className="bg-[#ECECEC] flex items-center justify-center text-[12px] text-black w-15 h-[36px] cursor-pointer px-5 py-2 hover:bg-gray-100 rounded border-gray-300"
        aria-label="Toggle menu"
        aria-expanded={isSlideOverVisible}
      >
        MENU
      </button>
      
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 ${
          isSlideOverVisible
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        } transition-all duration-300 ease-out`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeSlideOver}
          aria-hidden="true"
        />
        
        {/* Menu Panel */}
        <div
          ref={menuRef}
          className={`absolute bottom-0 left-0 right-0 bg-[#ECECEC] h-[85vh] rounded-t-2xl transform transition-transform duration-300 ease-out ${
            isSlideOverVisible
              ? "translate-y-0"
              : "translate-y-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close button */}
          <button
            onClick={closeSlideOver}
            className="absolute top-4 right-4 p-2 text-black hover:text-gray-700"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Menu Content */}
          <div className="p-6 pt-16 h-full flex flex-col">
            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-4">
                {navbarS2.map(({ label, route }) => (
                  <li key={route}>
                    <Link
                      href={route}
                      onClick={closeSlideOver}
                      className="block text-2xl font-medium text-black hover:text-gray-700 py-2 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                {navbarS1.map(({ label, route }) => (
                  <li key={route}>
                    <Link
                      href={route}
                      onClick={closeSlideOver}
                      className="block text-2xl font-medium text-black hover:text-gray-700 py-2 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Footer */}
            <div className="pt-6 border-t border-gray-300 mt-auto">
              <div className="flex justify-between items-center">
                <DigitalClock />
                <span className="text-sm text-gray-600">Ⓒ 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideOver;