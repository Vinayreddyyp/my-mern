import "./PlaceForm.css";

import React, { useContext, useEffect, useState } from "react";
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useHistory, useParams } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UpdatePlace = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedPlaces, setLoadedPlaces] = useState();
	const placeId = useParams().placeId;
	const history = useHistory();

	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	useEffect(() => {
		const fetchPlace = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/places/${placeId}`
				);
				setLoadedPlaces(responseData.place);
				setFormData(
					{
						title: {
							value: responseData.place.title,
							isValid: true,
						},
						description: {
							value: responseData.place.description,
							isValid: true,
						},
					},
					true
				);
			} catch (err) {}
		};
		fetchPlace();
	}, [sendRequest, placeId, setFormData]);

	const placeUpdateSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				`http://localhost:5000/api/places/${placeId}`,
				"PATCH",
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
				}),
				{
					"Content-Type": "application/json",
				}
			);
			history.push("/" + auth.userId + "/places");
		} catch (err) {}
	};

	if (!loadedPlaces) {
		return (
			<div className="center">
				<Card>
					<h2>Could not find place</h2>
				</Card>
			</div>
		);
	}

	if (isLoading && !error) {
		return (
			<div className="center">
				<LoadingSpinner />
			</div>
		);
	}
	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
				<Input
					id="title"
					element="input"
					type="text"
					label="Title"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid title."
					onInput={inputHandler}
					initialValue={formState.inputs.title.value}
					initialValid={formState.inputs.title.isValid}
				/>
				<Input
					id="description"
					element="textarea"
					label="Description"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid description (min. 5 characters)."
					onInput={inputHandler}
					initialValue={formState.inputs.description.value}
					initialValid={formState.inputs.description.isValid}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					UPDATE PLACE
				</Button>
			</form>
		</React.Fragment>
	);
};

export default UpdatePlace;
