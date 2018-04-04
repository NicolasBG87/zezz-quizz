import React from 'react';
import classes from './Navigation.css';

import { NavLink } from 'react-router-dom';
import * as routes from '../../constants/routes';


const Navigation = () =>
  <div className={classes.NavHolder}>
    <ul className={classes.Navigation} >
      <li>
        <NavLink 
          exact 
          style={{textAlign:"center"}}
          className={classes.NavLink} 
          activeClassName={classes.Active} 
          to ={routes.LANDING}><span className={classes.Icon}><i className="fas fa-home fa-2x" /></span>HOME</NavLink>
      </li>
      <li>
        <NavLink 
          exact 
          style={{textAlign:"center"}}
          className={classes.NavLink} 
          activeClassName={classes.Active} 
          to ={routes.QUIZZES}><span className={classes.Icon}><i className="fas fa-question-circle fa-2x" /></span>QUIZZES</NavLink>
      </li>
      <li>
        <NavLink 
        exact 
        style={{textAlign:"center"}}
        className={classes.NavLink} 
        activeClassName={classes.Active} 
        to ={routes.LADDER}><span className={classes.Icon}><i className="fas fa-clipboard-list fa-2x" /></span>LADDER</NavLink>
      </li>
    </ul>
  </div>

export default Navigation;