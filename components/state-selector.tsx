'use client';

interface Props {
  states: string[];
  country: string;
  selectedState: string;
  onStateChange: (state: string) => void;
}

export default function StateSelector({ states, country, selectedState, onStateChange }: Props) {
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStateChange(e.target.value);
  };

  if (country?.toLowerCase() !== 'malaysia') {
    return null;
  }

  return (
    <select
      value={selectedState}
      onChange={handleStateChange}
      className="bg-gray-700 text-white rounded-md p-2 pr-6"
    >
      <option value="">States</option>
      <option value="Johor">Johor</option>
      {/* Add more states as needed */}
      {states.map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>
  );
}
