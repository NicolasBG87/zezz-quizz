import React from 'react';
import classes from './QuizBuilder.css';

import axios from '../../constants/axios';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';

const tabStyles = {
  headline: {
    fontSize: 18,
    paddingTop: 10,
    marginBottom: 0,
    fontWeight: 400,
  },
};

class QuizBuilder extends React.Component {
  state = {
    alertOpen: false,
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
        this.setState({ alertMsg: "Quiz successfully submitted!"});
        this.alertOpen();
      })
      .catch(err => {
        this.setState({ alertMsg: err.message });
        this.alertOpen();
      });
    } 
  }

  render() {
    const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <div className={classes.QuizBuilder}>
          <Tabs>
            <Tab label="Info" key="quizInfo">
              <h2 style={tabStyles.headline}>Quiz Info</h2>
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
            </Tab>

            {questions.map(question => {
              return (
                <Tab 
                  label={question}
                  key={question} >
                  <h2 style={tabStyles.headline}>Question {question}</h2>
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
                </Tab>
              );
            })}
          </Tabs>
          <RaisedButton
            label="Upload Quiz"
            primary={true}
            onClick={this.postData}
          />
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

export default QuizBuilder;