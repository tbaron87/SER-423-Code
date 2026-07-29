import { AppRegistry } from 'react-native';
import BasicEmbed from './recipes/BasicEmbed';
import NativeToRN from './recipes/NativeToRN';
import RNToNative from './recipes/RNToNative';
import DeepLink from './recipes/DeepLink';

// Each recipe registers a separate component name.
// The native iOS host ViewController chooses which one to load.
AppRegistry.registerComponent('BasicEmbed', () => BasicEmbed);
AppRegistry.registerComponent('NativeToRN', () => NativeToRN);
AppRegistry.registerComponent('RNToNative', () => RNToNative);
AppRegistry.registerComponent('DeepLink', () => DeepLink);
