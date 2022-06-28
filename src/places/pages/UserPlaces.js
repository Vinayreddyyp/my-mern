import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
	{
		id: "p1",
		title: "Empire State Building",
		description: "One of the most famous sky screens in the world",
		imageUrl:
			"https://i.pinimg.com/originals/3e/0f/ef/3e0fef2efa906cb58c7ee938aa4b94ce.jpg",
		address: "20 w 34th st, New York, NY 10001",
		locations: {
			lat: "40.7484405",
			lng: "73.9856644",
		},
		creator: "u1",
	},
	{
		id: "p2",
		title: "Empire State Building",
		description: "One of the most famous sky screens in the world",
		imageUrl:
			"https://www.google.com/maps/uv?pb=!1s0x89c259a9b3117469%3A0xd134e199a405a163!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6%3Dw264-h176-k-no!5snyc%20empire%20state%20building%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipOPo-90EauM3Nz4Og1M899nMRxVS59EiLIfSm5R&hl=en&sa=X&ved=2ahUKEwjSs-W1rrb4AhViJ0QIHXsuBP0Qoip6BAh8EAM",
		address: "20 w 34th st, New York, NY 10001",
		locations: {
			lat: "40.7484405",
			lng: "73.9856644",
		},
		creator: "u2",
	},
];

const UserPlaces = () => {
	const userId = useParams().userId;
	const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

	return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
