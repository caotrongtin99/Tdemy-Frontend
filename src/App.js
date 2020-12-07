import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Components/Navbar'

import { Layout, BackTop } from 'antd';
import RegisterPage from './pages/Register/RegisterPage';
import HomePage from './pages/Homepage/Homepage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>

        <div className="App">
          <Layout>
            <Navbar style={{ position: 'fixed'}}/>
            <BackTop />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/register' component={RegisterPage} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
