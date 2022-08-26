import "./Auth.css";

import React, { useContext, useState } from "react";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";

const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: "",
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};

	const authSubmitHandler = async (e) => {
		e.preventDefault();
		if (isLoginMode) {
		} else {
			try {
				setIsLoading(true);
				const response = await fetch("http://localhost:5000/api/users/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: formState.inputs.name.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
				});
				const responseData = await response.headers.json();
				console.log("responseData", responseData);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				setError(error.message || "could not able to signup");
			}
		}

		auth.login();
		console.log("onSubmit is handler");
	};
	return (
		<Card className="authentication">
			{isLoading && <LoadingSpinner asOverlay />}
			<h2>Login required</h2>
			{!isLoginMode && (
				<Input
					element="input"
					id="name"
					type="text"
					label="Name"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="please enter a name"
					onInput={inputHandler}
				/>
			)}
			<form>
				<Input
					id="email"
					type="email"
					element="input"
					label="E-Mail"
					validators={[VALIDATOR_EMAIL()]}
					errorText="Please enter a valid email"
					onInput={inputHandler}
				/>
				<Input
					id="password"
					type="password"
					element="input"
					label="Password"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter correct password"
					onInput={inputHandler}
				/>
				<Button
					type="submit"
					disabled={!formState.isValid}
					onClick={authSubmitHandler}
				>
					{isLoginMode ? "LOGIN" : "SIGNUP"}
				</Button>
			</form>
			<Button inverse onClick={switchModeHandler}>
				SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
			</Button>
		</Card>
	);
};
export default Auth;
