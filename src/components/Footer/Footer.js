import React from 'react';
import classes from './Footer.css';

const Footer = () => {
  return (
    <div className={classes.Footer} >
      <p>&copy; {new Date().getFullYear()} by Nikola Bojanovic</p>
    </div>
  );
};

export default Footer;