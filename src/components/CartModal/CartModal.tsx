import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CartModal.module.scss';
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (!isOpen) {
    return null;
  }

  const handleProductClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
      <div className={`${styles.modalContent} ${isOpen ? styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Ваш заказ</h2>
        {items.length === 0 ? (
          <p>В корзине пока ничего нет.</p>
        ) : (
          <>
            <div className={styles.cartItems}>
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className={styles.cartItem}>
                  <Link 
                    to={`/product/${item.id}`} 
                    state={item}
                    onClick={handleProductClick}
                    className={styles.productLink}
                  >
                    <img src={item.image} alt={item.title} className={styles.itemImage} />
                    <div className={styles.itemInfo}>
                      <h3>{item.title}</h3>
                      <p>Размер: {item.selectedSize}</p>
                    </div>
                  </Link>
                  <div className={styles.quantityControls}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      className={styles.quantityButton}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      className={styles.quantityButton}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <span className={styles.itemPrice}>{item.price} ₽</span>
                  <button 
                    className={styles.removeButton} 
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.cartSummary}>
              <div className={styles.totalPrice}>
                <span>Сумма:</span>
                <span>{getTotalPrice()} ₽</span>
              </div>
              <button className={styles.checkoutButton}>
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal; 