import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
};
const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const { results, isLoading } = useSearchRestaurants(searchState, city);

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
          <SearchResultInfo total={results.pagination.total} city={city} />
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
