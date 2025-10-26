
import { useState, useEffect } from 'react';
import { productAPI } from '../../services/productAPI';

export interface FilterState {
  tags: string[];
  priceRanges: string[];
  subscriptions: string[];
}

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  totalResults?: number;
}

export const ProductFilters = ({ onFiltersChange, totalResults }: ProductFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    tags: [],
    priceRanges: [],
    subscriptions: []
  });

  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [priceRangeOptions, setPriceRangeOptions] = useState<Array<{ label: string; value: string; minPrice: number; maxPrice: number }>>([]);
  const [subscriptionOptions, setSubscriptionOptions] = useState<Array<{ label: string; value: string }>>([]);

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [filterOptions] = await Promise.all([
          productAPI.getFilterOptions(),
        ]);

        setAvailableTags(filterOptions.tags);
        setPriceRangeOptions(filterOptions.priceRanges);
        setSubscriptionOptions(filterOptions.subscriptions);
      } catch (error) {
        console.error(error);
      } 
    };

    loadFilterOptions();
  }, []);

  const updateTagFilter = (tag: string, checked: boolean) => {
    const newTags = checked 
      ? [...filters.tags, tag]
      : filters.tags.filter(t => t !== tag);
    
    const newFilters = { ...filters, tags: newTags };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const updatePriceFilter = (priceRange: string, checked: boolean) => {
    const newPriceRanges = checked
      ? [...filters.priceRanges, priceRange]
      : filters.priceRanges.filter(p => p !== priceRange);
    
    const newFilters = { ...filters, priceRanges: newPriceRanges };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const updateSubscriptionFilter = (subscription: string, checked: boolean) => {
    const newSubscriptions = checked
      ? [...filters.subscriptions, subscription]
      : filters.subscriptions.filter(s => s !== subscription);
    
    const newFilters = { ...filters, subscriptions: newSubscriptions };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="w-80 px-6 space-y-6 max-h-max-content">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-blue-900">Product filters </h2>
      </div>

      {totalResults && (
        <p className="text-sm text-blue-900">{totalResults} products found</p>
      )}
      <div>
        <h3 className="text-sm font-medium text-blue-900 mb-3">Tags</h3>
        <div className="space-y-2">
          {availableTags.map((tag) => (
            <label key={tag} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={(e) => updateTagFilter(tag, e.target.checked)}
                className="h-4 w-4 text-blue-600 border-blue-500 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-blue-900">{tag}</span>
           
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-blue-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRangeOptions.map((option) => (
            <label key={option.value} className="flex items-center">  
              <input
                type="checkbox"
                checked={filters.priceRanges.includes(option.value)}
                onChange={(e) => updatePriceFilter(option.value, e.target.checked)}
                className="h-4 w-4 text-blue-600 border-blue-500 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-blue-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-blue-900 mb-3">Subscribe and save</h3>
        <div >
          {subscriptionOptions.map((option) => (
            <label key={option.value} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={filters.subscriptions.includes(option.value)}
                onChange={(e) => updateSubscriptionFilter(option.value, e.target.checked)}
                className="h-4 w-4 text-blue-600 border-blue-500 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-blue-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};