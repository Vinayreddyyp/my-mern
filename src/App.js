import {
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch,
	useParams,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPlace from "./places/pages/NewPlace";
import React from "react";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import Users from "./user/pages/Users";

const App = () => {
	const paramsId = useParams.id;
	console.log("parmasId", paramsId);
	return (
		<Router>
			<MainNavigation />
			<main>
				<Switch>
					<Route path="/" exact>
						<Users />
					</Route>
					<Route path="/:userId/places" exact>
						<UserPlaces />
					</Route>
					<Route path="/places/new" exact>
						<NewPlace />
					</Route>
					<Route path="/places/:placeId">
						<UpdatePlace />
					</Route>
					<Redirect to="/" />
				</Switch>
			</main>
		</Router>
	);
};

export default App;
