import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import Header from '../Header/Header';
import ProductCard from '../ProductCard/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const HomeComponent: React.FC = () => {
  const images = ['/main3.svg', '/main4.svg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const products = [
    {
      id: 1,
      image: '/dissection_black/dissection_black_1.jpg',
      title: 'Футболка «brain dissection black»',
      price: 3290,
      description: 'Элегантный тренч с уникальными рюшами, идеально подходящий для создания стильного и неповторимого образа.',
      sizes: ['XS', 'S', 'M', 'L'],
      consist: 'Состав: 92% хлопок, 8% лайкра'
    },
    {
      id: 2,
      image: '/dissection_white/dissection_white_3.jpg',
      title: 'Футболка «brain dissection white»',
      price: 3290,
      description: 'Просторный и удобный шоппер с ярким принтом, идеальный для повседневного использования в городской среде.',
      sizes: ['XS', 'S', 'M', 'L'],
      consist: 'Состав: 92% хлопок, 8% лайкра'
    },
    {
      id: 3,
      image: '/spine/spine_3.jpg',
      title: 'Футболка черная «spine»',
      price: 3990,
      description: 'Уютный свитшот с абстрактным принтом, вдохновленным морскими глубинами, для комфортного и стильного образа.',
      sizes: ['S', 'M', 'L', 'XL'],
      consist: 'Состав: 92% хлопок, 8% лайкра'
    },
    {
      id: 4,
      image: '/aneurysm/aneurysm_4.jpg',
      title: 'Футболка молочная «aneurysm» с велюр эффектом',
      price: 3590,
      description: 'Уютный свитшот с абстрактным принтом, вдохновленным морскими глубинами, для комфортного и стильного образа.',
      sizes: ['S', 'M', 'L', 'XL'],
      consist: 'Состав: 92% хлопок, 8% лайкра'
    }
  ];

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 15000);
    return () => clearInterval(interval);
  }, []);

  const productsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = useCallback(() => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className={styles.home}>
      <h1>artewear. </h1>
      <p>– для тех, кто меняет мир к лучшему и делает это со стилем.</p>
      <Header />
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <button className={styles.arrowButton} onClick={prevSlide} style={{ left: '20px' }}>
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </button>
          <img 
            src={images[currentImageIndex]} 
            alt="ArteWear main illustration" 
            className={styles.mainImage} 
          />
          <button className={styles.arrowButton} onClick={nextSlide} style={{ right: '20px' }}>
            <FontAwesomeIcon icon={faChevronRight} size="2x" />
          </button>
          <button className={styles.collectionButton} onClick={scrollToProducts}>К коллекции</button>
        </div>
        
        
        <section ref={productsSectionRef} className={styles.productsSection}>
          <h2>Наши продукты</h2>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <Link 
                  to={`/product/${product.id}`} 
                  state={{ 
                    image: product.image, 
                    title: product.title, 
                    description: product.description, 
                    price: product.price, 
                    sizes: product.sizes, 
                    consist: product.consist 
                  }}
                >
                  <ProductCard
                    image={product.image}
                  />
                </Link>
                <Link 
                  to={`/product/${product.id}`} 
                  state={{ 
                    image: product.image, 
                    title: product.title, 
                    description: product.description, 
                    price: product.price, 
                    sizes: product.sizes,
                    consist: product.consist 
                  }} 
                  className={styles.productTitleLink}
                >
                  <h3 className={styles.productTitle}>{product.title}</h3>
                </Link>
                <p className={styles.productPrice}>{product.price} ₽</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeComponent;
