import {useParams} from "react-router-dom";
import React from "react";

const ProjectInfoItem = ({project, users}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.url}
            </td>
            <td>
                {project.users.map((userID) => {return (
                    users.find((user) => user.id === userID)).last_name}).join(', ')}
            </td>
        </tr>
    )
}

const ProjectInfoList = ({projects, users}) => {
    let {id} = useParams();
    let filtered_items = projects.filter((project) => project.id == id)

    return (
        <table>
            <th>
                ID
            </th>
            <th>
                URL
            </th>
            <th>
                Users
            </th>
            {filtered_items.map((project) => <ProjectInfoItem project={project} users={users}/>)}
        </table>
    )
}

export default ProjectInfoList