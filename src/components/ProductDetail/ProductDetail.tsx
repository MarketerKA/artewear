import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { productImages } from '../../data/productImages';
import styles from './ProductDetail.module.scss';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { image, title, description, price, sizes, consist, color } = location.state || {};
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCareInstructionsVisible, setIsCareInstructionsVisible] = useState(false);
  const [isSizeGuideVisible, setIsSizeGuideVisible] = useState(false);
  const [isConsistVisible, setIsConsistVisible] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [isFavoriteState, setIsFavoriteState] = useState(false);
  const { addToCart, removeFromCart, items } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Get current product images
  const currentImages = id ? productImages[Number(id)] || [image] : [image];

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

  useEffect(() => {
    if (id) {
      setIsFavoriteState(isFavorite(Number(id)));
    }
  }, [id, isFavorite]);

  useEffect(() => {
    if (id && selectedSize) {
      const isInCart = items.some(item => item.id === Number(id) && item.selectedSize === selectedSize);
      setIsAddedToCart(isInCart);
    }
  }, [id, selectedSize, items]);

  const handleToggleFavorite = () => {
    if (id && title && price) {
      if (isFavoriteState) {
        removeFromFavorites(Number(id));
      } else {
        const favoriteItem = {
          id: Number(id),
          title,
          price: Number(price),
          image: currentImages[currentImageIndex],
          description,
          sizes,
          consist,
          color
        };
        addToFavorites(favoriteItem);
      }
      setIsFavoriteState(!isFavoriteState);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % currentImages.length
    );
  };

  const handleImageClick = () => {
    setIsFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  const handleFullScreenPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    handlePrevImage();
  };

  const handleFullScreenNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleNextImage();
  };

  const handleAddToCart = () => {
    if (id && title && price && selectedSize) {
      if (isAddedToCart) {
        removeFromCart(Number(id));
        setIsAddedToCart(false);
      } else {
        const cartItem = {
          id: Number(id),
          title,
          price: Number(price),
          image: currentImages[currentImageIndex],
          description,
          sizes,
          consist,
          color,
          selectedSize,
          quantity: 1
        };
        addToCart(cartItem);
        setIsAddedToCart(true);
      }
    }
  };

  if (!image || !title || !description || !price) {
    return <div className={styles.productDetail}>Product details not found. Please navigate from the home page.</div>;
  }

  return (
    <div className={styles.productDetail}>
      <div className={styles.imageContainer}>
        {currentImages.length > 1 && (
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
              onClick={handleImageClick}
              style={{ cursor: 'pointer' }}
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
        {currentImages.length === 1 && (
          <img 
            src={image} 
            alt={title} 
            className={styles.productImage} 
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>

      {isFullScreen && (
        <div className={styles.fullScreenOverlay} onClick={handleCloseFullScreen}>
          <button className={styles.closeButton} onClick={handleCloseFullScreen}>
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </button>
          <button 
            className={styles.fullScreenArrow} 
            onClick={handleFullScreenPrev}
            style={{ left: '20px' }}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="3x" />
          </button>
          <img 
            src={currentImages[currentImageIndex]} 
            alt={title} 
            className={styles.fullScreenImage}
            onClick={(e) => e.stopPropagation()}
          />
          <button 
            className={styles.fullScreenArrow} 
            onClick={handleFullScreenNext}
            style={{ right: '20px' }}
          >
            <FontAwesomeIcon icon={faChevronRight} size="3x" />
          </button>
        </div>
      )}

      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{title}</h1>
        {Array.isArray(description) ? (
          <div className={styles.descriptionSection}>
            <h3>Описание</h3>
            <ul className={styles.descriptionList}>
              {description.map((item, index) => (
                <li key={index} className={styles.descriptionItem}>
                  <span className={styles.bulletPoint}>•</span>
                  <span className={styles.itemText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={styles.descriptionSection}>
            <h3>Описание</h3>
            <p className={styles.description}>{description}</p>
          </div>
        )}
        {color && (
          <div className={styles.colorSection}>
            <h3>Цвет</h3>
            <p className={styles.description}>{color}</p>
          </div>
        )}

        <div className={styles.sizeSelection}>
          <h3>Выберите размер</h3>
          <div className={styles.sizeButtons}>
            {sizes.map((size: string) => (
              <button
                key={size}
                className={`${styles.sizeButton} ${selectedSize === size ? styles.activeSizeButton : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button 
            className={styles.addToCartButton} 
            onClick={handleAddToCart}
            disabled={!selectedSize}
            data-added={isAddedToCart}
          >
            {isAddedToCart ? 'Добавлено в корзину' : 'Добавить в корзину'}
          </button>
          <button 
            className={styles.favoriteButton}
            onClick={handleToggleFavorite}
          >
            {isFavoriteState ? (
              <FontAwesomeIcon icon={faHeartSolid} size="2x" />
            ) : (
              <FontAwesomeIcon icon={faHeartRegular} size="2x" />
            )}
          </button>
        </div>
        <p className={styles.price}>{price} ₽</p>

        <div className={styles.careInstructions}>
          <button 
            className={styles.careInstructionsToggle}
            onClick={() => setIsCareInstructionsVisible(!isCareInstructionsVisible)}
          >
            <h3>Уход за изделием</h3>
            <FontAwesomeIcon 
              icon={isCareInstructionsVisible ? faChevronUp : faChevronDown} 
              className={styles.toggleIcon}
            />
          </button>
          {isCareInstructionsVisible && (
            <ul>
              <li>Избегайте использования кондиционера (может деформировать волокна)</li>
              <li>Не применять отбеливатели, кислородные пятновыводители и другие агрессивные химические средства</li>
              <li>Не использовать мячики и другие утяжелители для стирки</li>
              <li>Сушка только в горизонтальном положении, вдали от нагревательных приборов</li>
              <li>Не сушить в сушильной машине</li>
              <li>Глажка при температуре до 110°C</li>
              <li>Хранить в сложенном виде, чтобы избежать деформации изделия</li>
            </ul>
          )}
        </div>

        <div className={styles.sizeGuide}>
          <button 
            className={styles.sizeGuideToggle}
            onClick={() => setIsSizeGuideVisible(!isSizeGuideVisible)}
          >
            <h3>Гид по размерам</h3>
            <FontAwesomeIcon 
              icon={isSizeGuideVisible ? faChevronUp : faChevronDown} 
              className={styles.toggleIcon}
            />
          </button>
          {isSizeGuideVisible && (
            <div className={styles.sizeGuideImage}>
              <img src="/size_table.png" alt="Size Guide" />
            </div>
          )}
        </div>

        <div className={styles.consistSection}>
          <button 
            className={styles.consistToggle}
            onClick={() => setIsConsistVisible(!isConsistVisible)}
          >
            <h3>Состав</h3>
            <FontAwesomeIcon 
              icon={isConsistVisible ? faChevronUp : faChevronDown} 
              className={styles.toggleIcon}
            />
          </button>
          {isConsistVisible && (
            <p className={styles.description}>{consist.replace('Состав:', '').trim()}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 