import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Headline = styled.Text`
  font-size: 30px;
  padding-bottom: 8px;
`;

const SubHeading = styled.Text`
  font-size: 26px;
  padding-bottom: 8px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: white;
`;

const Button = styled.TouchableHighlight`
  padding: 10px;
  background-color: ${(props) => (props.warning ? 'red' : 'blue')};
  border-radius: 5px;
  margin-top: 10px;
`;

const StyledImage = styled.Image`
  height: 250px;
  width: 250px;
  border-radius: 20px;
  margin-bottom: 20px;
`;

export default function App() {
  return (
    <Container>
      <StyledImage source={{ uri: 'https://placehold.co/250x250/3B5998/white' }} />
      <Headline>I am a headline</Headline>
      <SubHeading>I am a subheading</SubHeading>
      <Button onPress={() => console.log('Thanks for clicking me!')}>
        <ButtonText>Click Me!</ButtonText>
      </Button>
      <Button warning onPress={() => console.log("You shouldn't have clicked me!")}>
        <ButtonText>Don't Click Me!</ButtonText>
      </Button>
    </Container>
  );
}
