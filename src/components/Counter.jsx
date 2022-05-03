import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../redux/actions';

const initialState = {
  count: 30,
};
let timer;
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.startTimer = this.startTimer.bind(this);
    this.resetCount = this.resetCount.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    const { showResults, isRunning } = this.props;
    const MIN_SECONDS = 0;
    const { count } = this.state;
    if (count === MIN_SECONDS) {
      clearInterval(timer);
      this.resetCount();
      showResults();
    } else if (prevProps.isRunning !== isRunning) {
      if (isRunning) {
        clearInterval(timer);
        // counter(count);
        this.resetCount();
      } else {
        // counter(count);
        this.startTimer();
      }
    }
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  startTimer() {
    const { counter } = this.props;
    const INTERVAL = 1000;
    timer = setInterval(() => {
      const { count } = this.state;
      const countUpdate = count - 1;
      counter(countUpdate);
      this.setState(() => ({
        count: countUpdate,
      }));
    }, INTERVAL);
  }

  resetCount() {
    this.setState({ count: initialState.count });
  }

  render() {
    const { count } = this.state;
    const { isRunning } = this.props;
    return (
      isRunning && <h1>{ count }</h1>
    );
  }
}

Counter.propTypes = {
  showResults: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  counter: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    counter: (counter) => dispatch(actions.addTimer(counter)),
  };
}

export default connect(null, mapDispatchToProps)(Counter);
