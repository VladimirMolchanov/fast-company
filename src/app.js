import React, {useState} from 'react';
import Users from "./components/users";
import api from "./api";

export const App = () => {
    const[users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        const newUsers = users.filter(user => user._id !== userId)
        setUsers(newUsers)
    }

    const handleBookmark = (userId) => {
        setUsers(users.map(user => {
            if (user._id === userId) user.bookmark = !user.bookmark
            return user
        }));
    }

    return <Users users={users} onDelete={handleDelete} onBookmark={handleBookmark}/>
}
