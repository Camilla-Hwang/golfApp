import Link from 'next/link';
import CountrySelector from './country-selector';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Golf Directory App
        </Link>
        <CountrySelector />
      </div>
    </header>
  );
}

