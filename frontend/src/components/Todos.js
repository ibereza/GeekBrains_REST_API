import React from 'react';

const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.create}
            </td>
            <td>
                {todo.update}
            </td>
            <td>
                {String(todo.is_active)}
            </td>
            <td>
                <button onClick={() => deleteTodo(todo.id)} type='button'>
                    Delete
                </button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
    return (
        <table>
            <th>
                Project
            </th>
            <th>
                User
            </th>
            <th>
                Text
            </th>
            <th>
                Create
            </th>
            <th>
                Update
            </th>
            <th>
                Is active
            </th>
            <th>

            </th>
            {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
        </table>
    )
}

export default TodoList;