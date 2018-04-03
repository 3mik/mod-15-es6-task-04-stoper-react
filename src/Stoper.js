import React, { Component } from 'react';
import './Stoper.css';



class Stoper extends Component {
  constructor (props) {
      super(props);
      this.state = {
          running: false,
          results: [],
          times: {
              minutes: 0,
              seconds: 0,
              miliseconds: 0
          }
      };

  }

    format(times) {
            return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
    }



    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }

        return result;
    }


    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }


    start() {
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
    if (!this.state.running) return;
    this.calculate();
    }

    calculate() {
        let { minutes, seconds, miliseconds } = this.state.times;

        miliseconds += 1;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        this.setState({
            times: {
                minutes: minutes,
                seconds: seconds,
                miliseconds: miliseconds
            }
        });
    }

    stop() {
        if (this.state.running) {
        this.setState({
                running: false
            });
        clearInterval(this.watch);
        }
    }

    clear() {
        if (!this.state.running) {
            this.reset();
        }
    }

    addToList() {
        const currentTime = this.state.times;
        const results = this.state.results;        
        this.setState(
            {
                results: [...results, currentTime]
            }
        );        
    }

    emptyList() {
       this.setState({
           results: []
       }) 
    }

    render() {

        const timeList = this.state.results.map((time, index) => {            
                return (<p key={index}>{this.format(time)}</p>);
        });      

        return (
            <div>
                <div>
                    <button className='button' onClick={this.start.bind(this)}>Start</button>
                    <button className='button' onClick={this.stop.bind(this)}>Stop</button>
                    <button className='button' onClick={this.clear.bind(this)}>Reset</button>
                    <button className='button' onClick={this.addToList.bind(this)}>Add</button>
                    <button className='button' onClick={this.emptyList.bind(this)}>Remove</button>
                </div>
                <div>
                {this.format(this.state.times)}
                </div>
                <div className='list'>
                    {timeList}
                </div>
            </div>
            );
    }
}


export default Stoper;
