import { Text, TouchableOpacity } from 'react-native';
import { Base, Default, Danger, Info, Success } from './styles';

export default function Button({ danger, info, success, children, onPress, style, rounded }) {
  const getTheme = () => {
    if (info) return Info;
    if (success) return Success;
    if (danger) return Danger;
    return Default;
  };

  const theme = getTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        Base.main,
        theme.main,
        rounded ? Base.rounded : null,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[Base.label, theme.label]}>{children}</Text>
    </TouchableOpacity>
  );
}
