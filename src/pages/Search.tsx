import { useSelector } from "react-redux";
import FilterBar from "../components/app/FilterBar";
import CarsList from "../components/cars/CarsList";
import { cars } from "../data";
import { RootState } from "../state/store";

const Search = () => {
	const {
		products,
		productsCount,
		filteredProductCount,
		numberOfPages,
		searchNumberOfPages,
		loading,
		error,
	} = useSelector((state: RootState) => state.products);
	return (
		<div className="mw">
			<div className="px-4 md:px-0">
				<FilterBar />
			</div>
			<CarsList
				title={`All (${productsCount} Results)`}
				products={products}
				productsCount={productsCount}
				filteredProductCount={filteredProductCount}
				numberOfPages={numberOfPages}
				searchNumberOfPages={searchNumberOfPages}
				loading={loading}
				error={error || ""}
				pagination={true}
			/>
		</div>
	);
};

export default Search;
