import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString("az", {
        timeZone: "Asia/Baku",
        hour12: false,
      }),
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleTimeString("az", {
        timeZone: "Asia/Baku",
        hour12: false,
      }),
    });
  }
  render() {
    return <p className="App-clock">{this.state.time}</p>;
  }
}

export default Clock;
