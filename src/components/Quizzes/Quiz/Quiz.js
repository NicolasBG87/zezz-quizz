import React, { Component } from 'react';
import classes from './Quiz.css';

import { Link } from 'react-router-dom';
import * as routes from '../../../constants/routes';

import {
  Card, 
  CardActions,
  CardMedia,
  CardTitle
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class Quiz extends Component {
  state = {
    data: {}
  }

  componentWillMount() {
    const data = {...this.props.data};
    this.setState({ data });
  }

  render() {
    const data = Object.values(this.state.data);
    return (
      <React.Fragment>
        {data.map( (quiz, index) => {
          return (
            <Card className={classes.Quiz} key={index}>
              <CardMedia 
                overlay={
                  <CardTitle 
                    title={quiz.name} 
                  />
                }
              >
                <img src={quiz.url} alt={quiz.index} className={classes.QuizImg} />
              </CardMedia>
              <CardTitle 
                title={`Topic: ${quiz.topic}`}  
                subtitle={`Author: ${quiz.author}`} 
              />
              <CardActions>
                <Link to={routes.PLAY + "/" + index} >
                  <RaisedButton>START</RaisedButton>
                </Link>
              </CardActions>
            </Card>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Quiz;