import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Bienvenido a Shopping</h1>
        <p class="hero-subtitle">Miles de productos con los mejores precios y entrega rápida</p>
        <a routerLink="/" class="hero-btn" (click)="clearFilters()">Ver productos</a>
      </div>
    </section>
    
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">Categorías</h2>
        <div class="categories-grid">
          @for (category of productService.categories(); track category.id) {
            <button 
              class="category-card" 
              [class.active]="productService.selectedCategory() === category.id"
              (click)="filterByCategory(category.id)"
            >
              <span class="category-icon">{{ category.icon }}</span>
              <span class="category-name">{{ category.name }}</span>
            </button>
          }
        </div>
      </div>
    </section>
    
    <section class="products-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            @if (productService.searchQuery()) {
              Resultados para "{{ productService.searchQuery() }}"
            } @else if (productService.selectedCategory()) {
              {{ getCategoryName(productService.selectedCategory()) }}
            } @else {
              Productos destacados
            }
          </h2>
          
          <div class="filters">
            <select class="filter-select" (change)="onSortChange($event)">
              <option value="">Ordenar por</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="name">Nombre A-Z</option>
            </select>
            
            @if (productService.selectedCategory() || productService.searchQuery()) {
              <button class="clear-filters-btn" (click)="clearFilters()">
                Limpiar filtros
              </button>
            }
          </div>
        </div>
        
        @if (productService.filteredProducts().length > 0) {
          <div class="products-grid">
            @for (product of productService.filteredProducts(); track product.id; let i = $index) {
              <div class="animate-slide-up" [style.animation-delay]="i * 50 + 'ms'">
                <app-product-card [product]="product" />
              </div>
            }
          </div>
        } @else {
          <div class="no-results">
            <p>No se encontraron productos</p>
            <button class="btn btn-primary" (click)="clearFilters()">Ver todos los productos</button>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--secondary-color) 0%, #1a1a2e 100%);
      padding: 80px 24px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
      opacity: 0.5;
    }
    
    .hero-content {
      position: relative;
      max-width: 700px;
      margin: 0 auto;
    }
    
    .hero-title {
      font-size: 48px;
      font-weight: 800;
      color: var(--bg-white);
      margin-bottom: 16px;
      line-height: 1.2;
    }
    
    .hero-subtitle {
      font-size: 18px;
      color: var(--text-muted);
      margin-bottom: 32px;
    }
    
    .hero-btn {
      display: inline-block;
      padding: 14px 36px;
      background: var(--primary-color);
      color: var(--text-dark);
      font-weight: 600;
      font-size: 16px;
      border-radius: var(--radius-md);
      transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    }
    
    .hero-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 153, 0, 0.3);
    }
    
    .categories-section {
      padding: 48px 0;
      background: var(--bg-offwhite);
    }
    
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 16px;
    }
    
    .category-card {
      background: var(--bg-white);
      border: 2px solid transparent;
      border-radius: var(--radius-md);
      padding: 20px 16px;
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-fast);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    
    .category-card:hover {
      border-color: var(--primary-color);
      transform: translateY(-2px);
    }
    
    .category-card.active {
      border-color: var(--primary-color);
      background: #fff8f0;
    }
    
    .category-icon {
      font-size: 32px;
    }
    
    .category-name {
      font-size: 13px;
      font-weight: 500;
      color: var(--text-medium);
    }
    
    .products-section {
      padding: 48px 0;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }
    
    .filters {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    
    .filter-select {
      padding: 10px 16px;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      background: var(--bg-white);
      font-size: 14px;
      cursor: pointer;
      min-width: 160px;
    }
    
    .clear-filters-btn {
      padding: 10px 16px;
      background: transparent;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      color: var(--text-medium);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .clear-filters-btn:hover {
      border-color: var(--text-medium);
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }
    
    .no-results {
      text-align: center;
      padding: 60px 20px;
    }
    
    .no-results p {
      font-size: 18px;
      color: var(--text-muted);
      margin-bottom: 20px;
    }
    
    @media (max-width: 1200px) {
      .products-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    @media (max-width: 992px) {
      .categories-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      
      .products-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .hero {
        padding: 48px 16px;
      }
      
      .hero-title {
        font-size: 32px;
      }
      
      .hero-subtitle {
        font-size: 16px;
      }
      
      .categories-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .section-header {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .filters {
        width: 100%;
      }
      
      .filter-select {
        flex: 1;
      }
    }
  `]
})
export class HomeComponent {
  productService = inject(ProductService);
  
  filterByCategory(categoryId: string): void {
    if (this.productService.selectedCategory() === categoryId) {
      this.productService.setCategory('');
    } else {
      this.productService.setCategory(categoryId);
      this.productService.setSearch('');
    }
  }
  
  clearFilters(): void {
    this.productService.setCategory('');
    this.productService.setSearch('');
  }
  
  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as 'price-asc' | 'price-desc' | 'name' | '';
    this.productService.setSortOrder(value);
  }
  
  getCategoryName(categoryId: string): string {
    const category = this.productService.categories().find(c => c.id === categoryId);
    return category?.name || categoryId;
  }
}
