import { Injectable, signal, computed, effect } from '@angular/core';
import { Product, Category, CartItem } from '../models/product.model';
import productsData from '../../assets/data/products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly CART_KEY = 'shopping_cart';
  
  readonly products = signal<Product[]>(productsData.products);
  readonly categories = signal<Category[]>(productsData.categories);
  
  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('');
  readonly sortOrder = signal<'price-asc' | 'price-desc' | 'name' | ''>('');
  
  readonly filteredProducts = computed(() => {
    let result = this.products();
    
    const search = this.searchQuery().toLowerCase().trim();
    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
      );
    }
    
    const category = this.selectedCategory();
    if (category) {
      result = result.filter(p => p.category === category);
    }
    
    const sort = this.sortOrder();
    if (sort === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return result;
  });
  
  readonly featuredProducts = computed(() => 
    this.products().filter(p => p.featured)
  );
  
  readonly cartItems = signal<CartItem[]>(this.loadCart());
  readonly cartCount = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  readonly cartTotal = computed(() => 
    this.cartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );
  
  constructor() {
    effect(() => {
      localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems()));
    });
  }
  
  private loadCart(): CartItem[] {
    try {
      const saved = localStorage.getItem(this.CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
  
  getProductById(id: number): Product | undefined {
    return this.products().find(p => p.id === id);
  }
  
  getProductsByCategory(category: string): Product[] {
    return this.products().filter(p => p.category === category);
  }
  
  getRelatedProducts(product: Product, limit: number = 4): Product[] {
    return this.products()
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  }
  
  setSearch(query: string): void {
    this.searchQuery.set(query);
  }
  
  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }
  
  setSortOrder(order: 'price-asc' | 'price-desc' | 'name' | ''): void {
    this.sortOrder.set(order);
  }
  
  addToCart(product: Product, quantity: number = 1): void {
    const items = this.cartItems();
    const existingIndex = items.findIndex(item => item.product.id === product.id);
    
    if (existingIndex >= 0) {
      const updated = [...items];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + quantity
      };
      this.cartItems.set(updated);
    } else {
      this.cartItems.set([...items, { product, quantity }]);
    }
  }
  
  removeFromCart(productId: number): void {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
  }
  
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    this.cartItems.update(items => 
      items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  }
  
  clearCart(): void {
    this.cartItems.set([]);
  }
}
