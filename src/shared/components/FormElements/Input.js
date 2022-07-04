import "./Input.css";

import React, { useEffect, useReducer } from "react";

import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE":
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators),
			};
		case "TOUCHED":
			return {
				...state,
				isTouched: true,
			};
		default:
			return state;
	}
};

const Input = (props) => {
	console.log("🚀 ~ file: Input.js ~ line 23 ~ Input ~ props", props);
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: "",
		isTouched: false,
		isValid: false,
	});
	const { id, onInput } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	const changeHandler = (event) => {
		dispatch({
			type: "CHANGE",
			val: event.target.value,
			validators: props.validators,
		});
	};
	const touchHandler = () => {
		dispatch({
			type: "TOUCHED",
		});
	};

	const element =
		props.type === "input" ? (
			<input
				type={props.type}
				value={inputState.value}
				placeholder={props.placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				id={props.id}
			/>
		) : (
			<textarea
				type={props.type}
				onChange={changeHandler}
				value={inputState.value}
				onBlur={touchHandler}
				rows={props.rows || 3}
			/>
		);
	return (
		<div
			className={`form-control ${
				!inputState.isValid && inputState.isTouched && "form-control--invalid"
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			{element}
			{!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
		</div>
	);
};

export default Input;
