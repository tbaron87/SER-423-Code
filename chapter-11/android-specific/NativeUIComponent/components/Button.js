import { requireNativeComponent } from 'react-native';

/**
 * Button is a JavaScript wrapper around the native Android ButtonView.
 *
 * requireNativeComponent bridges a native ViewManager (registered as 'ButtonView'
 * in Kotlin) to a React component. Props passed here are forwarded to the native
 * view via @ReactProp annotations on the ViewManager.
 *
 * The native 'topChange' event is mapped to the 'onChange' prop automatically
 * by React Native's event system. We expose it as 'onTap' for a cleaner API.
 */
function Button({ onTap, ...props }) {
  const onChange = (event) => {
    if (onTap) {
      onTap(event.nativeEvent.message);
    }
  };

  return <ButtonView {...props} onChange={onChange} />;
}

const ButtonView = requireNativeComponent('ButtonView');

export default Button;
