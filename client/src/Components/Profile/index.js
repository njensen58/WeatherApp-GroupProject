import React from 'react';
import {connect} from 'react-redux';
import {saveCity} from '../../redux/defaultCity'


class Profile extends React.Component {
    constructor(){
        super();
        this.state = {
            entry: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.goToHome = this.goToHome.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            entry: e.target.value
        })
    }

    goToHome(){
        this.props.history.goBack();
    }

    handleSubmit(e){
        e.preventDefault();
        let id = this.props.user._id;
        let savedCity = {location: this.state.entry}
        this.props.saveCity(savedCity, id).then(()=> {
            this.props.history.goBack();

        })
    }

    render(){
        console.log(this.props)
        return (
            <div style={{display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif'}}>
                <h1 style={{textAlign: 'center', fontFamily: 'sans-serif', margin: '60px 0 100px 0'}}>Hello {this.props.user.username}</h1>
                <button onClick={this.goToHome} style={{padding: '10px', backgroundColor: '#555', color: 'whitesmoke', borderRadius: '4px', marginBottom: '5px', outline: 'none', border: 'none', width: '80px', marginLeft: '20%', fontSize: '16px'}}>Back</button>
                <form onSubmit={this.handleSubmit} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: '0 20%'}}>
                    <h3>Add Your Favorite City:</h3>
                    <input type="text" onChange={this.handleChange} value={this.state.entry} className="profileInput"/>
                    <button className="profileBtn">Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(state=>state, { saveCity })(Profile);
