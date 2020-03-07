import React, { Component } from 'react';
//import {Row, Col, Layout} from 'antd'
//import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom'
import { Layout} from 'antd';
import homepage from './pages/homepage'
import HeaderPC from './components/hpheader.js'
import './App.css';
import disclosure from './components/disclosure'
const { Header, Content, Footer } = Layout;
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Axios from '../src/components/commonweal'


const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
);

class App extends Component {
    render() {
      return (
        <Provider store={ store }>
         <div className="App">

        <Layout>
            <HeaderPC />
          <Content>
            <BrowserRouter>
              <Route exact path='/home' component={homepage} />
              <Route exact path='/dd' component={disclosure} />
              <Route exact path='d' component={Axios}/>
            </BrowserRouter>
          </Content>
          <Footer style={{ textAlign: 'center' } } className='homepage' >Nice ©2020 Created by Specter</Footer>
        </Layout>
 


</div>
        </Provider>
       
      );
  }
}

export default App;
