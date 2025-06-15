import React from 'react';
import styles from './FavoriteIndicator.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../../context/FavoritesContext';

interface FavoriteIndicatorProps {
  onOpenModal: () => void;
}

const FavoriteIndicator: React.FC<FavoriteIndicatorProps> = ({ onOpenModal }) => {
  const { items: favoriteItems } = useFavorites();

  if (favoriteItems.length === 0) {
    return null; // Don't render if there are no favorite items
  }

  return (
    <div className={styles.favoriteIndicator} onClick={onOpenModal}>
      <FontAwesomeIcon icon={faHeartSolid} size="2x" />
      <span className={styles.favoriteCount}>{favoriteItems.length}</span>
    </div>
  );
};

export default FavoriteIndicator; 