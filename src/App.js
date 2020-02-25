import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";

import StoryPage from "./components/StoryPage";

const Tabletop = require("tabletop");
const publicSpreadSheetUrl =
	"https://docs.google.com/spreadsheets/d/1twa7BVs9FPT4lsgINojR8-ntkCrWWR_w4BPGJRqCXT0/edit?usp=sharing";

const App = () => {
	const [storyData, setStoryData] = useState([]);
	useEffect(() => {
		Tabletop.init({
			key: publicSpreadSheetUrl,
			simpleSheet: true
		}).then(function(data, tabletop) {
			setStoryData(data);
		});
	}, []);
	if (storyData.length < 1) {
		return <div className="container">loading story...</div>;
	}
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<div className="container">
						<h1>The Rat Lord's Dilemma</h1>
						<p>
							A rivetting test tale with meaningless choices and
							disappointing outcomes
						</p>
						<Link to="/the-story-begins" className="link-btn">
							Start story
						</Link>
					</div>
				</Route>
				<Route path="/:id">
					<StoryPage storyData={storyData} />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
