import './App.scss';
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
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import NewPassword from './pages/NewPassword/NewPassword';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import Cart from './pages/Cart/Cart';
import CourseDetail from './pages/CourseDetail/CourseDetail';
import SearchPage from './pages/SearchPage/SearchPage';
import MyCourses from './pages/MyCourses/MyCourses';
import CourseLesson from './pages/CourseLesson/CourseLesson';
import MyWishList from './pages/MyWishList/MyWishList';
import CategoryCourses from './pages/CategoryCourses/CategoryCourses';
import ActiveAccount from './pages/ActiveAccount/ActiveAccount';
import NotFound from './components/NotFound';
import Page403 from './components/Page403';

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
                <Route exact path='/forgot-password'>
                  {isLoggedIn ? <Redirect to="/" /> : <ForgotPassword />}
                </Route>
                <Route exact path='/confirm'>
                  {isLoggedIn ? <Redirect to="/" /> : <NewPassword />}
                </Route>
                <Route exact path='/active'>
                  {isLoggedIn ? <Redirect to="/" /> : <ActiveAccount />}
                </Route>
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/account' component={AccountPage}>
                  {isLoggedIn ? <Redirect to="/login" /> : <AccountPage />}
                </Route>
                <Route exact path='/teacher' >
                  { isLoggedIn? <Redirect to="/login"/> : role === "student" ? <Page403 /> : <TeacherDashboard/>}
                </Route>
                <Route exact path='/teacher/course'>
                  {isLoggedIn? <Redirect to="/login"/> : role === "student" ? <Page403 /> : <TeacherCourse/>}
                </Route>
                <Route exact path='/teacher/course/create'>
                {isLoggedIn? <Redirect to="/login"/> : role === "student" ? <Page403 />: <CreateCourse/>}
                </Route>
                <Route exact path='/course/my-courses'>
                {isLoggedIn? <Redirect to="/login"/> : role === "teacher" ? <Redirect to="/" />: <MyCourses />}
                </Route>
                <Route exact path='/course/my-courses/:id'>
                {isLoggedIn? <Redirect to="/login"/> : role === "teacher" ? <Redirect to="/" />: <CourseLesson/>}
                </Route>
                <Route exact path='/course/my-wishlist'>
                {isLoggedIn? <Redirect to="/login"/> : role === "teacher" ? <Redirect to="/" />: <MyWishList/>}
                </Route>
                <Route exact path='/course/:id' component={CourseDetail} />
                <Route exact path='/courses/search' component={SearchPage} />
                <Route exact path='/category/:category' component={CategoryCourses} />
                <Route exact path='/teacher/course/manage/:id' component={TeacherCourseDetail} />
                <Route component={NotFound} />
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
