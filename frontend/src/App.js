import React from 'react';
import './App.css';

import UserList from './components/Users';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        const users = [
            {
                'username': 'ibereza',
                'first_name': 'Igor',
                'last_name': 'Bereza',
                'email': 'igor@site.com'
            },
        ]
        this.setState(
            {
                'users': users
            }
        )
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users}/>
            </div>
        )
    }
}

export default App;
