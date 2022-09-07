import "./ImageUpload.css";

import React, { useEffect, useRef, useState } from "react";

import Button from "./Button";

const ImageUpload = (props) => {
	const [file, setFile] = useState();
	const [preViewUrl, setPreViewUrl] = useState();
	const [isValid, setIsValid] = useState();

	const filePickerRef = useRef();
	console.log("filePickerRef", filePickerRef);
	useEffect(() => {
		if (!file) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreViewUrl(fileReader.result);
			console.log("setPreviewUrl setSTate", preViewUrl);
		};
		fileReader.readAsDataURL(file);
	}, [setPreViewUrl, file, preViewUrl]);

	const pickedHandler = (event) => {
		let pickedFile;
		let fileIsValid = isValid;
		if (event.target.files && event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			console.log("setFile useState", pickedFile);
			setIsValid(true);
			console.log("setIsValid useState", isValid);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}

		props.onInput(props.id, pickedFile, fileIsValid);
	};
	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	return (
		<div className="form-control">
			<input
				id={props.id}
				type="file"
				ref={filePickerRef}
				style={{ display: "none" }}
				accept=".jpg,.png,.jpeg"
				onChange={pickedHandler}
			/>
			<div className={`image-upload ${props.center && "center"}`}>
				<div className="image-upload__preview">
					{preViewUrl && <img src={preViewUrl} alt="preview" />}
					{!preViewUrl && <p>Please pick an image</p>}
				</div>
				<Button type="button" onClick={pickImageHandler}>
					PICK IMAGE
				</Button>
			</div>
		</div>
	);
};

export default ImageUpload;
