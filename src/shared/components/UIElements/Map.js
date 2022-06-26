import "./Map.css";

import React, { useEffect, useRef } from "react";

const Map = (props) => {
	const mapRef = useRef();
	const { center, zoom } = props;

	useEffect(() => {
		const lat = parseFloat(center.lat);

		const lng = parseFloat(center.lng);

		const parsedCenter = { lat: lat, lng: lng };
		const map = new window.google.maps.Map(mapRef.current, {
			center: parsedCenter,
			zoom: props.zoom,
		});

		new window.google.maps.Marker({ position: parsedCenter, map: map });
	}, [center, zoom]);

	return (
		<div
			ref={mapRef}
			className={`map ${props.className}`}
			style={props.style}
		></div>
	);
};
export default Map;
