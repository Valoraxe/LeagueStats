import React from "react";
import ReactDOM from "react-dom";

const APPLICATION = (
    <div>
        <h1>Hello Battlefy</h1>
    </div>
)

const APPROOT = document.getElementById("app");

const RENDER = () => ReactDOM.render(APPLICATION, APPROOT);

RENDER();