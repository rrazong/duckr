import React from 'react';
import { container, title, slogan } from './styles.css';

const Home = () => (
  <div className={container}>
    <p className={title}>
      {'Duckr'}
    </p>
    <p className={slogan}>
      {'Scalablale, social, growth, machine-learning, viral, crowdfunded app in the cloud.'}
    </p>
  </div>
);

export default Home;
