import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FavoritesModal.module.scss';
import { useFavorites } from '../../context/FavoritesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { FavoriteItem } from '../../context/FavoritesContext';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({ isOpen, onClose }) => {
  const { items, removeFromFavorites } = useFavorites();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
      <div className={`${styles.modalContent} ${isOpen ? styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Избранное</h2>
        {items.length === 0 ? (
          <p>В избранном пока ничего нет.</p>
        ) : (
          <div className={styles.favoriteItems}>
            {items.map((item: FavoriteItem) => (
              <div key={item.id} className={styles.favoriteItem}>
                <Link 
                  to={`/product/${item.id}`} 
                  state={item}
                  onClick={(e) => e.stopPropagation()}
                  className={styles.productLink}
                >
                  <img src={item.image} alt={item.title} className={styles.itemImage} />
                  <div className={styles.itemInfo}>
                    <h3>{item.title}</h3>
                  </div>
                </Link>
                <span className={styles.itemPrice}>{item.price} ₽</span>
                <button 
                  className={styles.removeButton} 
                  onClick={() => removeFromFavorites(item.id)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className={styles.cartSummary}>
          <Link to="/catalog" className={styles.checkoutButton} onClick={onClose}>
            Перейти в каталог
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal; 