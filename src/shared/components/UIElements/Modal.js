import "./Modal.css";

import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";
import React from "react";
import ReactDOM from "react-dom";

const ModalOvarlay = (props) => {
	console.log("🚀 ~ file: Modal.js ~ line 9 ~ ModalOvarlay ~ props", props);
	const content = (
		<div className={`modal ${props.className}`} style={props.style}>
			<header className={`modal__header  ${props.headerClass}`}>
				<h2>{props.title}</h2>
			</header>
			<form
				onSubmit={
					props.onSubmit ? props.onSubmit : (event) => event.preventDefault
				}
			>
				<div className={`modal__content ${props.contentClass}`}>
					{props.children}
				</div>
				<footer className={`modal__footer ${props.footerClass}`}>
					{props.footer}
				</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
	console.log("🚀 ~ file: Modal.js ~ line 33 ~ Modal ~ props", props);
	return (
		<React.Fragment>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				className="modal"
			>
				<ModalOvarlay {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
