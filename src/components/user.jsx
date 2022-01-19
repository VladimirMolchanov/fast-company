import React from 'react';
import {Qualitie} from "./qualitie";
import {Bookmark} from "./bookmark";

export const User = (props) => {
    const {user} = props
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((q, i) => (
                    <Qualitie key={i} name={q.name} color={q.color} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate} /5</td>
            <td><Bookmark id={user._id} bookmark={user.bookmark} onBookmark={props.onBookmark} /></td>
            <td>
                <button className="btn btn-danger"  onClick={() => props.onDelete(user._id)}>delete</button>
            </td>
        </tr>
    )
}
