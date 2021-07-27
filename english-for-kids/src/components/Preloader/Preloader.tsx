import React from 'react';
import preloader from '../../assets/Pinwheel.gif';
import './preloader.scss';

const Preloader: React.FC = () => (
  <div className="preloader">
    <img src={preloader} alt="" />
  </div>
);

export default Preloader;
