import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './ProductDetail.module.scss';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { image, title, description, price, sizes, consist } = location.state || {};

  // Define images for dissection_black product
  const dissectionBlackImages = [
    '/dissection_black/dissection_black_1.jpg',
    '/dissection_black/dissection_black_2.jpg',
    '/dissection_black/dissection_black_3.jpg',
    '/dissection_black/dissection_black_4.jpg',
    '/dissection_black/dissection_black_5.jpg',
  ];

  // Define images for dissection_white product
  const dissectionWhiteImages = [
    '/dissection_white/dissection_white_1.jpg',
    '/dissection_white/dissection_white_2.jpg',
    '/dissection_white/dissection_white_3.jpg',
    '/dissection_white/dissection_white_4.jpg',
    '/dissection_white/dissection_white_5.jpg',
  ];

  const spineImages = [
    '/spine/spine_1.jpg',
    '/spine/spine_2.jpg',
    '/spine/spine_3.jpg',
    '/spine/spine_4.jpg',
    '/spine/spine_5.jpg',
  ];
  const aneurysmImages = [
    '/aneurysm/aneurysm_1.jpg',
    '/aneurysm/aneurysm_2.jpg',
    '/aneurysm/aneurysm_3.jpg',
    '/aneurysm/aneurysm_4.jpg',
    '/aneurysm/aneurysm_5.jpg',
    '/aneurysm/aneurysm_6.jpg',
    '/aneurysm/aneurysm_7.jpg',
    ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set default size to 'M' when component mounts or product.sizes change
  useEffect(() => {
    if (sizes?.includes('M')) {
      setSelectedSize('M');
    } else if (sizes?.length > 0) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes]);

  const handlePrevImage = () => {
    const currentImages = Number(id) === 1 ? dissectionBlackImages : 
                         Number(id) === 2 ? dissectionWhiteImages :
                         Number(id) === 3 ? spineImages :
                         Number(id) === 4 ? aneurysmImages :
                         [image];
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    const currentImages = Number(id) === 1 ? dissectionBlackImages : 
                         Number(id) === 2 ? dissectionWhiteImages :
                         Number(id) === 3 ? spineImages :
                         Number(id) === 4 ? aneurysmImages :
                         [image];
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % currentImages.length
    );
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  if (!image || !title || !description || !price) {
    return <div className={styles.productDetail}>Product details not found. Please navigate from the home page.</div>;
  }

  const currentImages = Number(id) === 1 ? dissectionBlackImages : 
                       Number(id) === 2 ? dissectionWhiteImages : 
                       Number(id) === 3 ? spineImages :
                       Number(id) === 4 ? aneurysmImages :
                       [image];

  return (
    <div className={styles.productDetail}>
      <div className={styles.imageContainer}>
        {(Number(id) === 1 || Number(id) === 2 || Number(id) === 3 || Number(id) === 4) && (
          <>
            <button 
              className={styles.arrowButton} 
              onClick={handlePrevImage}
              style={{ left: '10px' }}
            >
              <FontAwesomeIcon icon={faChevronLeft} size="2x" />
            </button>
            <img 
              src={currentImages[currentImageIndex]} 
              alt={title} 
              className={styles.productImage} 
            />
            <button 
              className={styles.arrowButton} 
              onClick={handleNextImage}
              style={{ right: '10px' }}
            >
              <FontAwesomeIcon icon={faChevronRight} size="2x" />
            </button>
            <div className={styles.imageDots}>
              {currentImages.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </>
        )}
        {Number(id) !== 1 && Number(id) !== 2 && Number(id) !== 3 && Number(id) !== 4 && (
          <img src={image} alt={title} className={styles.productImage} />
        )}
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <p className={styles.description}>
          <strong>Состав:</strong> {consist.replace('Состав:', '').trim()}
        </p>
        <p className={styles.price}>{price} ₽</p>
        
        <div className={styles.sizeSelection}>
          <h3>Select Size:</h3>
          <select 
            value={selectedSize} 
            onChange={handleSizeChange}
            className={styles.sizeSelect}
          >
            <option value="" disabled>Select a Size</option>
            {sizes.map((size: string) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <button 
          className={styles.addToCartButton}
          disabled={!selectedSize}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail; 