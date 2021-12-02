import axios from 'axios';
import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Footer from './components/Footer';
import Menu from './components/Menu';
import UserList from './components/Users';
import ProjectList from './components/Projects';
import TodoList from './components/Todos';
import NotFound404 from "./components/NotFound404";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
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

        axios.get('http://localhost:8000/api/projects/')
            .then(response => {
                this.setState(
                    {
                        'projects': response.data
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://localhost:8000/api/todo/')
            .then(response => {
                this.setState(
                    {
                        'todos': response.data
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Menu/>
                    <hr/>
                    <Switch>
                        <Route exact path='/' component={() =>
                            <UserList users={this.state.users}/>
                        }/>
                        <Route exact path='/projects' component={() =>
                            <ProjectList projects={this.state.projects}/>
                        }/>
                        <Route exact path='/todos' component={() =>
                            <TodoList todos={this.state.todos}/>
                        }/>
                        <Route component={NotFound404}/>
                    </Switch>
                    <hr/>
                    <Footer/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
