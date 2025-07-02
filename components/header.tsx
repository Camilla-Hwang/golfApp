'use client';

import Link from 'next/link';
import CountrySelector from './country-selector';
import StateSelector from './state-selector';
import Search from './search';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X as CloseIcon } from 'lucide-react';


interface Props {
  states: string[];
}

export default function Header({ states }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || 'Singapore');
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || '');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCountry?.toLowerCase() !== 'malaysia') {
      setSelectedState('');
    }
  }, [selectedCountry]);

  // Trap focus in modal
  useEffect(() => {
    if (!isSearchModalOpen) return;
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsSearchModalOpen(false);
      if (e.key === 'Tab' && focusable && focusable.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKey);
    first?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [isSearchModalOpen]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('country', selectedCountry);
    if (selectedState) {
      params.set('state', selectedState);
    }
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    if (pathname !== '/') {
      router.push(`/?${params.toString()}`);
    } else {
      router.push(`/?${params.toString()}`);
    }
    // Reset all fields after search
    setSelectedCountry('');
    setSelectedState('');
    setSearchTerm('');
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 w-full z-[9999] bg-gray-800 text-white h-[64px] flex items-center px-4 justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Use NextLogo or text logo as needed */}
          <span className="text-2xl font-bold">Golf Directory App</span>
        </Link>
        <button
          aria-label="Open search"
          onClick={() => setIsSearchModalOpen(true)}
          className="text-blue-500 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <SearchIcon size={28} />
        </button>
      </header>
      {/* Desktop/Tablet Header */}
      <header className="hidden md:flex sticky top-0 w-full z-[9999] bg-gray-800 text-white h-[80px] items-center px-8">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Golf Directory App
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <CountrySelector selectedCountry={selectedCountry} onCountryChange={setSelectedCountry} />
            <StateSelector states={states} country={selectedCountry} selectedState={selectedState} onStateChange={setSelectedState} />
            <Search searchTerm={searchTerm} onSearchTermChange={setSearchTerm} onSearch={handleSearch} disableSearch={!selectedCountry} />
          </div>
        </div>
      </header>
      {/* Mobile Search Modal */}
      {isSearchModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Close search"
            onClick={() => setIsSearchModalOpen(false)}
            className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-800 focus:outline-none"
            tabIndex={0}
          >
            <CloseIcon size={32} />
          </button>
          <span className="mb-8 mt-2 text-3xl font-bold">Golf Directory App</span>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSearch();
              setIsSearchModalOpen(false);
            }}
            className="w-full max-w-xs flex flex-col gap-4"
          >
            <CountrySelector selectedCountry={selectedCountry} onCountryChange={setSelectedCountry} />
            <StateSelector states={states} country={selectedCountry} selectedState={selectedState} onStateChange={setSelectedState} />
            <input
              type="text"
              placeholder="Search courses..."
              className="border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!selectedCountry}
            >
              Search
            </button>
          </form>
        </div>
      )}
    </>
  );
}

