import './App.css';
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Router, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'

import { Layout, BackTop, Icon } from 'antd';
import RegisterPage from './pages/Register/RegisterPage';
import HomePage from './pages/Homepage/Homepage';
import AccountPage from './pages/Account/Account';

import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import { history } from './_helpers/history';
import TeacherCourse from './pages/TeacherCourse/TeacherCourse';
import CreateCourse from './pages/CreateCourse/CreateCourse';
import TeacherCourseDetail from './pages/TeacherCourseDetail';
import LoginPage from './pages/Login';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import Cart from './pages/Cart/Cart';
import CourseDetail from './pages/CourseDetail/CourseDetail';
class App extends React.Component {
  componentWillMount() {

  }

  render() {
    const {isLoggedIn, role }= this.props;
    return (
      <BrowserRouter>
        <Router history={history}>
          <div className="App">
            <Layout>
              <Navbar style={{ position: 'fixed' }} />
              <BackTop />
              <Switch>
                <Route exact path='/'>
                  {role === "teacher" ? <Redirect to="/teacher"/> : <HomePage/>}
                </Route>
                <Route exact path='/register' >
                  {isLoggedIn ? <Redirect to="/" /> : <RegisterPage />}
                </Route>
                <Route exact path='/login'>
                  {isLoggedIn ? <Redirect to="/" /> : <LoginPage />}
                </Route>
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/account' component={AccountPage}></Route>
                <Route exact path='/teacher' component={TeacherDashboard} />
                <Route exact path='/teacher/course' component={TeacherCourse} />
                <Route exact path='/teacher/course/create' component={CreateCourse} />
                <Route exact path='/course/:id' component={CourseDetail} />
                <Route exact path='/teacher/course/manage/:id' component={TeacherCourseDetail} />
              </Switch>
              <Footer
                columns={[
                  {
                    icon: (
                      <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" />
                    ),
                    title: '语雀',
                    url: 'https://yuque.com',
                    description: '知识创作与分享工具',
                    openExternal: true,
                  },
                ]}
                bottom="Made with ❤️ by Tdemy"
              />
            </Layout>
          </div>
        </Router>
      </BrowserRouter>
    );
  }
}


const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
  userProfile: state.userProfile.data,
  role: state.userProfile.data.role === 1 ? 'teacher' : 'student'
})
export default connect(mapStateToProps)(App);
