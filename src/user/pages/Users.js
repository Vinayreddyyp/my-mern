import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
	const USERS = [
		{
			id: "u1",
			name: "vinay",
			image: "https://static.toiimg.com/photo/91440550/91440550.jpg?v=3",
			placeCount: 3,
		},
	];
	return <UsersList items={USERS} />;
};

export default Users;
