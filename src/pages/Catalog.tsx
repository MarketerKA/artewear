import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Catalog.module.scss';
import { products } from '../data/products';
import { productImages } from '../data/productImages';

// Group products by collection
const collections = Array.from(new Set(products.map(p => p.collection.id))).map(id => {
  const product = products.find(p => p.collection.id === id)!;
  return {
    id: product.collection.id,
    title: product.collection.title,
    description: product.collection.description,
    products: products.filter(p => p.collection.id === id)
  };
});

const Catalog: React.FC = () => {
  return (
    <div className={styles.catalog}>
      {collections.map((collection) => (
        <section key={collection.id} className={styles.collection}>
          <div className={styles.collectionHeader}>
            <h2 className={styles.collectionTitle}>{collection.title}</h2>
            <p className={styles.collectionDescription}>{collection.description}</p>
          </div>

          <div className={styles.productsGrid}>
            {collection.products.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <Link 
                  to={`/product/${product.id}`} 
                  state={product}
                  className={styles.productLink}
                >
                  <div className={styles.productImageWrapper}>
                    <img 
                      src={productImages[product.id][0]} 
                      alt={product.title}
                      className={styles.productImage}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p className={styles.productPrice}>{product.price} ₽</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Catalog; 