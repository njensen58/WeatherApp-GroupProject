import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import history from '../../../history';
import FaAngle from 'react-icons/lib/fa/angle-right';
import {logout} from '../../../redux/auth';

class DrawerUndockedExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};

    this.goToLogin = this.goToLogin.bind(this);
    this.goToHome = this.goToHome.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  goToLogin(){
      history.push('/login')
  }

  goToHome(){
      history.push('/');
      this.handleClose();
  }

  goToProfile(){
      history.push('/profile')
  }

  render() {
    let auth = this.props.user.isAuthenticated;

    const buttonStyle = {
          position: 'fixed',
          left: '0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '30px',
          minWidth: '30px',
          paddingRight: '10px'
      }

    return (
      <div>
        <RaisedButton
          label={<FaAngle />}
          onClick={this.handleToggle}
          buttonStyle={buttonStyle}
          style={buttonStyle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
            {auth ? null : <MenuItem primaryText="Login" onClick={()=>this.goToLogin()}/> }
            <MenuItem primaryText="Home" onClick={()=>this.goToHome()}/>
            {auth ? <MenuItem primaryText="Profile" onClick={()=>this.goToProfile()}/> : null }
            {auth ? <MenuItem primaryText="Sign out" onClick={this.props.logout}/> : null }
        </Drawer>
      </div>
    );
  }
}

export default connect(state=>state, {logout})(DrawerUndockedExample)
