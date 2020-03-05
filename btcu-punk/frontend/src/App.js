import React, { Component } from 'react';
//import {Row, Col, Layout} from 'antd'
//import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom'
import { Layout} from 'antd';
import homepage from './pages/homepage'
import HeaderPC from './components/hpheader.js'
import './App.css';
const { Header, Content, Footer } = Layout;

class App extends Component {
  /*
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
       <HeaderPC />

      <BrowserRouter>
        <Route exact path='/home' component={homepage} />
      </BrowserRouter>
      </div>
    );
    */
    render() {
      return (
        <div className="App">
        <Layout>
            <HeaderPC />
          <Content>
            <BrowserRouter>
              <Route exact path='/' component={homepage} />
            </BrowserRouter>
          </Content>
          <Footer style={{ textAlign: 'center' } } className='homepage' >Nice ©2020 Created by Specter</Footer>
        </Layout>
         
  
        
        </div>
      );
  }
}

export default App;
