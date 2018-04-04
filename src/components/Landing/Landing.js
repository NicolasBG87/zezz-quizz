import React from 'react';
import classes from './Landing.css';

import {List, ListItem} from 'material-ui/List';
import {pinkA200} from 'material-ui/styles/colors';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import imgPlay from '../../assets/images/play.png';
import imgLadder from '../../assets/images/ladder.png';
import imgBuild from '../../assets/images/builder.png';
import divider from '../../assets/images/blue-divider.png';


const Landing = () => {
  return (
    <div className={classes.Landing}>
      <div className={classes.Flex}>
        <div className={classes.ContentLeft}>
          <h1>Play</h1>
          <List>
            <ListItem 
              primaryText="Different Topics"
              leftIcon={<ActionGrade color={pinkA200}/>}  
            />
            <ListItem 
              primaryText="Fun Content"
              leftIcon={<ActionGrade color={pinkA200}/>}  
            />
            <ListItem 
              primaryText="Weekly Updates"
              leftIcon={<ActionGrade color={pinkA200}/>}  
            />
          </List>
        </div>
        <div className={classes.ContentRight}>
          <img className={classes.gridImage} src={imgPlay} alt="imgPlay" />
        </div>
      </div>
      <img className={classes.Divider} src={divider} alt="Divider 1" />
      <div className={classes.Flex}>
        <div className={classes.ContentLeft}>
          <img className={classes.gridImage} src={imgLadder} alt="imgLadder" />
        </div>
        <div className={classes.ContentRight}>
          <h1>Rank</h1>
          <List>
            <ListItem 
              primaryText="Complete Quizzes"
              leftIcon={<ActionGrade color={pinkA200}/>}  
            />
            <ListItem 
              primaryText="Earn Points"
              leftIcon={<ActionGrade color={pinkA200}/>}  
            />
            <ListItem 
              primaryText="Rank on our Ladder"
              leftIcon={<ActionGrade color={pinkA200}/>}  
            />
          </List>
        </div>
      </div>
      <img className={classes.Divider} src={divider} alt="Divider 1" />
      <div className={classes.Flex}>
        <div className={classes.ContentLeft}>
          <h1>Create</h1>
          <List>
            <ListItem 
              primaryText="Create Quizzes"
              leftIcon={<ActionGrade color={pinkA200}/>}  
            />
            <ListItem 
              primaryText="Choose Topic"
              leftIcon={<ActionGrade color={pinkA200}/>}  
            />
            <ListItem 
              primaryText="Share Your Quiz"
              leftIcon={<ActionGrade color={pinkA200}/>}  
            />
          </List>
        </div>
        <div className={classes.ContentRight}>
          <img className={classes.gridImage} src={imgBuild} alt="imgBuild" />
        </div>
      </div>
    </div>
  );
};

export default Landing;