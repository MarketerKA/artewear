import React from 'react';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt="Product" className={styles.productImage} />
      </div>
    </div>
  );
};

export default ProductCard; 