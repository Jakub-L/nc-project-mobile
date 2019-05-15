import React from 'react';
import { PanResponder, View } from 'react-native';
import PropTypes from 'prop-types';

class TouchableView extends React.Component {
  static propTypes = {
    onTouchesBegan: PropTypes.func,
    onTouchesMoved: PropTypes.func,
    onTouchesEnded: PropTypes.func,
    onTouchesCancelled: PropTypes.func,
    onStartShouldSetPanResponderCapture: PropTypes.func,
  };

  static defaultProps = {
    onTouchesBegan: () => {},
    onTouchesMoved: () => {},
    onTouchesEnded: () => {},
    onTouchesCancelled: () => {},
    onStartShouldSetPanResponderCapture: () => true,
  };

  componentWillMount() {
    this.panResponder = this.buildGestures();
  }

  buildGestures = () => PanResponder.create({
    onResponderTerminationRequest: this.props.onResponderTerminationRequest,
    onStartShouldSetPanResponderCapture: this.props.onStartShouldSetPanResponderCapture,
    onPanResponderGrant: ({ nativeEvent }, gestureState) => {
      const event = this.transformEvent({ ...nativeEvent, gestureState });
      this.emit('touchstart', event);
      this.props.onTouchesBegan(event);
    },
    onPanResponderMove: ({ nativeEvent }, gestureState) => {
      const event = this.transformEvent({ ...nativeEvent, gestureState });
      this.emit('touchmove', event);
      this.props.onTouchesMoved(event);
    },
    onPanResponderRelease: ({ nativeEvent }, gestureState) => {
      const event = this.transformEvent({ ...nativeEvent, gestureState });
      this.emit('touchend', event);
      this.props.onTouchesEnded(event);
    },
    onPanResponderTerminate: ({ nativeEvent }, gestureState) => {
      const event = this.transformEvent({ ...nativeEvent, gestureState });
      this.emit('touchcancel', event);

      this.props.onTouchesCancelled
        ? this.props.onTouchesCancelled(event)
        : this.props.onTouchesEnded(event);
    },
  });

  emit = (type, props) => {
    if (window.document && window.document.emitter) {
      window.document.emitter.emit(type, props);
    }
  };

  transformEvent = (event) => {
    event.preventDefault = event.preventDefault || ((_) => {});
    event.stopPropagation = event.stopPropagation || ((_) => {});
    return event;
  };

  render() {
    const {
      children, id, style, ...props
    } = this.props;
    return (
      <View {...props} style={[style]} {...this.panResponder.panHandlers}>
        {children}
      </View>
    );
  }
}
export default TouchableView;
