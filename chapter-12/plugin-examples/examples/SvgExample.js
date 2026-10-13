import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Rect, Path, Line, Text as SvgText } from 'react-native-svg';

/**
 * react-native-svg — Vector Graphics
 * -----------------------------------
 * Install:  npx expo install react-native-svg
 * Docs:     https://github.com/software-mansion/react-native-svg
 *
 * This library lets you draw scalable vector graphics declaratively using
 * JSX components like <Circle>, <Rect>, <Path>, and <Line> inside an <Svg>.
 * Because they are vectors, they stay crisp at any size or screen density.
 *
 * It is an official Expo SDK package (maintained by Software Mansion), so it
 * works in Expo Go with no extra native setup.
 */
export default function SvgExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>
        A smiley face drawn entirely with SVG primitives
      </Text>

      <Svg width={220} height={220} viewBox="0 0 220 220">
        {/* Face */}
        <Circle cx="110" cy="110" r="100" fill="#FFD93B" stroke="#E6A100" strokeWidth="4" />
        {/* Eyes */}
        <Circle cx="75" cy="90" r="12" fill="#333" />
        <Circle cx="145" cy="90" r="12" fill="#333" />
        {/* Smile (a curved path) */}
        <Path
          d="M60 135 Q110 185 160 135"
          stroke="#333"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </Svg>

      <Text style={styles.caption}>Basic shapes</Text>
      <Svg width={260} height={90}>
        <Rect x="10" y="10" width="70" height="70" rx="10" fill="#3498db" />
        <Circle cx="140" cy="45" r="35" fill="#e74c3c" />
        <Line x1="190" y1="80" x2="250" y2="10" stroke="#27ae60" strokeWidth="6" />
        <SvgText x="190" y="88" fill="#333" fontSize="12">
          line
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  caption: {
    fontSize: 13,
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
});
