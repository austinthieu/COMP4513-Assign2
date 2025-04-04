import { useState, useEffect } from 'react';
import { useAppContext } from '../AppProvider';

export default function PaintingFilters() {
  const [titleFilter, setTitleFilter] = useState('');
  const [artistFilter, setArtistFilter] = useState('');
  const [galleryFilter, setGalleryFilter] = useState('');
  const [yearLessFilter, setYearLessFilter] = useState('1650');
  const [yearGreaterFilter, setYearGreaterFilter] = useState('1600');
  const [activeFilter, setActiveFilter] = useState('year');

  const {
    setPaintings,
    galleries,
    artists,
    allPaintings,
  } = useAppContext();

  // Reset other filters when active filter changes
  const handleFilterRadioChange = (filterType: string) => {
    setActiveFilter(filterType);

    // Reset all filter values except the selected one
    if (filterType !== 'title') setTitleFilter('');
    if (filterType !== 'artist') setArtistFilter('');
    if (filterType !== 'gallery') setGalleryFilter('');
    if (filterType !== 'year') {
      setYearLessFilter('');
      setYearGreaterFilter('');
    }
  };

  const handleFilterChange = (value: string, filterType: string) => {
    switch (filterType) {
      case 'title':
        setTitleFilter(value);
        break;
      case 'artist':
        setArtistFilter(value);
        break;
      case 'gallery':
        setGalleryFilter(value);
        break;
      case 'yearLess':
        setYearLessFilter(value);
        break;
      case 'yearGreater':
        setYearGreaterFilter(value);
        break;
      default:
        break;
    }
  };

  const clearFilters = () => {
    setTitleFilter('');
    setArtistFilter('');
    setGalleryFilter('');
    setYearLessFilter('1650');
    setYearGreaterFilter('1600');
  };

  const applyFilters = () => {
    let filteredPaintings = allPaintings;

    // Apply only the active filter
    switch (activeFilter) {
      case 'title':
        if (titleFilter) {
          filteredPaintings = filteredPaintings.filter(painting =>
            painting.title.toLowerCase().includes(titleFilter.toLowerCase())
          );
        }
        break;
      case 'artist':
        if (artistFilter) {
          filteredPaintings = filteredPaintings.filter(painting =>
            painting.artists.artistId === Number(artistFilter)
          );
        }
        break;
      case 'gallery':
        if (galleryFilter) {
          filteredPaintings = filteredPaintings.filter(painting =>
            painting.galleries.galleryId === Number(galleryFilter)
          );
        }
        break;
      case 'year':
        if (yearLessFilter) {
          filteredPaintings = filteredPaintings.filter(painting =>
            painting.yearOfWork <= parseInt(yearLessFilter)
          );
        }
        if (yearGreaterFilter) {
          filteredPaintings = filteredPaintings.filter(painting =>
            painting.yearOfWork >= parseInt(yearGreaterFilter)
          );
        }
        break;
      default:
        break;
    }

    setPaintings(filteredPaintings);
  };

  useEffect(() => {
    applyFilters();
  }, [allPaintings])


  return (
    <div className="w-1/4 bg-gray-800 rounded-lg p-4 shadow-lg max-h-[550px]">
      <h2 className="text-xl font-bold mb-4">Painting Filters</h2>

      {/* Title Filter */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="titleFilter"
            name="filterType"
            checked={activeFilter === 'title'}
            onChange={() => handleFilterRadioChange('title')}
            className="mr-2"
          />
          <label htmlFor="titleFilter">Title</label>
        </div>
        <input
          type="text"
          value={titleFilter}
          onChange={(e) => handleFilterChange(e.target.value, 'title')}
          className="w-full p-2 rounded bg-gray-600"
          placeholder="Search by title"
          disabled={activeFilter !== 'title'}
        />
      </div>

      {/* Artist Filter */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="artistFilter"
            name="filterType"
            checked={activeFilter === 'artist'}
            onChange={() => handleFilterRadioChange('artist')}
            className="mr-2"
          />
          <label htmlFor="artistFilter">Artist</label>
        </div>
        <div className="relative">
          <select
            value={artistFilter}
            onChange={(e) => handleFilterChange(e.target.value, 'artist')}
            className="w-full p-2 rounded bg-gray-600 text-white cursor-pointer"
            disabled={activeFilter !== 'artist'}
          >
            <option value="" className="cursor-pointer">Select an artist</option>
            {artists.map(a => (
              <option key={a.artistId} value={a.artistId}>
                {a.firstName} {a.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gallery Filter */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="galleryFilter"
            name="filterType"
            checked={activeFilter === 'gallery'}
            onChange={() => handleFilterRadioChange('gallery')}
            className="mr-2"
          />
          <label htmlFor="galleryFilter">Gallery</label>
        </div>
        <div className="relative">
          <select
            value={galleryFilter}
            onChange={(e) => handleFilterChange(e.target.value, 'gallery')}
            className="w-full p-2 rounded bg-gray-600 text-white cursor-pointer"
            disabled={activeFilter !== 'gallery'}
          >
            <option value="">Select a Gallery</option>
            {galleries.map(g => (
              <option key={g.galleryId} value={g.galleryId}>
                {g.galleryName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Year Filter */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="yearFilter"
            name="filterType"
            checked={activeFilter === 'year'}
            onChange={() => handleFilterRadioChange('year')}
            className="mr-2"
          />
          <label htmlFor="yearFilter">Year</label>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Less than</span>
          <input
            type="text"
            value={yearLessFilter}
            onChange={(e) => handleFilterChange(e.target.value, 'yearLess')}
            className="w-24 p-2 bg-gray-600 rounded"
            placeholder="Max year"
            disabled={activeFilter !== 'year'}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Greater than</span>
          <input
            type="text"
            value={yearGreaterFilter}
            onChange={(e) => handleFilterChange(e.target.value, 'yearGreater')}
            className="w-24 p-2 bg-gray-600 rounded"
            placeholder="Min year"
            disabled={activeFilter !== 'year'}
          />
        </div>
      </div>


      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={clearFilters}
          className="flex-1 bg-gray-600 py-2 rounded hover:bg-gray-500 transition-colors cursor-pointer"
        >
          Clear
        </button>
        <button
          onClick={applyFilters}
          className="flex-1 bg-blue-600 py-2 rounded hover:bg-blue-500 transition-colors cursor-pointer"
        >
          Search
        </button>
      </div>
    </div>
  );
}
