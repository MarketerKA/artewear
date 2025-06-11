import React, { useState, useCallback } from 'react';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToProducts = useCallback(() => {
    const productsSection = document.querySelector('section[class*="productsSection"]');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <button className={styles.menuButton} onClick={toggleMenu}>
            <FontAwesomeIcon 
              icon={isMenuOpen ? faTimes : faBars} 
              style={{color: "#831100"}} 
              size="2x" 
            />
          </button>
        </div>

        <div className={styles.logo}>
          <a href="/">
            <img src="/logos/logo1.png" alt="ArteWear Logo" />
          </a>
        </div>
        
        <div className={styles.actions}>
          <div className={styles.language}>
            <a href="https://t.me/artwear">
              <FontAwesomeIcon icon={faTelegram} style={{color: "#831100"}} size="2x" />
            </a>
            <a href="mailto:your@email.com">
              <FontAwesomeIcon icon={faEnvelope} style={{color: "#831100"}} size="2x" />
            </a>
          </div>
        </div>

        <nav className={`${styles.navigation} ${isMenuOpen ? styles.active : ''}`}>
          <div className={styles.menuContent}>
            <ul>
              <li><a href="/" onClick={() => setIsMenuOpen(false)}>Главная</a></li>
              <li><a href="/catalog" onClick={scrollToProducts}>Каталог</a></li>
              <li><a href="/about" onClick={() => setIsMenuOpen(false)}>О нас</a></li>
              <li><a href="/contact" onClick={() => setIsMenuOpen(false)}>Контакты</a></li>
            </ul>
            <div className={styles.mobileSocial}>
              <a href="https://t.me/artwear">
                <FontAwesomeIcon icon={faTelegram} style={{color: "#831100"}} size="2x" />
              </a>
              <a href="mailto:your@email.com">
                <FontAwesomeIcon icon={faEnvelope} style={{color: "#831100"}} size="2x" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 