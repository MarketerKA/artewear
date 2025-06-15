import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import Header from '../Header/Header';
import ProductCard from '../ProductCard/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const HomeComponent: React.FC = () => {
  const images = ['/logos/Group_96.png', '/logos/Group_99.png'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const products = [
    {
      id: 1,
      image: '/dissection_black/dissection_black_1-min.jpg',
      title: 'Футболка «brain dissection black»',
      price: 3290,
      description: [
        'вышитый логотип artewear.',
        'премиального футер',
        'свободный крой',
        'круглый вырез горловины с обтачкой кашкорсе',
        'спущенные плечи',
        'плотность 240гр'
      ],
      sizes: ['XS', 'S', 'M', 'L'],
      consist: 'Состав: 92% хлопок, 8% лайкра',
      color: 'черный'
    },
    {
      id: 2,
      image: '/dissection_white/dissection_white_3-min.jpg',
      title: 'Футболка «brain dissection white»',
      description: [
        'вышитый логотип artewear.',
        'премиального футер',
        'свободный крой',
        'круглый вырез горловины с обтачкой кашкорсе',
        'спущенные плечи',
        'плотность 240гр'
      ],
      price: '3290',
      sizes: ['S', 'M', 'L', 'XL'],
      consist: 'Состав: 80% хлопок, 20% полиэстер',
      color: 'белый'
    },
    {
      id: 3,
      image: '/spine/spine_3-min.jpg',
      title: 'Футболка черная «spine»',
      price: 3990,
      description: [
        'вышитый логотип artewear.',
        'премиального футер',
        'свободный крой',
        'круглый вырез горловины с обтачкой кашкорсе',
        'спущенные плечи',
        'плотность 240гр'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      consist: 'Состав: 80% хлопок, 20% полиэстер',
      color: 'черный'
    },
    {
      id: 4,
      image: '/aneurysm/aneurysm_4-min.jpg',
      title: 'Футболка молочная «aneurysm» с велюр эффектом',
      price: 3590,
      description: [
        'вышитый логотип artewear.',
        'премиального футер',
        'свободный крой',
        'круглый вырез горловины с обтачкой кашкорсе',
        'спущенные плечи',
        'плотность 240гр'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      consist: 'Состав: 80% хлопок, 20% полиэстер',
      color: 'белый'
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
        <h1 className={styles.mainTitle}>artewear. </h1>
        <p>– для тех, кто меняет мир к лучшему и делает это со стилем.</p>
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
                    consist: product.consist,
                    color: product.color 
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
                    consist: product.consist,
                    color: product.color 
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
