import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

const UserPlaces = () => {
	const [loadedPlaces, setLoadedPlaces] = useState();
	const userId = useParams().userId;
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	useEffect(() => {
		const fetchPlaces = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/places/user/${userId}`
				);
				setLoadedPlaces(responseData.places);
			} catch (err) {}
		};
		fetchPlaces();
	}, [userId, sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
		</React.Fragment>
	);
};

export default UserPlaces;
