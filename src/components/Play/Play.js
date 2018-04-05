import React, { Component } from 'react';
import classes from './Play.css';

import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import axios from '../../constants/axios';
import { auth } from '../../constants/firebase/firebase';
import { connect } from 'react-redux';

import Button from './Button/Button';
import Dialog from 'material-ui/Dialog';
import { RaisedButton } from 'material-ui';

import image from '../../assets/images/qmarks.png';



class Play extends Component {
  state = {
    content: null,
    currentContent: null,
    score: 0,
    question: 0,
    dialogOpen: false,
    user: "Guest",
    json: null
  }

  handleOpen = () => {
    this.setState({dialogOpen: true});
  };

  handleClose = () => {
    this.setState({dialogOpen: false});
  };

  componentWillMount() {
    const data = Object.values(this.props.quizzes);
    const path = window.location.pathname;
    const id = path.charAt(path.length-1);
    this.setState({ 
      content: data[id].content,
      currentContent: data[id].content[0]
    });
  }

  nextQuestion = () => {
    let question = this.state.question;
    question += 1;
    this.setState({ 
      question,
      currentContent: this.state.content[question]
    });
  }

  checkAnswer = (e) => {
    let score = this.state.score;
    const answer = e.target.textContent;
    const correct = this.state.currentContent.correct;
    if (this.state.question < 9) {
      if(answer === correct) {
        score += 10;
        this.setState({ score });
      }
      this.nextQuestion();
    } else {
      if(answer === correct) {
        score += 10;
        this.setState({ score });
      }
      let user = auth.currentUser;
      if(user === null) {
        this.handleOpen();
      } else {
        this.setState({ user: user.displayName});
        this.fetchLadder(user);
        this.handleOpen();
      }
    }
  }

  fetchLadder = (user) => {
    let data = {
      user: user.displayName,
      email: user.email,
      score: this.state.score
    };

    fetch('https://quiz-23-3-2018.firebaseio.com/ladder.json')
      .then(res => res.json())
      .then(json => {
        this.setState({ json }, () => {
          this.updateScore(data);
        });
      });
  }

  updateScore = (data) => {
    let json = { ...this.state.json};
    let keys = Object.keys(json);
    keys.map(key => {
      if(
        json[key].user === data.user && 
        json[key].email === data.email
      ) {
        let url = `ladder/${key}/.json`;
        let totalScore = json[key].score += this.state.score;
        axios.patch(url, { score: totalScore});
      }
      return null;
    });
  }

  render() {
    const actions = [
      <Link to={routes.QUIZZES}>
        <RaisedButton
          label="Quizzes"
          primary={true}
          onClick={this.handleClose}
          style={{ 
            width: "48%",
            margin: "0 1%"
          }}
        />
      </Link>,
      <Link to={routes.LADDER}>
        <RaisedButton
          label="Ladderboard"
          primary={true}
          onClick={this.handleClose}
          style={{ 
            width: "48%",
            margin: "0 1%"
          }}
        />
      </Link>,
    ];
    let dialogMessage;
    if(auth.currentUser) {
      dialogMessage = "Current score will be added to your Total Score and will rank you accordinately.";
    } else {
      dialogMessage = "You have to register in order to be ranked!";
    }
    return (
      <div className={classes.Play}>
        <img src={image} alt={image} className={classes.Image} />
        <p>{this.state.question + 1} - 10</p>
        <h2 className={classes.Question}>{this.state.currentContent.question}</h2>
        <div className={classes.ButtonGrp}>
          <Button 
            label={this.state.currentContent.answers[0]}
            click={this.checkAnswer} />
          <Button 
            label={this.state.currentContent.answers[1]}
            click={this.checkAnswer} />
          <Button 
            label={this.state.currentContent.answers[2]}
            click={this.checkAnswer} />
          <Button 
            label={this.state.currentContent.answers[3]}
            click={this.checkAnswer} />
          <Dialog
            title={`Well done, ${this.state.user}`}
            actions={actions}
            modal={true}
            open={this.state.dialogOpen}
          >
            Your score is {this.state.score}!
            <p>{dialogMessage}</p>
          </Dialog>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps, null)(Play);