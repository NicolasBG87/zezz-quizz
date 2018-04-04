import React from 'react';
import classes from './Register.css';

import RegisterForm from './RegisterForm/RegisterForm';

const Register = () => {
  return (
    <div className={classes.Register}>
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;