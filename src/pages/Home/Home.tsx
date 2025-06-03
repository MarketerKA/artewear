import React from 'react';
import HomeComponent from '../../components/Home';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <HomeComponent />
    </div>
  );
};

export default Home; 