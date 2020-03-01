import React, { Component } from 'react';
import {Row, Col, Layout} from 'antd'
import HeaderPC from './components/hpheader.js'
import './App.css';

class App extends Component {
  /*
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
*/
  render() {
    return (
      <div className="App">
        <HeaderPC />
      </div>
    );
  }
}

export default App;
