import "./PlaceForm.css";

import React, { useContext } from "react";
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

const NewPlace = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
			address: {
				value: "",
				isValid: false,
			},
		},
		false
	);
	const history = useHistory();

	const placeSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				"http://localhost:5000/api/places",
				"POST",
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
					address: formState.inputs.address.value,
					creator: auth.userId,
				}),
				{ "Content-Type": "application/json" }
			);
			history.push("/");
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<form className="place-form " onSubmit={placeSubmitHandler}>
				{isLoading && <LoadingSpinner overlay />}
				<Input
					id="title"
					element="input"
					label="Title"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid title."
					onInput={inputHandler}
				/>
				<Input
					id="description"
					element="textarea"
					label="Description"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid title."
					onInput={inputHandler}
				/>
				<Input
					id="address"
					element="input"
					label="Address"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid address."
					onInput={inputHandler}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					ADD PLACE
				</Button>
			</form>
		</React.Fragment>
	);
};

export default NewPlace;
