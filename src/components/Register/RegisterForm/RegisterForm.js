import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import axios from '../../../constants/axios';
import { auth } from '../../../constants/firebase/firebase';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      email,
      passwordOne
    } = this.state;

    auth.createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        auth.currentUser.updateProfile({
          displayName: username
        });
        let newUser = {
          user: username,
          email: email,
          score: 0
        };
        let url = "/ladder.json";
        axios.post(url, newUser);
        this.setState(() => ({ ...INITIAL_STATE }));
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState(byPropKey("error", err));
      });
  }
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      passwordTwo === "" ||
      email === "" || 
      username === "";

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <TextField
              hintText="John Doe" 
              type="text"
              fullWidth={true}
              floatingLabelText={<span><i className="fas fa-user"></i> Full Name</span>}
              name="username"
              value={username}
              onChange={e => this.setState(byPropKey("username", e.target.value))} 
          />
          <TextField
              hintText="example@example.com" 
              type="email"
              fullWidth={true}
              floatingLabelText={<span><i className="fas fa-envelope"></i> Email</span>}
              name="email"
              value={email}
              onChange={e => this.setState(byPropKey("email", e.target.value))}
          />
          <TextField
              hintText="Minimum 6 characters" 
              type="password"
              fullWidth={true}
              floatingLabelText={<span><i className="fas fa-key"></i> Password</span>}
              name="passwordOne"
              value={passwordOne}
              onChange={e => this.setState(byPropKey("passwordOne", e.target.value))}
          />
          <TextField
              hintText="Minimum 6 characters" 
              type="password"
              fullWidth={true}
              floatingLabelText={<span><i className="fas fa-key"></i> Confirm Password</span>}
              name="passwordTwo"
              value={passwordTwo}
              onChange={e => this.setState(byPropKey("passwordTwo", e.target.value))}
          />
          <RaisedButton 
            fullWidth={true}
            style={{ marginTop: "20px" }}
            disabled={isInvalid} 
            primary={true}
            label="Register"
            type="submit"
          />
          { error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(SignUpForm);