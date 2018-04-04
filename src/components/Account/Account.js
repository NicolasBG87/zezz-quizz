import React from 'react';
import classes from './Account.css';

import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import { pinkA200 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

class Account extends React.Component {
  state = {
    open: false,
    template: ""
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  resetPassword = () => {
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(res => {
        this.handleOpen();
      });
  }

  componentWillMount() {
    let template;
    let user = firebase.auth().currentUser;
    if (user) {
      template = 
        <div>
          <h1>Account Info</h1>
          <List className={classes.List}>
            <ListItem
              primaryText={`Name: ${user.displayName}`}
              leftIcon={<i color={pinkA200} className="fas fa-user" />}
            />
            <ListItem
              primaryText={`Email: ${user.email}`}
              leftIcon={<i color={pinkA200} className="fas fa-envelope" />}
            />
            <ListItem
              primaryText={<RaisedButton label="Reset Password" className={classes.Button} primary={true} />}
              leftIcon={<i color={pinkA200} className="fas fa-key" />}
            />
          </List>
        </div>;
      this.setState({ template });
    } else {
      this.props.history.push("/zezz-quizz/login");
    }
  }

  render() {
    return (
      <div className={classes.Account}>
        {this.state.template}
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Password Reset email sent!
        </Dialog>
      </div>
    );
  }
};

export default withRouter(Account);