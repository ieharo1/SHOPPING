import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    @if (product()) {
      <div class="product-detail-container">
        <div class="breadcrumb">
          <a routerLink="/">Inicio</a>
          <span>/</span>
          <a routerLink="/" (click)="filterCategory()">{{ getCategoryName(product()!.category) }}</a>
          <span>/</span>
          <span>{{ product()!.name }}</span>
        </div>
        
        <div class="product-main">
          <div class="product-gallery">
            <div class="main-image-container">
              <img [src]="selectedImage()" [alt]="product()!.name" class="main-image" />
            </div>
            <div class="thumbnail-grid">
              @for (img of product()!.images; track img; let i = $index) {
                <button 
                  class="thumbnail" 
                  [class.active]="selectedImage() === img"
                  (click)="selectImage(img)"
                >
                  <img [src]="img" [alt]="product()!.name + ' image ' + (i + 1)" />
                </button>
              }
            </div>
          </div>
          
          <div class="product-info">
            <h1 class="product-title">{{ product()!.name }}</h1>
            
            <div class="product-meta">
              <div class="rating">
                @for (star of [1,2,3,4,5]; track star) {
                  <span class="star" [class.filled]="star <= product()!.rating">★</span>
                }
                <span class="rating-text">{{ product()!.rating }} ({{ product()!.reviews | number }} reseñas)</span>
              </div>
              <span class="sku">SKU: {{ product()!.sku }}</span>
            </div>
            
            <div class="price-section">
              <span class="current-price">\${{ product()!.price | number }}</span>
              @if (product()!.originalPrice) {
                <span class="original-price">\${{ product()!.originalPrice | number }}</span>
                <span class="discount">Ahorra \${{ (product()!.originalPrice! - product()!.price) | number }}</span>
              }
            </div>
            
            <div class="stock-status">
              @if (product()!.stock > 0) {
                <span class="in-stock">✓ Disponible ({{ product()!.stock }} unidades)</span>
              } @else {
                <span class="out-of-stock">✗ Agotado</span>
              }
            </div>
            
            <div class="quantity-section">
              <label>Cantidad:</label>
              <div class="quantity-controls">
                <button (click)="decreaseQuantity()" [disabled]="quantity() <= 1">-</button>
                <span>{{ quantity() }}</span>
                <button (click)="increaseQuantity()" [disabled]="quantity() >= product()!.stock">+</button>
              </div>
            </div>
            
            <button class="add-to-cart-btn" (click)="addToCart()">
              Agregar al carrito
            </button>
            
            <div class="features-section">
              <h3>Características:</h3>
              <ul>
                @for (feature of product()!.features; track feature) {
                  <li>• {{ feature }}</li>
                }
              </ul>
            </div>
            
            <div class="delivery-info">
              <div class="info-item">
                <span class="info-icon">🚚</span>
                <div>
                  <strong>Envío gratis</strong>
                  <p>En pedidos superiores a $2999</p>
                </div>
              </div>
              <div class="info-item">
                <span class="info-icon">🛡️</span>
                <div>
                  <strong>Garantía</strong>
                  <p>12 meses por defectos de fábrica</p>
                </div>
              </div>
              <div class="info-item">
                <span class="info-icon">↩️</span>
                <div>
                  <strong>Devolución</strong>
                  <p>30 días para cambios y devoluciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section class="description-section">
          <h2>Descripción del producto</h2>
          <p>{{ product()!.description }}</p>
        </section>
        
        @if (relatedProducts().length > 0) {
          <section class="related-section">
            <h2>Productos relacionados</h2>
            <div class="related-grid">
              @for (related of relatedProducts(); track related.id) {
                <app-product-card [product]="related" />
              }
            </div>
          </section>
        }
      </div>
    } @else {
      <div class="not-found">
        <h2>Producto no encontrado</h2>
        <a routerLink="/" class="btn btn-primary">Volver al inicio</a>
      </div>
    }
  `,
  styles: [`
    .product-detail-container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 24px;
    }
    
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
      font-size: 13px;
      color: var(--text-muted);
    }
    
    .breadcrumb a {
      color: var(--accent-color);
      transition: color var(--transition-fast);
    }
    
    .breadcrumb a:hover {
      color: var(--secondary-color);
    }
    
    .breadcrumb span:last-child {
      color: var(--text-medium);
    }
    
    .product-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      margin-bottom: 48px;
    }
    
    .product-gallery {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .main-image-container {
      background: var(--bg-light);
      border-radius: var(--radius-lg);
      overflow: hidden;
      aspect-ratio: 1;
    }
    
    .main-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .thumbnail-grid {
      display: flex;
      gap: 12px;
    }
    
    .thumbnail {
      width: 80px;
      height: 80px;
      border: 2px solid transparent;
      border-radius: var(--radius-md);
      overflow: hidden;
      cursor: pointer;
      padding: 0;
      background: none;
      transition: border-color var(--transition-fast);
    }
    
    .thumbnail.active {
      border-color: var(--primary-color);
    }
    
    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .product-info {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .product-title {
      font-size: 28px;
      font-weight: 700;
      color: var(--text-dark);
      line-height: 1.3;
    }
    
    .product-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-light);
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .star {
      color: var(--border-color);
      font-size: 16px;
    }
    
    .star.filled {
      color: var(--primary-color);
    }
    
    .rating-text {
      margin-left: 8px;
      font-size: 13px;
      color: var(--text-muted);
    }
    
    .sku {
      font-size: 12px;
      color: var(--text-muted);
    }
    
    .price-section {
      display: flex;
      align-items: baseline;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    .current-price {
      font-size: 36px;
      font-weight: 800;
      color: var(--text-dark);
    }
    
    .original-price {
      font-size: 20px;
      color: var(--text-muted);
      text-decoration: line-through;
    }
    
    .discount {
      background: #fef3cd;
      color: #856404;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 600;
    }
    
    .stock-status {
      padding: 12px 16px;
      background: var(--bg-offwhite);
      border-radius: var(--radius-md);
    }
    
    .in-stock {
      color: var(--success-color);
      font-weight: 500;
    }
    
    .out-of-stock {
      color: var(--error-color);
      font-weight: 500;
    }
    
    .quantity-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .quantity-section label {
      font-weight: 500;
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
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-light);
      border: none;
      border-radius: var(--radius-sm);
      font-size: 18px;
      cursor: pointer;
      transition: background var(--transition-fast);
    }
    
    .quantity-controls button:hover:not(:disabled) {
      background: var(--border-color);
    }
    
    .quantity-controls button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .quantity-controls span {
      min-width: 40px;
      text-align: center;
      font-weight: 600;
    }
    
    .add-to-cart-btn {
      padding: 16px 32px;
      background: var(--primary-color);
      color: var(--text-dark);
      font-size: 16px;
      font-weight: 700;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background var(--transition-fast);
    }
    
    .add-to-cart-btn:hover {
      background: var(--primary-hover);
    }
    
    .features-section {
      padding: 20px;
      background: var(--bg-offwhite);
      border-radius: var(--radius-md);
    }
    
    .features-section h3 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    
    .features-section ul {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .features-section li {
      font-size: 13px;
      color: var(--text-medium);
    }
    
    .delivery-info {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
    }
    
    .info-item {
      display: flex;
      gap: 12px;
    }
    
    .info-icon {
      font-size: 20px;
    }
    
    .info-item strong {
      font-size: 13px;
      display: block;
    }
    
    .info-item p {
      font-size: 12px;
      color: var(--text-muted);
      margin: 0;
    }
    
    .description-section {
      margin-bottom: 48px;
      padding: 24px;
      background: var(--bg-white);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-light);
    }
    
    .description-section h2 {
      font-size: 20px;
      margin-bottom: 16px;
    }
    
    .description-section p {
      line-height: 1.7;
      color: var(--text-medium);
    }
    
    .related-section h2 {
      font-size: 24px;
      margin-bottom: 24px;
    }
    
    .related-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }
    
    .not-found {
      text-align: center;
      padding: 80px 24px;
    }
    
    .not-found h2 {
      margin-bottom: 20px;
    }
    
    @media (max-width: 1024px) {
      .related-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .product-main {
        grid-template-columns: 1fr;
        gap: 24px;
      }
      
      .product-title {
        font-size: 22px;
      }
      
      .current-price {
        font-size: 28px;
      }
      
      .related-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 480px) {
      .related-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  
  product = signal<Product | undefined>(undefined);
  selectedImage = signal<string>('');
  quantity = signal<number>(1);
  relatedProducts = signal<Product[]>([]);
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      const product = this.productService.getProductById(id);
      this.product.set(product);
      
      if (product) {
        this.selectedImage.set(product.image);
        this.relatedProducts.set(this.productService.getRelatedProducts(product));
      }
    });
  }
  
  selectImage(image: string): void {
    this.selectedImage.set(image);
  }
  
  increaseQuantity(): void {
    const p = this.product();
    if (p && this.quantity() < p.stock) {
      this.quantity.update(q => q + 1);
    }
  }
  
  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }
  
  addToCart(): void {
    const p = this.product();
    if (p) {
      this.productService.addToCart(p, this.quantity());
    }
  }
  
  filterCategory(): void {
    const p = this.product();
    if (p) {
      this.productService.setCategory(p.category);
    }
  }
  
  getCategoryName(categoryId: string): string {
    const category = this.productService.categories().find(c => c.id === categoryId);
    return category?.name || categoryId;
  }
}
