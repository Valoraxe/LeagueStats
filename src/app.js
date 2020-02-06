import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppContainer from './components/appContainer';
import store from "./redux/store";

const APPLICATION = (
    <Provider store={store}>
        <AppContainer/>
    </Provider>
)

const APPROOT = document.getElementById("app");

const RENDER = () => ReactDOM.render(APPLICATION, APPROOT);

RENDER();