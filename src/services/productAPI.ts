import type { Product } from '../types/Product';

const API_BASE_URL = 'http://localhost:3010';

export const productAPI = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('error getting products');
    const products: Product[] = await response.json();
    return products;
  },

  getFilteredProducts: async (filters: {
    tags?: string;
    minPrice?: number;
    maxPrice?: number;
    subscription?: boolean;
    published?: boolean;
    page?: number;
    limit?: number;
  } = {}): Promise<Product[]> => {
    const params = new URLSearchParams();
    if (filters.tags) {
      params.append('tags_like', filters.tags);
    }
    if (filters.subscription !== undefined) {
      params.append('subscription', filters.subscription.toString());
    }
    if (filters.published !== undefined) {
      params.append('published', filters.published.toString());
    }
    if (filters.page) {
      params.append('_page', filters.page.toString());
    }

    const url = `${API_BASE_URL}/products${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('error getting products');
    let products: Product[] = await response.json();

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      products = products.filter(product => {
        const meetsMin = filters.minPrice !== undefined ? product.price >= filters.minPrice : true;
        const meetsMax = filters.maxPrice !== undefined ? product.price <= filters.maxPrice : true;
        return meetsMin && meetsMax;
      });
    }

    return products;
  },

  getFilterOptions: async (): Promise<{
    tags: string[];
    priceRanges: Array<{ label: string; value: string; minPrice: number; maxPrice: number }>;
    subscriptions: Array<{ label: string; value: string }>;
  }> => {
    const products = await productAPI.getAllProducts();
    const allTags = [... new Set(products.flatMap(product => product.tags).sort())];
    
    const priceRanges = [
      { label: 'Under $30', value: 'under-30', minPrice: 0, maxPrice: 29.99 },
      { label: '$30 - $50', value: '30-50', minPrice: 30, maxPrice: 50 },
      { label: 'Over $100', value: 'over-100', minPrice: 100, maxPrice: Infinity }
    ];

    const subscriptions = [
      { label: 'Subscription Available', value: 'yes' },
      { label: 'One-time Purchase', value: 'no' }
    ];

    return {
      tags: allTags,
      priceRanges,
      subscriptions
    };
  },
}
