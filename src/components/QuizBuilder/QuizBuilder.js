import React from 'react';
import classes from './QuizBuilder.css';

import axios from '../../constants/axios';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

class QuizBuilder extends React.Component {
  state = {
    alertOpen: false,
    stepIndex: 0,
    alertMsg: "",
    quiz: {
      name: "",
      topic: "",
      author: "",
      url: "",
      content: [],
    },
  }

  alertOpen = () => {
    this.setState({alertOpen: true});
  }

  alertClose = () => {
    this.setState({alertOpen: false});
  }

  addQuizInfo = (e) => {
    e.preventDefault();

    let data = new FormData(e.target);
    let quiz = { ...this.state.quiz};

    data.forEach((value, key) => {
      quiz[key] = value;
    });
    const { name, topic, author, url } = quiz;
    if (
      name === "" || 
      topic === "" || 
      author === "" || 
      url === "") {
        this.setState({ alertMsg: "All fields are required!" });
        this.alertOpen();
      } else {
        this.setState({ quiz });
        this.handleNext();
      }
  }

  addQuizContent = (e) => {
    e.preventDefault();

    let content = {
      question: "",
      answers: [],
      correct: "",
    };
    let stateContent = [ ...this.state.quiz.content ];
    const data = new FormData(e.target);

    data.forEach((value, key) => {
      if(key === "answers") {
        content.answers.push(value);
      } else {
        content[key] = value;
      }
    })
    stateContent.push(content);
    const { question, answers, correct } = content;
    if (
      question === "" ||
      correct === "" || 
      answers.indexOf("") !== -1) {
      this.setState({ alertMsg: "All fields are required!" });
      this.alertOpen();
    } else {
      this.setState({ quiz: {
        ...this.state.quiz,
        content: stateContent
        }
      });
      this.handleNext();
    }
  }

  postData = () => {
    let data = { ...this.state.quiz };
    if(
      data.name === "" ||
      data.author === "" ||
      data.url === "" ||
      data.topic === "" ||
      data.content.indexOf("") !== -1
    ) {
      this.setState({ alertMsg: "All fields are required!" });
      this.alertOpen();
    } else {
      axios.post('/quizes.json', data)
      .then(res => {
        this.setState({ 
          alertMsg: "Quiz successfully submitted!",
          stepIndex: 0,
          quiz: {
            name: "",
            topic: "",
            author: "",
            url: "",
            content: [],
          },
        });
        this.alertOpen();
      })
      .catch(err => {
        this.setState({ 
          alertMsg: err.message,
        });
        this.alertOpen();
      });
    } 
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1
    });
    if(stepIndex === 11) {
      this.postData();
      this.setState({ alertMsg: "Quiz successfully uploaded!"});
      this.alertOpen();
    }
  };

  render() {
    const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const {stepIndex} = this.state;
    const user = 
      firebase.auth().currentUser ? 
      firebase.auth().currentUser.displayName :
      "Guest";

    return (
      <div className={classes.QuizBuilder}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Quiz Info</StepLabel>
            <StepContent>
            <form onSubmit={this.addQuizInfo}>
                <TextField
                  hintText="e.g. ZeZZalica"
                  floatingLabelText="Quiz Name"
                  fullWidth={true}
                  name="name"
                />
                <TextField
                  hintText="e.g. https://picsum.photos/200/100/?random"
                  floatingLabelText="Quiz Image URL"
                  fullWidth={true}
                  name="url"
                /><br />
                <TextField
                  hintText="e.g. Movies"
                  floatingLabelText="Quiz Topic"
                  fullWidth={true}
                  name="topic"
                />
                <TextField
                  hintText="e.g. Nicolas"
                  floatingLabelText="Author"
                  fullWidth={true}
                  name="author"
                />
                <RaisedButton
                  label="Add"
                  primary={true}
                  keyboardFocused={true}
                  type="submit" 
                  style={{ margin: "20px 0" }}
                />
              </form>
            </StepContent>
          </Step>
          {questions.map((question, index) => {
            return (
              <Step key={index}>
                <StepLabel>Question {index+1}</StepLabel>
                <StepContent>
                  <form onSubmit={this.addQuizContent}>
                    <TextField
                      hintText="e.g. What's the name of a golum in Lord of the Rings"
                      floatingLabelText="Question"
                      fullWidth={true}
                      name="question"
                    />
                    <TextField
                      hintText="e.g. Samwise"
                      floatingLabelText="Answer One"
                      fullWidth={true}
                      name="answers"
                    />
                    <TextField
                      hintText="e.g. Frodo"
                      floatingLabelText="Answer Two"
                      fullWidth={true}
                      name="answers"
                    />
                    <TextField
                      hintText="e.g. Smeagol"
                      floatingLabelText="Answer Three"
                      fullWidth={true}
                      name="answers"
                    />
                    <TextField
                      hintText="e.g. Gandalf"
                      floatingLabelText="Answer Four"
                      fullWidth={true}
                      name="answers"
                    />
                    <TextField
                      hintText="e.g. Smeagol"
                      floatingLabelText="Correct"
                      fullWidth={true}
                      name="correct"
                    />
                    <RaisedButton
                      label="Add"
                      primary={true}
                      keyboardFocused={true}
                      type="submit"
                      style={{ margin: "20px auto"}}
                    />
                  </form>
                </StepContent>
              </Step>
            );
          })}
          <Step>
            <StepLabel>Upload Your Quiz</StepLabel>
            <StepContent>
              <p>
                What a long, strange trip it's been! Well done, {user}!
              </p>
              <p> 
                Your quiz will be uploaded and immediately accessible. While creator's dashboard is under construction, you can contact me at nikolabojanovicmob@gmail.com if you wish to edit or delete your quiz.
              </p>
              <RaisedButton
                label="Finish"
                primary={true}
                onClick={this.postData}
              />
            </StepContent>
          </Step>
        </Stepper>
        <Dialog
          modal={false}
          open={this.state.alertOpen}
          onRequestClose={this.alertClose}
        >
          {this.state.alertMsg}
        </Dialog>
      </div>
    );
  }
}

export default withRouter(QuizBuilder);