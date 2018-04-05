import React from 'react';
import classes from './Button.css';

const Button = (props) => {
  return (
    <React.Fragment>
      <p
        className={classes.Button}
        onClick={e => props.click(e)}>
        {props.label}
      </p>
    </React.Fragment>
  );
};

export default Button;