import axios from 'axios';
import React from 'react';
import './App.css';

import Footer from './components/Footer';
import Menu from './components/Menu';
import UserList from './components/Users';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/users/')
            .then(response => {
                this.setState(
                    {
                        'users': response.data
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <Menu/>
                <hr/>
                <UserList users={this.state.users}/>
                <hr/>
                <Footer/>
            </div>
        )
    }
}

export default App;
