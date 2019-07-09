import React, { Component } from 'react';
import { render } from 'react-dom';
var formatTime = (min, sec) => {
    return `min: ${min} sec: ${sec}`
  }
class Counter extends React.Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 60 };
    this.counter = 0;
    this.beginCounting = this.beginCounting.bind(this);
    this.count = this.count.bind(this);
  }

  convertToTime(secs){
    let hrs = Math.floor(secs / (60 * 60));

    let min_param = secs % (60 * 60);
    let minutes = Math.floor(min_param / 60);

    let sec_param = min_param % 60;
    let seconds = Math.ceil(sec_param);

    let obj = {
      "h": hrs,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let remainingTime = this.convertToTime(this.state.seconds);
    this.setState({ time: remainingTime });
  }

  beginCounting() {
    if (this.counter == 0 && this.state.seconds > 0) {
      this.counter = setInterval(this.count, 1000);
    }
  }

  count() {
    // Remove one second, set state so a re-render happens.
    let sec = this.state.seconds - 1;
    this.setState({
      time: this.convertToTime(sec),
      seconds: sec,
    });
    
    // Check if we're at zero.
    if (sec == 0) { 
      clearInterval(this.counter);
    }
  }

  

  render() {
    return(
      <div>
        <button onClick={this.beginCounting}>Start counting</button>
        &nbsp;{this.props.formatTime(this.state.time.m, this.state.time.s)}
      </div>
    );
  }
}

render(<Counter formatTime={formatTime}/>, document.getElementById('root'));
