import React from 'react';
import { Row, Icon, Result, Button, PageHeader, Empty } from 'antd';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import { history } from '../../_helpers/history';
import queryString from 'query-string';
import {config} from '../../_constants/api';
require('dotenv').config()
const {REACT_APP_API_URL} = process.env;

class ActiveAccount extends React.Component {
    state = {
        isSuccess : false
    };

    componentDidMount = () => {
        const {dispatch, match, location} = this.props;
        let params = queryString.parse(location.search)
        const {code} = params;
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json"
            }
            };
          return fetch(`${REACT_APP_API_URL}/api/auth/confirm?code=${code}`, requestOptions)
            .then(this.handleResponse)
            .then((res) => {
                debugger
              if (res.result === 0) {
                this.setState({
                    isSuccess: true
                })
              } else {
                this.setState({
                    isSuccess: false
                })
              }
            });
    }

    handleResponse(response) {
        return response.text().then((text) => {
          const data = text && JSON.parse(text);
          if (!response.ok) {
            if (response.status === 401) {
              window.location.reload(true);
            }
      
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
      
          return data;
        });
      }
    render() {
        const { isSuccess } = this.state;
        return (
            <div className='cart' style={{ padding: '100px 0'}}>
                {isSuccess ? <Result
                    icon={<Icon type="smile" theme="twoTone" />}
                    title="Great, we have done all the operations!"
                    extra={<Button type="primary" onClick={()=> history.push('/login')}>Next</Button>}
                /> : <Result
                        status="warning"
                        title="Something was wrong!"
                        extra={
                        <Button type="primary" key="console">
                            Go Back
                        </Button>
                        }
                    />}
            </div>
        );
    }
}
const mapStateToProps = state => ({
})
export default withRouter(connect(mapStateToProps)(ActiveAccount));