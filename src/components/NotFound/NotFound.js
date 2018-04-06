import React from 'react';
import classes from './NotFound.css';
import image from '../../assets/images/not-found.png';

const NotFound = () => {
  return (
    <div className={classes.NotFound}>
      <img src={image} alt="Not Found" />
    </div>
  );
};

export default NotFound;