import React from 'react';

import * as routes from './constants/routes';
import { firebase } from './constants/firebase';
import { connect } from 'react-redux';
import { checkUser } from './constants/actions';
import { 
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import LandingPage from './components/Landing/Landing';
import RegisterPage from './components/Register/Register';
import LoginPage from './components/Login/Login';
import AccountPage from './components/Account/Account';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Quizzes from './components/Quizzes/Quizzes';
import Ladder from './components/Ladder/Ladder';
import Play from './components/Play/Play';
import QuizBuilder from './components/QuizBuilder/QuizBuilder';
import NotFound from './components/NotFound/NotFound';


class App extends React.Component {
  state = {
    authenticated: null
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authenticated => {
      authenticated
        ? this.setState(() => ({ authenticated }))
        : this.setState(() => ({ authenticated: null}));
      this.props.checkUser(authenticated);
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Navigation />
          <Switch>
            <Route 
              exact path={routes.LANDING}
              component={() => <LandingPage />} />
            <Route 
              exact path={routes.REGISTER}
              component={() => <RegisterPage />} />
            <Route 
              exact path={routes.LOGIN}
              component={() => <LoginPage />} />
            <Route 
              exact path={routes.ACCOUNT}
              component={() => <AccountPage />} />
            <Route 
              exact path={routes.QUIZZES}
              component={() => <Quizzes />} />
            <Route 
              exact path={routes.LADDER}
              component={() => <Ladder />} />
            <Route 
              path={routes.PLAY} 
              component={() => <Play />} />
            <Route 
              exact path={routes.QUIZ_BUILDER} 
              component={() => <QuizBuilder />} />
            <Route
              path={routes.NOT_FOUND}
              component={() => <NotFound />} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, { checkUser })(App);
