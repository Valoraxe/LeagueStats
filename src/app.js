import React from "react";
import ReactDOM from "react-dom";
import AppContainer from './components/appContainer';

const APPLICATION = <AppContainer/>

const APPROOT = document.getElementById("app");

const RENDER = () => ReactDOM.render(APPLICATION, APPROOT);

RENDER();