import React from 'react';

const Menu = () => {
    return (
        <div>
            <ul>
                <li>Menu1</li>
                <li>Menu2</li>
                <li>Menu3</li>
            </ul>
            <hr />
        </div>
    )
}

const Footer = () => {
    return (
        <div>
            <hr />
            Footer
        </div>
    )
}

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <div>
            <Menu/>
            <table>
                <th>
                    Username
                </th>
                <th>
                    First name
                </th>
                <th>
                    Last name
                </th>
                <th>
                    Email
                </th>
                {users.map((user) => <UserItem user={user}/>)}
            </table>
            <Footer/>
        </div>
    )
}

export default UserList