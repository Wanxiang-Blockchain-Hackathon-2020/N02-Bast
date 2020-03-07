
import React  from 'react';
import axios from 'axios'
class Axios extends React.Component {
    //构造函数
    constructor() {
        super();
        //react定义数据
        this.state = {
        list:[]
        }
    }
    //请求接口的方法
    getData=()=>{
    //var  api='https://www.apiopen.top/weatherApi?city=%E4%B8%8A%E6%B5%B7';
    var  api='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20';
        axios.get(api)
  .then((response) =>{
    // handle success
    console.log(response.data.result);
    //用到this需要注意指向，箭头函数
    this.setState({
list:response.data.result
    })
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
    }
    render() {
        return (
        <div> 
        <h2>axios获取数据</h2>
        <button onClick={this.getData}>获取api接口</button>
<ul>
    {
        this.state.list.map((value,key)=>{
          return<li  key={key}>{value.title}</li>
        })
    }
</ul>
        </div>
        )
    }
}
export default Axios;