import React, { Component } from 'react';
import {Row, Col, Layout} from 'antd'
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom'
import homepage from './components/homepage.js'
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
      <BrowserRouter>
        <Route exact path='/home' component={homepage} />
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
