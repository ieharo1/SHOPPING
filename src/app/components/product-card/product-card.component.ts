import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="product-card">
      <a [routerLink]="['/product', product.id]" class="product-link">
        <div class="product-image-container">
          <img [src]="product.image" [alt]="product.name" class="product-image" loading="lazy" />
          @if (product.originalPrice) {
            <span class="discount-badge">-{{ discount }}%</span>
          }
        </div>
        
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          
          <div class="product-rating">
            <div class="stars">
              @for (star of [1,2,3,4,5]; track star) {
                <span class="star" [class.filled]="star <= product.rating">★</span>
              }
            </div>
            <span class="reviews">({{ product.reviews | number }})</span>
          </div>
          
          <div class="product-price">
            <span class="current-price">\${{ product.price | number }}</span>
            @if (product.originalPrice) {
              <span class="original-price">\${{ product.originalPrice | number }}</span>
            }
          </div>
        </div>
      </a>
      
      <button class="add-to-cart-btn" (click)="addToCart($event)">
        Agregar al carrito
      </button>
    </article>
  `,
  styles: [`
    .product-card {
      background: var(--bg-white);
      border-radius: var(--radius-md);
      padding: 16px;
      transition: transform var(--transition-normal), box-shadow var(--transition-normal);
      display: flex;
      flex-direction: column;
    }
    
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .product-link {
      text-decoration: none;
      color: inherit;
      flex: 1;
    }
    
    .product-image-container {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: var(--radius-sm);
      background: var(--bg-light);
      margin-bottom: 12px;
    }
    
    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-normal);
    }
    
    .product-card:hover .product-image {
      transform: scale(1.05);
    }
    
    .discount-badge {
      position: absolute;
      top: 8px;
      left: 8px;
      background: var(--error-color);
      color: var(--bg-white);
      font-size: 12px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: var(--radius-sm);
    }
    
    .product-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .product-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-medium);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .product-rating {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .stars {
      display: flex;
    }
    
    .star {
      color: var(--border-color);
      font-size: 14px;
    }
    
    .star.filled {
      color: var(--primary-color);
    }
    
    .reviews {
      font-size: 12px;
      color: var(--text-muted);
    }
    
    .product-price {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-top: 4px;
    }
    
    .current-price {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-dark);
    }
    
    .original-price {
      font-size: 14px;
      color: var(--text-muted);
      text-decoration: line-through;
    }
    
    .add-to-cart-btn {
      margin-top: 12px;
      padding: 10px 16px;
      background: var(--primary-color);
      color: var(--text-dark);
      font-weight: 600;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background var(--transition-fast);
    }
    
    .add-to-cart-btn:hover {
      background: var(--primary-hover);
    }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  
  private productService = inject(ProductService);
  
  get discount(): number {
    if (!this.product.originalPrice) return 0;
    return Math.round((1 - this.product.price / this.product.originalPrice) * 100);
  }
  
  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.productService.addToCart(this.product);
  }
}
