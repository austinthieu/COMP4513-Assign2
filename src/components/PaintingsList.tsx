import { Painting, SortOption } from '../utils/types';

interface PaintingsListProps {
  paintings: Painting[];
  sortBy: SortOption;
  onSortChange: (sortOption: SortOption) => void;
  onSelectPainting: (painting: Painting) => void;
}

const PaintingsList = ({
  paintings,
  sortBy,
  onSortChange,
  onSelectPainting
}: PaintingsListProps) => {
  // Sort paintings based on selected sort criteria
  const sortedPaintings = [...paintings].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'year') return a.yearOfWork - b.yearOfWork;
    if (sortBy === 'lastName') return a.artists.lastName.localeCompare(b.artists.lastName);
    return 0;
  });

  return (
    <div className="w-full bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-xl text-white">Paintings</h2>
        <div className="flex items-center">
          <label htmlFor="sortby" className="mr-2 text-sm text-gray-300">Sort by:</label>
          <select
            id="sortby"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-gray-700 text-gray-100 text-sm rounded px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="lastName">Artist</option>
          </select>
        </div>
      </div>

      {sortedPaintings.length > 0 ? (
        <ul className="space-y-4">
          {sortedPaintings.map(painting => (
            <li
              key={painting.paintingId}
              className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-600 transition-colors duration-200"
              onClick={() => onSelectPainting(painting)}
            >
              <div className="flex p-4">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={`./paintings/square/${String(painting.imageFileName).padStart(6, '0')}.jpg`}
                    alt=""
                    className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-md shadow-md"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-lg mb-1 text-white">{painting.title}</h3>
                  <p className="text-sm text-gray-300">
                    <span className="font-medium">{painting.artists.firstName} {painting.artists.lastName}</span>
                    <span className="mx-1">•</span>
                    <span>{painting.yearOfWork}</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-center py-8">No paintings to display</p>
      )}
    </div>
  );
};

export default PaintingsList;
