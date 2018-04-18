import React from 'react';

export default class OnRouteEnterComponent extends React.Component {
  componentWillMount() {
    this.props.onEnter(this.props.match);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key !== this.props.location.key) {
      this.props.onEnter(nextProps.match);
    }
  }

  render() {
    return this.props.children;
  }
}
