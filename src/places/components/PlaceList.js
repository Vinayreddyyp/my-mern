import "./PlaceList.css";

import Card from "../../shared/components/UIElements/Card";
import PlaceItems from "./PlaceItems";
import React from "react";

const PlaceList = (props) => {
	console.log("🚀 ~ file: PlaceList.js ~ line 8 ~ PlaceList ~ props", props);
	console.log("props in the place list", props);
	if (props.items.length === 0) {
		return (
			<div className="place-list center">
				<Card>
					<h2>No Places found.Maybe create one</h2>
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
