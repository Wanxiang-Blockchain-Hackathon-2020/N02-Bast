import React from 'react'
import { Layout, Menu,Row} from 'antd';
import { exact } from 'prop-types';

export default class disclosure extends React.Component{
    render(){
        return(
            <div >
              <div className='disclosure' >
                <h1 class="display-4 font-italic">Title of a longer featured blog post</h1>
                <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
                <p class="lead mb-0"><a href="#" class="text-white font-weight-bold">Continue reading...</a></p>
              </div>
            </div>


        )
    }
}