import React from 'react';
import classes from './Header.css';
import logo from '../../assets/images/logo.png';

import { NavLink } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { connect } from 'react-redux';
import { auth } from '../../constants/firebase';
import firebase from 'firebase';

import Dialog from 'material-ui/Dialog';

class Header extends React.Component {
  state = {
    open: false,
    alertMsg: ""
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  logOut = () => {
    auth.doSignOut();
  }

  resetPassword = () => {
    const { user } = this.props;
    let alertMsg;
    
    firebase.auth().sendPasswordResetEmail(user.email)
      .then(() =>{
        alertMsg = "Password Reset email sent!";
        this.setState({ alertMsg });
        this.handleOpen();
      })
      .catch((err) => {
        alertMsg = err;
        this.setState({ alertMsg });
        this.handleOpen();
      })
  }

  render() {
    const { user } = this.props;

    return (
      <div className={classes.Header}>
        <img src={logo} alt="logo" className={classes.Logo} />
        <span className={classes.Title}>ZezzQuiz</span>
        <span>
          { user 
            ? <div className={classes.Login}>
                <NavLink
                  exact 
                  to={routes.ACCOUNT}
                  style={{textDecoration: "none"}}
                >
                  <span className={classes.LoginTxt}>{user.displayName}</span>
                </NavLink>
                <NavLink
                  exact 
                  to={routes.ACCOUNT}
                >
                  <button className={classes.littleBtn}>
                    <i className="fas fa-user" />
                  </button>
                </NavLink>
                <button 
                  className={classes.littleBtn} 
                  onClick={this.resetPassword}>
                    <i className="fas fa-key" />
                </button>
                <button 
                  className={classes.littleBtn} 
                  onClick={this.logOut}>
                    <i className="fas fa-sign-out-alt" />
                </button>
              </div>
            : <NavLink
                exact 
                to={routes.LOGIN}
                className={classes.Login}
              >
                Login
              </NavLink>
          }
        </span>
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.state.alertMsg}
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps, null)(Header);