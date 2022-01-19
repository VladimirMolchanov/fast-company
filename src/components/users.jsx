import React from "react";
import {SearchStatus} from "./searchStatus";
import {User} from "./user";

const Users = (props) => {
    const {users} = props
    return (
        <div>
            <SearchStatus number={users.length}/>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th scope="col"> </th>
                </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <User user={user} onDelete={props.onDelete} onBookmark={props.onBookmark} key={index}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Users
