import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom'
import Navbar from './components/Navbar'

import { Layout, BackTop, Icon } from 'antd';
import RegisterPage from './pages/Register/RegisterPage';
import HomePage from './pages/Homepage/Homepage';

import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import { history } from './_helpers/history';
import TeacherCourse from './pages/TeacherCourse/TeacherCourse';
import CreateCourse from './pages/CreateCourse/CreateCourse';
class App extends React.Component {
  componentWillMount() {
    localStorage.setItem("user", JSON.stringify({
        name: "Tin",
        email: "tin.caotrong@gmail.com",
        role: "teacher"
    }))
}
  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <BrowserRouter>
      <Router history={history}>
        <div className="App">
          <Layout>
            <Navbar style={{ position: 'fixed'}} user={user}/> 
            <BackTop />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/register' component={RegisterPage} />
              <Route exact path='/teacher' component={TeacherDashboard}/>
              <Route exact path='/teacher/course' component={TeacherCourse}/>
              <Route exact path='/teacher/course/create' component={CreateCourse}/>
            </Switch>
          </Layout>
        </div>
      </Router>
      </BrowserRouter>
    );
  }
}

export default App;
