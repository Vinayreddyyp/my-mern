import "./PlaceList.css";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PlaceItems from "./PlaceItems";
import React from "react";

const PlaceList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className="place-list center">
				<Card>
					<h2>No Places found.Maybe create one</h2>
					<Button to="/places/new">Share place</Button>
				</Card>
			</div>
		);
	}
	return (
		<ul className="place-list">
			{props.items.map((place) => (
				<PlaceItems
					key={place.id}
					image={place.imageUrl}
					id={place.id}
					title={place.title}
					description={place.description}
					address={place.address}
					creatorId={place.creatorId}
					coordinates={place.locations}
				/>
			))}
		</ul>
	);
};

export default PlaceList;
