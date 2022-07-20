import React from "react"
import ReactDOM from "react-dom"
import { Dapp } from "./components/Dapp"
import "bootstrap/dist/css/bootstrap.css"

const marsBackground = require("./mars.jpg")

const myStyle = {
    backgroundImage: `url(${marsBackground})`,
    height: "100vh",
}

ReactDOM.render(
    <React.StrictMode>
        <div style={myStyle}>
            <Dapp />
        </div>
    </React.StrictMode>,
    document.getElementById("root")
)
