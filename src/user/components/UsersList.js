import './style/UsersList.css';

import React from 'react';
import UserItem from './UserItem';

const UserList = (props) => {
    if(props.items.length === 0) {
        return (
            <div className="center">
            <h2>No Users FOund</h2>
            </div>
        )
    }

    return (
        <ul>
          {props.items.map(user => (
              <UserItem key={user.id} id={user.id} image={user.image} name={user.name} placeCount={user.placeCount}/>
          ))}
        </ul>
    )
}

export default UserList;