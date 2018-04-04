import React from 'react';
import classes from './Login.css';

import { auth } from '../../constants/firebase/firebase';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import axios from '../../constants/axios';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import peaking from '../../assets/images/peaking.png';


const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class Login extends React.Component {
  state = {
    ...INITIAL_STATE,
    alertOpen: false,
  }

  alertOpen = () => {
    this.setState({ alertOpen: true });
  }

  alertClose = () => {
    this.setState({ alertOpen: false });
  }

  submitUserInfo = (e) => {
    const userData = new FormData(e.target);
    const loginData = {
      email: "",
      password: "",
      user: ""
    };
    userData.forEach((value, key) => {
      loginData[key] = value;
    });
    auth.signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(res => {
        let newUser = {
          user: loginData.user,
          email: loginData.email,
          score: 0
        };
        let url = "/ladder.json";
        axios.post(url, newUser);
        this.props.history.push("/")
      })
      .catch(err => {
        this.setState({ error: err.message });
        this.alertOpen();
      });
    e.preventDefault();
  }

  signInGoogle = (e) => {
    e.preventDefault();
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(res => {
        if(res.additionalUserInfo.isNewUser) {
          let newUser = {
            user: res.user.displayName,
            email: res.user.email,
            score: 0
          };
          let url = "/ladder.json";
          axios.post(url, newUser);
        }
        this.props.history.push("/")
      })
      .catch(err => {
        this.setState({ error: err.message });
        this.alertOpen();
      });
  }

  signInFacebook = (e) => {
    e.preventDefault();
    let provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
      .then(res => {
        if(res.additionalUserInfo.isNewUser) {
          let newUser = {
            user: res.user.displayName,
            email: res.user.email,
            score: 0
          };
          let url = "/ladder.json";
          axios.post(url, newUser);
        }
        this.props.history.push("/")
      })
      .catch(err => {
        this.setState({ error: err.message });
        this.alertOpen();
      });
  }

  signInTwitter = (e) => {
    e.preventDefault();
    let provider = new firebase.auth.TwitterAuthProvider();
    auth.signInWithPopup(provider)
      .then(res => {
        if(res.additionalUserInfo.isNewUser) {
          let newUser = {
            user: res.user.displayName,
            email: res.user.email,
            score: 0
          };
          let url = "/ladder.json";
          axios.post(url, newUser);
        }
        this.props.history.push("/")
      })
      .catch(err => {
        this.setState({ error: err.message });
        this.alertOpen();
      });
  }

  render() {
    return (
      <div className={classes.Login} >
        <img src={peaking} alt="peaking" />
        <form onSubmit={this.submitUserInfo}>
          <TextField
            hintText="example@example.com" 
            type="email"
            fullWidth={true}
            floatingLabelText={<span><i className="fas fa-user"></i> Email</span>}
            style={{marginRight: "10px"}}
            name="email"
          />
          <TextField
            hintText="Enter password..." 
            type="password"
            fullWidth={true}
            floatingLabelText={<span><i className="fas fa-key"></i> Password</span>}
            name="password"
          /><br />
          <RaisedButton 
            label="Login" 
            labelColor="#ffffff" 
            backgroundColor="#3fb0ac" 
            type="submit"
            style={{ 
              marginTop: "20px", 
              width: "50%" }} /> <br />
        </form>
        <p>Or use Facebook / Twitter / Google</p>
        <RaisedButton 
          label={<i className="fab fa-facebook-f"></i>} 
          labelColor="#ffffff" 
          onClick={this.signInFacebook}
          backgroundColor="
          #1678f0"
          style={{ 
            marginTop: "10px",
            marginRight: "10px",
            width: "30%"
          }} />
        <RaisedButton 
          label={<i className="fab fa-twitter"></i>} 
          labelColor="#ffffff" 
          backgroundColor="
          #4eb8ff"
          onClick={this.signInTwitter}
          style={{ 
            marginTop: "10px",
            marginRight: "10px",
            width: "30%"
          }} />
        <RaisedButton 
          label={<i className="fab fa-google-plus-g"></i>} 
          labelColor="#ffffff" 
          onClick={this.signInGoogle}
          backgroundColor="
          #da4f34"
          style={{ 
            marginTop: "10px",
            width: "30%"
          }} />
        <p>Don't have an account? 
          <span>
            <Link 
              to={routes.REGISTER}
              className={classes.Register} > Register</Link>
          </span>
        </p>
        <Dialog
          modal={false}
          open={this.state.alertOpen}
          onRequestClose={this.alertClose}
        >
          {this.state.error}
        </Dialog>
        </div>
    );
  }
};

export default withRouter(Login);