import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import StoryPage from "./components/StoryPage";

const Tabletop = require("tabletop");
const publicSpreadSheetUrl = process.env.REACT_APP_PUBLIC_SPREADSHEET_URL;

const App = () => {
	const [storyData, setStoryData] = useState([]);
	useEffect(() => {
		Tabletop.init({
			key: publicSpreadSheetUrl
		}).then(data => {
			const { Sheet1, Sheet2 } = data;
			const storyData = {
				intro: Sheet1.elements[0],
				story: Sheet2.elements
			};
			setStoryData(storyData);
		});
	}, []);
	if (storyData.length < 1) {
		return <div className="container">loading story...</div>;
	}
	const {
		intro: {
			intro_title,
			intro_text,
			intro_img,
			intro_img_alt,
			intro_btn_text,
			intro_btn_path,
			style
		}
	} = storyData;

	if (!style || style === "1") {
		import(`./css/1.css`).then(() => null);
	} else {
		import(`./css/${style}.css`).then(() => null);
	}

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<div className="container">
						{intro_title && <h1>{intro_title}</h1>}
						{intro_text && (
							<p className="content subtitle">{intro_text}</p>
						)}
						{intro_img && (
							<img
								src={intro_img}
								alt={
									intro_img_alt ||
									"Text adventure homepage image"
								}
							/>
						)}
						{intro_btn_path && intro_btn_text && (
							<Link
								to={intro_btn_path}
								className="link-btn link-btn-home"
							>
								{intro_btn_text}
							</Link>
						)}
					</div>
				</Route>
				<Route path="/:id">
					<StoryPage storyData={storyData.story} />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
