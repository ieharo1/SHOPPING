import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <header class="navbar">
      <div class="navbar-container">
        <a routerLink="/" class="logo">
          <span class="logo-icon">🛒</span>
          <span class="logo-text">Shopping</span>
        </a>
        
        <div class="search-container">
          <input 
            type="text" 
            class="search-input"
            placeholder="Buscar productos..."
            [(ngModel)]="searchValue"
            (keyup.enter)="onSearch()"
          />
          <button class="search-btn" (click)="onSearch()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
        </div>
        
        <nav class="nav-actions">
          <a routerLink="/cart" class="cart-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            @if (productService.cartCount() > 0) {
              <span class="cart-badge">{{ productService.cartCount() }}</span>
            }
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      background: var(--secondary-color);
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--shadow-md);
    }
    
    .navbar-container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      gap: 24px;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      flex-shrink: 0;
    }
    
    .logo-icon {
      font-size: 28px;
    }
    
    .logo-text {
      font-size: 22px;
      font-weight: 700;
      color: var(--bg-white);
    }
    
    .logo-accent {
      color: var(--primary-color);
    }
    
    .search-container {
      flex: 1;
      max-width: 700px;
      display: flex;
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    
    .search-input {
      flex: 1;
      padding: 10px 16px;
      border: none;
      font-size: 14px;
      outline: none;
    }
    
    .search-btn {
      padding: 10px 20px;
      background: var(--primary-color);
      border: none;
      cursor: pointer;
      transition: background var(--transition-fast);
    }
    
    .search-btn:hover {
      background: var(--primary-hover);
    }
    
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .cart-btn {
      position: relative;
      padding: 8px;
      color: var(--bg-white);
      display: flex;
      align-items: center;
      transition: color var(--transition-fast);
    }
    
    .cart-btn:hover {
      color: var(--primary-color);
    }
    
    .cart-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: var(--primary-color);
      color: var(--text-dark);
      font-size: 11px;
      font-weight: 700;
      min-width: 18px;
      height: 18px;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    @media (max-width: 768px) {
      .navbar-container {
        padding: 12px 16px;
        flex-wrap: wrap;
      }
      
      .logo-text {
        font-size: 18px;
      }
      
      .search-container {
        order: 3;
        flex-basis: 100%;
        max-width: 100%;
        margin-top: 8px;
      }
    }
  `]
})
export class NavbarComponent {
  productService = inject(ProductService);
  searchValue = '';
  
  onSearch(): void {
    this.productService.setSearch(this.searchValue);
  }
}
