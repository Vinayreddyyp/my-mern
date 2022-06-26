import "./SideDrawer.css";

import { CSSTransition } from "react-transition-group";
import React from "react";
import ReactDOM from "react-dom";

const SideDrawer = (props) => {
	console.log("🚀 ~ file: SideDrawer.js ~ line 8 ~ SideDrawer ~ props", props);

	const content = (
		<CSSTransition
			in={props.show}
			timeout={200}
			classNames="slide-in-left"
			mountOnEnter
			unmountOnExit
		>
			<aside className="side-drawer " onClick={props.onClick}>
				{props.children}
			</aside>
		</CSSTransition>
	);

	return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
