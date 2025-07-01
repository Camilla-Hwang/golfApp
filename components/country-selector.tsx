'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function CountrySelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCountry = searchParams.get('country') || 'Singapore';

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('country', newCountry);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={currentCountry}
      onChange={handleCountryChange}
      className="bg-gray-700 text-white rounded-md p-2"
    >
      <option value="Singapore">Singapore</option>
      <option value="Malaysia">Malaysia</option>
    </select>
  );
}
