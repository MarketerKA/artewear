import React from 'react';
import styles from './Home.module.scss';

const HomeComponent: React.FC = () => {
  return (
    <div className={styles.homeComponent}>
      <div className={styles.content}>
        <h2>Добро пожаловать в наше приложение</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>Функция 1</h3>
            <p>Описание первой функции</p>
          </div>
          <div className={styles.feature}>
            <h3>Функция 2</h3>
            <p>Описание второй функции</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent; 