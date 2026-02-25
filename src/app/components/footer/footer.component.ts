import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h4 class="footer-title">Sobre Shopping</h4>
          <ul class="footer-links">
            <li><a href="#">¿Quiénes somos?</a></li>
            <li><a href="#">Trabaja con nosotros</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">Ayuda</h4>
          <ul class="footer-links">
            <li><a href="#">Centro de ayuda</a></li>
            <li><a href="#">Cambios y devoluciones</a></li>
            <li><a href="#">Envíos y entregas</a></li>
            <li><a href="#">Métodos de pago</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">Categorías</h4>
          <ul class="footer-links">
            <li><a href="#">Electrónica</a></li>
            <li><a href="#">Ropa y Moda</a></li>
            <li><a href="#">Hogar y Jardín</a></li>
            <li><a href="#">Deportes</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">Contacto</h4>
          <ul class="footer-links">
            <li><a href="#">WhatsApp: +54 9 11 1234-5678</a></li>
            <li><a href="#">Email: info&#64;shopping.com</a></li>
            <li><a href="#">Lunes a Viernes: 9h - 18h</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-dev">
        <h4>Desarrollado por Isaac Esteban Haro Torres</h4>
        <p><strong>Ingeniero en Sistemas · Full Stack · Automatización · Data</strong></p>
        <p>Email: zackharo1@gmail.com | WhatsApp: 098805517</p>
        <p>GitHub: <a href="https://github.com/ieharo1" target="_blank">https://github.com/ieharo1</a> | Portafolio: <a href="https://ieharo1.github.io/portafolio-isaac.haro/" target="_blank">https://ieharo1.github.io/portafolio-isaac.haro/</a></p>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Isaac Esteban Haro Torres - Todos los derechos reservados.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--secondary-color);
      color: var(--bg-white);
      margin-top: auto;
    }
    
    .footer-container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 40px 24px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
    }
    
    .footer-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
      color: var(--bg-white);
    }
    
    .footer-links li {
      margin-bottom: 10px;
    }
    
    .footer-links a {
      color: var(--text-muted);
      font-size: 13px;
      transition: color var(--transition-fast);
    }
    
    .footer-links a:hover {
      color: var(--primary-color);
    }
    
    .footer-dev {
      background: #1a1a2e;
      padding: 24px;
      text-align: center;
      border-top: 1px solid var(--secondary-light);
    }
    
    .footer-dev h4 {
      font-size: 16px;
      color: var(--bg-white);
      margin-bottom: 8px;
    }
    
    .footer-dev p {
      font-size: 13px;
      color: var(--text-muted);
      margin: 4px 0;
    }
    
    .footer-dev a {
      color: var(--accent-color);
    }
    
    .footer-dev a:hover {
      color: var(--primary-color);
    }
    
    .footer-dev a:hover {
      color: var(--primary-color);
    }
    
    .footer-bottom {
      border-top: 1px solid var(--secondary-light);
      padding: 16px 24px;
      text-align: center;
      background: #0f0f1a;
    }
    
    .footer-bottom p {
      color: var(--text-muted);
      font-size: 12px;
    }
    
    @media (max-width: 768px) {
      .footer-container {
        grid-template-columns: repeat(2, 1fr);
        padding: 32px 16px;
      }
    }
    
    @media (max-width: 480px) {
      .footer-container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {}
