import React, {useState} from "react";
import api from "../api"

const Users = () => {
    const[users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        const newUsers = users.filter(user => user._id !== userId)
        setUsers(newUsers)
    }
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        if (lastOne === 1) return "человек тусанет";
        return "человек тусанет";
    };

    return (
        <div>
            <div>
                <h1>
                    <span
                        className={"badge " + (users.length > 0 ? "bg-primary" : "bg-danger")}
                    >
                    {users.length > 0
                        ? `${users.length + " " + renderPhrase(users.length)} с тобой сегодня`
                        : "Никто с тобой не тусанет"}
                </span>
                </h1>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"> </th>
                </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>
                                {user.qualities.map((q, i) => (
                                    <span key={i} className={"ms-2 badge bg-" + q.color}>
                                    {q.name}
                                </span>
                                ))}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate} /5</td>
                            <td>
                                <button className="btn btn-danger"  onClick={() => handleDelete(user._id)}>delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Users
