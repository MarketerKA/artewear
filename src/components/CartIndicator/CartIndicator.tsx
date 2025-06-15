import React from 'react';
import styles from './CartIndicator.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/CartContext';

interface CartIndicatorProps {
  onOpenModal: () => void;
}

const CartIndicator: React.FC<CartIndicatorProps> = ({ onOpenModal }) => {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className={styles.cartIndicator} onClick={onOpenModal}>
      <FontAwesomeIcon icon={faShoppingCart} size="2x" />
      <span className={styles.cartCount}>{totalItems}</span>
    </div>
  );
};

export default CartIndicator; 