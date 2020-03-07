import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Registration from './register'
import {userSignupRequest} from '../../actions/registrationActions'

class RegistrationForm extends React.Component{
    static propTypes = {
        userSignupRequest: PropTypes.func.isRequired,
        addFlashMessage: PropTypes.func.isRequired,
        isUserExists: PropTypes.func.isRequired
      }
    render(){
        return(
            <div>
                <Registration userSignupRequest={this.props.userSignupRequest} />
            </div>
        )
    }
}


export default  connect(null,{userSignupRequest})(RegistrationForm)