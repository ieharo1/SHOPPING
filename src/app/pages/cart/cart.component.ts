import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="cart-container">
      <h1 class="page-title">Carrito de compras</h1>
      
      @if (productService.cartItems().length > 0) {
        <div class="cart-layout">
          <div class="cart-items">
            @for (item of productService.cartItems(); track item.product.id) {
              <div class="cart-item">
                <img [src]="item.product.image" [alt]="item.product.name" class="item-image" />
                
                <div class="item-details">
                  <a [routerLink]="['/product', item.product.id]" class="item-name">
                    {{ item.product.name }}
                  </a>
                  <span class="item-price">\${{ item.product.price | number }}</span>
                </div>
                
                <div class="quantity-controls">
                  <button (click)="decreaseQuantity(item.product.id, item.quantity)">-</button>
                  <span>{{ item.quantity }}</span>
                  <button (click)="increaseQuantity(item.product.id, item.quantity)">+</button>
                </div>
                
                <div class="item-total">
                  \${{ (item.product.price * item.quantity) | number }}
                </div>
                
                <button class="remove-btn" (click)="removeItem(item.product.id)">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            }
          </div>
          
          <div class="cart-summary">
            <h2>Resumen del pedido</h2>
            
            <div class="summary-row">
              <span>Subtotal ({{ productService.cartCount() }} productos)</span>
              <span>\${{ productService.cartTotal() | number }}</span>
            </div>
            
            <div class="summary-row">
              <span>Envío</span>
              <span class="free-shipping">Gratis</span>
            </div>
            
            <div class="summary-divider"></div>
            
            <div class="summary-row total">
              <span>Total</span>
              <span>\${{ productService.cartTotal() | number }}</span>
            </div>
            
            <button class="checkout-btn">
              Proceder al pago
            </button>
            
            <button class="clear-cart-btn" (click)="clearCart()">
              Vaciar carrito
            </button>
          </div>
        </div>
      } @else {
        <div class="empty-cart">
          <div class="empty-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Descubre nuestros productos y agrégalos a tu carrito</p>
          <a routerLink="/" class="btn btn-primary">Ver productos</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 32px 24px;
    }
    
    .page-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 32px;
    }
    
    .cart-layout {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 32px;
    }
    
    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .cart-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      background: var(--bg-white);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      transition: box-shadow var(--transition-fast);
    }
    
    .cart-item:hover {
      box-shadow: var(--shadow-sm);
    }
    
    .item-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: var(--radius-sm);
    }
    
    .item-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .item-name {
      font-weight: 500;
      color: var(--text-medium);
      transition: color var(--transition-fast);
    }
    
    .item-name:hover {
      color: var(--accent-color);
    }
    
    .item-price {
      font-size: 14px;
      color: var(--text-muted);
    }
    
    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 4px;
    }
    
    .quantity-controls button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-light);
      border: none;
      border-radius: var(--radius-sm);
      font-size: 16px;
      cursor: pointer;
      transition: background var(--transition-fast);
    }
    
    .quantity-controls button:hover {
      background: var(--border-color);
    }
    
    .quantity-controls span {
      min-width: 32px;
      text-align: center;
      font-weight: 600;
    }
    
    .item-total {
      font-size: 18px;
      font-weight: 700;
      min-width: 100px;
      text-align: right;
    }
    
    .remove-btn {
      padding: 8px;
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      transition: color var(--transition-fast);
    }
    
    .remove-btn:hover {
      color: var(--error-color);
    }
    
    .cart-summary {
      background: var(--bg-white);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: 24px;
      height: fit-content;
      position: sticky;
      top: 100px;
    }
    
    .cart-summary h2 {
      font-size: 18px;
      margin-bottom: 20px;
    }
    
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 14px;
    }
    
    .free-shipping {
      color: var(--success-color);
      font-weight: 500;
    }
    
    .summary-divider {
      height: 1px;
      background: var(--border-light);
      margin: 16px 0;
    }
    
    .summary-row.total {
      font-size: 20px;
      font-weight: 700;
    }
    
    .checkout-btn {
      width: 100%;
      padding: 14px;
      background: var(--primary-color);
      color: var(--text-dark);
      font-size: 16px;
      font-weight: 700;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      margin-top: 20px;
      transition: background var(--transition-fast);
    }
    
    .checkout-btn:hover {
      background: var(--primary-hover);
    }
    
    .clear-cart-btn {
      width: 100%;
      padding: 12px;
      background: transparent;
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      border-radius: var(--radius-md);
      cursor: pointer;
      margin-top: 12px;
      transition: all var(--transition-fast);
    }
    
    .clear-cart-btn:hover {
      border-color: var(--error-color);
      color: var(--error-color);
    }
    
    .empty-cart {
      text-align: center;
      padding: 80px 24px;
    }
    
    .empty-icon {
      font-size: 64px;
      margin-bottom: 24px;
    }
    
    .empty-cart h2 {
      font-size: 24px;
      margin-bottom: 12px;
    }
    
    .empty-cart p {
      color: var(--text-muted);
      margin-bottom: 24px;
    }
    
    @media (max-width: 1024px) {
      .cart-layout {
        grid-template-columns: 1fr;
      }
      
      .cart-summary {
        position: static;
      }
    }
    
    @media (max-width: 768px) {
      .cart-item {
        flex-wrap: wrap;
      }
      
      .item-image {
        width: 80px;
        height: 80px;
      }
      
      .quantity-controls {
        order: 4;
        flex: 1;
        justify-content: center;
      }
      
      .item-total {
        order: 3;
        margin-left: auto;
      }
      
      .remove-btn {
        order: 5;
      }
    }
  `]
})
export class CartComponent {
  productService = inject(ProductService);
  
  increaseQuantity(productId: number, currentQty: number): void {
    const product = this.productService.getProductById(productId);
    if (product && currentQty < product.stock) {
      this.productService.updateQuantity(productId, currentQty + 1);
    }
  }
  
  decreaseQuantity(productId: number, currentQty: number): void {
    if (currentQty > 1) {
      this.productService.updateQuantity(productId, currentQty - 1);
    }
  }
  
  removeItem(productId: number): void {
    this.productService.removeFromCart(productId);
  }
  
  clearCart(): void {
    this.productService.clearCart();
  }
}
