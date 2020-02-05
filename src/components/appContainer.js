import React from "react";

export class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }
    
    componentDidMount() {
        this.callBackendAPI().then(res => {
            console.log(res);
            this.setState({ data: res.express })
        })
    }

    async callBackendAPI() {
        let response = await fetch('/backend');
        let body = await response.json();

        return body
    };
    
    render() {
        return (
            <div>
                <h1>React w/Express</h1>
                <p>{this.state.data}</p>
            </div>
        );
    }
}
    
export default AppContainer;