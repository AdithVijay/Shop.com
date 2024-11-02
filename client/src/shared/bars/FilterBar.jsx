import { useEffect, useState } from "react";
import { SlidersHorizontal ,ChevronDown} from "lucide-react";

export default function FilterBar() {
  const [isOpen, setIsOpen] = useState(false);
  const initialValues = {
    os : [],
    brand : []
  }
  const [selectedFilters, setSelectedFilters] = useState(initialValues);
  const [isFilterCategoryOpen, setIsFilterCategoryOpen] = useState(false)
  const [isFilterFitOpen, setIsFilterFitOpen] = useState(false)

  const filterCategoryChange = () => {
    setIsFilterCategoryOpen(!isFilterCategoryOpen)
  }

  const filterFitChange = () => {
    setIsFilterFitOpen(!isFilterFitOpen)
  }

  useEffect(() => {
    console.log(selectedFilters)
  }, [selectedFilters])

  // This would come from your database
  const filterData = {
    Category: [
      { id: "android", label: "Android" },
      { id: "ios", label: "iOS" },
      { id: "windows", label: "Windows" },
      { id: "other", label: "Other" },
    ],
    fit: [
      { id: "apple", label: "Apple" },
      { id: "snapdragon", label: "Snapdragon" },
      { id: "mediatek", label: "Mediatek" },
      { id: "exynos", label: "Exynos" },
    ]
  };

  const handleFilterChange = (title, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = {...prev}
      if (updatedFilters[title].includes(value)) {
        updatedFilters[title] = updatedFilters[title].filter(item => item !== value)
      } else {
        updatedFilters[title] = [...updatedFilters[title], value]
      }
      return updatedFilters
    })
  };

  const resetFilters = () => {
    setSelectedFilters(initialValues);
  };

  const FilterSection = ({ title, items, isOpen, handleClickChange }) => {

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <button
            onClick={handleClickChange}
            className={`text-gray-500 hover:text-gray-700 ${isOpen && " rotate-180"}`}
          >
          <ChevronDown/>
          </button>
        </div>
        {isOpen && (
          <div className="space-y-2">
            {items.map(({ id, label }, index) => (
              <label key={id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={label}
                  checked={selectedFilters[title]?.includes(label) || false}
                  onChange={(e) => handleFilterChange(title, e.target.value)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-lg z-50 flex items-center gap-2"
      >
        <SlidersHorizontal className="h-5 w-5" />
        <span>Filters</span>
      </button>

      {/* Sidebar */}
      <aside 
        className={`
        fixed md:relative top-0 left-0 h-full w-80 bg-white shadow-lg md:shadow-none
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        p-6 overflow-y-auto mr-5
      `}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <FilterSection
            title="os"
            items={filterData.Category}
            isOpen={isFilterCategoryOpen}
            handleClickChange={filterCategoryChange}
          />
          <FilterSection
            title="brand"
            items={filterData.fit}
            isOpen={isFilterFitOpen}
            handleClickChange={filterFitChange}
          />
          

          <button
            onClick={resetFilters}
            className="mt-4 w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
          >
            Reset Filters
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
