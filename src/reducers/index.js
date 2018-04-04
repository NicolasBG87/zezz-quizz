import { combineReducers } from 'redux';
import { ADD_CONTENT, USER } from '../constants/actions';

const quizzes = (state = [], action) => {
  switch(action.type) {
    case ADD_CONTENT:
      return action.quizzes;
    default:
      return state;
  }
}

const user = (state = [], action) => {
  switch(action.type) {
    case USER:
      return action.user;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ quizzes, user });

export default rootReducer;