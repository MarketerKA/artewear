import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './ProductDetail.module.scss';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { image, title, description, price, sizes, consist, color } = location.state || {};
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCareInstructionsVisible, setIsCareInstructionsVisible] = useState(false);
  const [isSizeGuideVisible, setIsSizeGuideVisible] = useState(false);

  // Define images for dissection_black product
  const dissectionBlackImages = [
    '/dissection_black/dissection_black_1-min.jpg',
    '/dissection_black/dissection_black_2-min.jpg',
    '/dissection_black/dissection_black_3-min.jpg',
    '/dissection_black/dissection_black_4-min.jpg',
    '/dissection_black/dissection_black_5-min.jpg',
  ];

  // Define images for dissection_white product
  const dissectionWhiteImages = [
    '/dissection_white/dissection_white_1-min.jpg',
    '/dissection_white/dissection_white_2-min.jpg',
    '/dissection_white/dissection_white_3-min.jpg',
    '/dissection_white/dissection_white_4-min.jpg',
    '/dissection_white/dissection_white_5-min.jpg',
  ];

  const spineImages = [
    '/spine/spine_1-min.jpg',
    '/spine/spine_2-min.jpg',
    '/spine/spine_3-min.jpg',
    '/spine/spine_4-min.jpg',
    '/spine/spine_5-min.jpg',
  ];
  const aneurysmImages = [
    '/aneurysm/aneurysm_1-min.jpg',
    '/aneurysm/aneurysm_2-min.jpg',
    '/aneurysm/aneurysm_3-min.jpg',
    '/aneurysm/aneurysm_4-min.jpg',
    '/aneurysm/aneurysm_5-min.jpg',
    '/aneurysm/aneurysm_6-min.jpg',
    '/aneurysm/aneurysm_7-min.jpg',
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
        {Number(id) !== 1 && Number(id) !== 2 && Number(id) !== 3 && Number(id) !== 4 && (
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
            <h3>Описание:</h3>
            <ul>
              {description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className={styles.description}>{description}</p>
        )}
        <div className={styles.descriptionSection}>
          <h3>Состав:</h3>
          <p className={styles.description}>{consist.replace('Состав:', '').trim()}</p>
        </div>
        {color && (
          <div className={styles.descriptionSection}>
            <h3>Цвет:</h3>
            <p className={styles.description}>{color}</p>
          </div>
        )}
        
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
      </div>
    </div>
  );
};

export default ProductDetail; 