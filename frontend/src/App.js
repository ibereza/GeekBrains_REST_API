import axios from 'axios';
import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Cookies from "universal-cookie/lib";

import Footer from './components/Footer';
import Menu from './components/Menu';
import UserList from './components/Users';
import ProjectList from './components/Projects';
import TodoList from './components/Todos';
import NotFound404 from "./components/NotFound404";
import ProjectInfoList from "./components/ProjectInfo";
import LoginForm from "./components/LoginForm";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return !!this.state.token
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                    // console.log(response.data)
                this.set_token(response.data['token'])
                }
            ).catch(error => alert('Неверный логин или пароль'))
    }

    load_data() {
        const headers = this.get_headers()

        axios.get('http://localhost:8000/api/users/', {headers})
            .then(response => {
                this.setState(
                    {
                        'users': response.data
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({users:[]})
        })

        axios.get('http://localhost:8000/api/projects/', {headers})
            .then(response => {
                this.setState(
                    {
                        'projects': response.data
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({projects:[]})
        })

        axios.get('http://localhost:8000/api/todo/', {headers})
            .then(response => {
                this.setState(
                    {
                        'todos': response.data
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({todos:[]})
        })
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount() {
        this.get_token_from_storage()
        // this.load_data()
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    {/*<Menu/>*/}
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todos'>ToDos</Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout
                                </button> : <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <hr/>
                    <Switch>
                        <Route exact path='/' component={() =>
                            <UserList users={this.state.users}/>
                        }/>
                        <Route exact path='/projects' component={() =>
                            <ProjectList projects={this.state.projects}/>
                        }/>
                        <Route exact path='/project/:id'>
                            <ProjectInfoList projects={this.state.projects} users={this.state.users}/>
                        </Route>
                        <Route exact path='/todos' component={() =>
                            <TodoList todos={this.state.todos}/>
                        }/>
                        <Route exact path='/login' component={() =>
                            <LoginForm get_token={(username, password) => this.get_token(username, password)}/>
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