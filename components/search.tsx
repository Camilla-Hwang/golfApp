'use client';

interface Props {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
  disableSearch?: boolean;
}

export default function Search({ searchTerm, onSearchTermChange, onSearch, disableSearch }: Props) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        placeholder="Search courses..."
        className="bg-gray-700 text-white rounded-md p-2"
      />
      <button
        onClick={onSearch}
        className={`bg-blue-500 text-white p-2 rounded-md transition-opacity ${disableSearch ? 'opacity-50 cursor-not-allowed bg-gray-400' : ''}`}
        disabled={disableSearch}
      >
        Search
      </button>
    </div>
  );
}
