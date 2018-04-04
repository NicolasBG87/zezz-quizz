import React, { Component } from 'react';
import classes from './Quizzes.css';

import { connect } from 'react-redux';
import { addContent } from '../../constants/actions';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Quiz from './Quiz/Quiz';


class Quizzes extends Component {
  state = {
    data: null,
  }

  getData = () => {
    fetch("https://quiz-23-3-2018.firebaseio.com/quizes.json")
      .then(res => res.json()
        .then(data => {
          this.setState({data});
          this.props.addContent(data);
        }));
  }

  componentWillMount() {
    this.getData();
  }

  render() {
    let quizzes;
    if(this.state.data === null) {
      quizzes = <h1>No quizes available at this moment.</h1>;
    } else {
      quizzes = <Quiz data={this.state.data} />;
    }
    return (
      <div className={classes.Quizzes}>
        {quizzes}
        <div 
          className="hint--top"
          aria-label="Add new Quiz!"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "30px",
            zIndex: "100"
          }}>
          <Link to={routes.QUIZ_BUILDER}>
            <FloatingActionButton>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { addContent })(Quizzes);