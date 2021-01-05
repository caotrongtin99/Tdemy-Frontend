import React, {Component} from 'react'
import { Result, Button} from 'antd';

export default class Page403 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{padding: '100px 0'}} className='my-container'>
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary">Back Home</Button>}
                />
            </div>
        )
    }
}