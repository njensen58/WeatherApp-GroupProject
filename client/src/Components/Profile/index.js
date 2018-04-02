import React from 'react';
import {connect} from 'react-redux';


function Profile(props){
    return (
        <div>
            Hello {props.user.username}
        </div>
    )
}

export default connect(state=>state, {})(Profile);
