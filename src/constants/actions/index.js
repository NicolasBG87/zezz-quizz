export const ADD_CONTENT = "ADD_CONTENT";
export const USER = "USER";

export const addContent = quizzes => {
  return {
    type: ADD_CONTENT,
    quizzes
  }
}

export const checkUser = user => {
  return {
    type: USER,
    user
  }
}