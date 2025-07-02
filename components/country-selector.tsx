'use client';

interface Props {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

export default function CountrySelector({ selectedCountry, onCountryChange }: Props) {
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCountryChange(e.target.value);
  };

  return (
    <select
      value={selectedCountry}
      onChange={handleCountryChange}
      className="bg-gray-700 text-white rounded-md p-2 pr-6"
    >
      <option value="">Countries</option>
      <option value="Malaysia">Malaysia</option>
      <option value="Singapore">Singapore</option>
    </select>
  );
}
