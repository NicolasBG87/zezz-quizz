import React from 'react';
import classes from './Button.css';

import RaisedButton from 'material-ui/RaisedButton';

const Button = (props) => {
  return (
    <React.Fragment>
      <RaisedButton 
        className={classes.Button} 
        label={props.label} 
        fullWidth={true}
        onClick={e => props.click(e)} />
    </React.Fragment>
  );
};

export default Button;