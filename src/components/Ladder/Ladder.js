import React from 'react';
import classes from './Ladder.css';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Ladder extends React.Component {
  state = {
    data: []
  }

  componentWillMount() {
    fetch('https://quiz-23-3-2018.firebaseio.com/ladder.json')
      .then(res => res.json())
      .then(json => {
        let data = Object.values(json);
        const sortData = (a, b) => {
          if(a.score < b.score) return 1;
          if(a.score > b.score) return -1;
          return 0;
        }
        data.sort(sortData);
        this.setState({ data });
      })
      .catch(err => {
        return false;
    });
  }

  render() {
    return (
      <div className={classes.Ladder}>
        <h1>Ladder</h1>
        <Table
          selectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Rank</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            stripedRows={true}
            displayRowCheckbox={false}
          >
            {this.state.data.map((user, index) => {
              return (
                <TableRow key={index}>
                  <TableRowColumn>{index+1}</TableRowColumn>
                  <TableRowColumn>{user.user}</TableRowColumn>
                  <TableRowColumn>{user.score}</TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
};

export default Ladder;