import React, {useState} from "react";
import api from "../api"

const Users = () => {
    const[users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        const newUsers = users.filter(user => user._id !== userId)
        setUsers(newUsers)
    }
    const renderPhrase = (number) => {
        let ends = ['', 'ет']
        if(number >= 2 && number <= 4)
            ends = ['a', 'ут']
        return `${number} человек${ends[0]} тусан${ends[1]} с тобой сегодня`
    }
    console.log(users)
    return (
        <div>
            <div>
                <h1>
                    {users.length > 0 ?
                        <span className="badge bg-primary">{renderPhrase(users.length)}</span>
                        :
                        <span className="badge bg-danger">Никто с тобой не тусанет</span>
                    }
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
