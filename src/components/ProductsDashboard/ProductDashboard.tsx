import { useState, useEffect } from "react";
import type { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard/ProductCard";
import { ProductFilters, type FilterState } from "../ProductFilters/ProductFilters";
import { productAPI } from "../../services/productAPI";

export const ProductDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [priceRangeOptions, setPriceRangeOptions] = useState<Array<{ label: string; value: string; minPrice: number; maxPrice: number }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [allProducts, filterOptions] = await Promise.all([
          productAPI.getFilteredProducts({ published: true }),
          productAPI.getFilterOptions()
        ]);
        
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setPriceRangeOptions(filterOptions.priceRanges);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFiltersChange = async (filters: FilterState) => {
    try {
      setIsLoading(true);

      if (filters.tags.length === 0 && filters.priceRanges.length === 0 && filters.subscriptions.length === 0) {
        setFilteredProducts(products);
        setCurrentPage(1);
        setIsLoading(false);
        return;
      }
      let filtered = [...products];
      if (filters.tags.length > 0) {
        filtered = filtered.filter(product => 
          filters.tags.some(tag => 
            product.tags.some(productTag => 
              productTag.toLowerCase().includes(tag.toLowerCase())
            )
          )
        );
      }

      if (filters.priceRanges.length > 0 && priceRangeOptions.length > 0) {
        filtered = filtered.filter(product => 
          filters.priceRanges.some(rangeValue => {
            const range = priceRangeOptions.find(opt => opt.value === rangeValue);
            if (!range) return false;
            return product.price >= range.minPrice && product.price <= range.maxPrice;
          })
        );
      }

      if (filters.subscriptions.length > 0) {
        filtered = filtered.filter(product => 
          filters.subscriptions.some(subValue => {
            if (subValue === 'yes') return product.subscription;
            if (subValue === 'no') return !product.subscription;
            return false;
          })
        );
      }

      setFilteredProducts(filtered);
      setCurrentPage(1); 
    } catch (err) {
      console.error('Failed to filter products:', err);
      setFilteredProducts([]);
    } finally {
      setIsLoading(false);
    }
  };  
  0
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };  

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="flex flex-row max-w-7xl mx-auto p-6 space-y-6 w-full">
        <ProductFilters
          onFiltersChange={handleFiltersChange}
          totalResults={filteredProducts.length}
        />
        <div className="mx-10 flex-1">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="font-semibold text-blue-900">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
            </h2>
          </div>
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    vendor={product.vendor}
                    tags={product.tags}
                    published={product.published}
                    url={product.url}
                    image_src={product.image_src}
                    option_value={product.option_value}
                    sku={product.sku}
                    price={product.price}
                    subscription_discount={product.subscription_discount}
                    subscription={product.subscription}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8 pb-8">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isCurrentPage = pageNumber === currentPage;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            isCurrentPage
                              ? 'bg-blue-900 text-white border border-blue-900 hover:cursor-pointer'
                              : 'text-blue-900 bg-white border border-blue-900 hover:cursor-pointer'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }                  
                    return null;
                  })}
                </div>
              )}
            </>
        </div>
      </div>
    </div>
  );
};
