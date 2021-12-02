import {useParams} from "react-router-dom";
import React from "react";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.url}
            </td>
            <td>
                {project.users}
            </td>
        </tr>
    )
}

const ProjectInfoList = ({projects}) => {
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
            {filtered_items.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}

export default ProjectInfoList