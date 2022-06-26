import "./Input.css";

import React from "react";

const Input = (props) => {
	const element =
		props.type === "input" ? (
			<input type={props.type} placeholder={props.placeholder} id={props.id} />
		) : (
			<textarea type={props.type} rows={props.rows || 3} />
		);
	return (
		<div className={`form-control`}>
			<label htmlFor={props.id}>{props.label}</label>
			{element}
		</div>
	);
};

export default Input;
