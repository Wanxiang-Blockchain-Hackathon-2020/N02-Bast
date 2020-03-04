import {Component} from 'react';
//import {withRouter} from 'react-router-dom'

export default class CheckLogin extends Component {
    componentDidMount() {
         // 在这里请求相关接口判断用户是否完成登录
        axios.get('xxxxx')
            .then(res => {
                if(res.status === 200) {
                    if(res.data.code === 0) {

                    }else {
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render() {
        return null;
    }
}
