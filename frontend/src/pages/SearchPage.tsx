import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};
const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const { results, isLoading } = useSearchRestaurants(searchState, city);
  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({ ...prev, sortOption, page: 1 }));
  };
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({ ...prev, selectedCuisines, page: 1 }));
  };
  const setPage = (page: number) => {
    setSearchState((prev) => ({ ...prev, page }));
  };
  const setSearchQuery = (formData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: formData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prev) => ({ ...prev, searchQuery: "", page: 1 }));
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found!</span>;
  }
  return (
    <div className="grid grid-cols 1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          onChange={setSelectedCuisines}
          selectedCuisines={searchState.selectedCuisines}
          isExpanded={isExpanded}
          onExpandClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>

      <div id="main-content" className="flex flex-col gap-5 ">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Search by cuisine or restaurant name"
          onReset={resetSearch}
        />
        <div className="flex-1">
          <div className="flex justify-between flex-col gap-3 lg:flex-row">
            <SearchResultInfo total={results.pagination.total} city={city} />
            <SortOptionDropdown
              sortOption={searchState.sortOption}
              onChange={setSortOption}
            />
          </div>
          {results.data.map((restaurant) => (
            <SearchResultCard restaurant={restaurant} />
          ))}
        </div>
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
