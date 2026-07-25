import { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = 'd8e31efe1c0f46fca50bffa2d9fbd9ce';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [didError, setDidError] = useState(false);

  const redirectUri = AuthSession.makeRedirectUri();

  const handleSpotifyLogin = async () => {
    const result = await AuthSession.startAsync({
      authUrl:
        `https://accounts.spotify.com/authorize` +
        `?client_id=${CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=user-read-email` +
        `&response_type=token`,
    });

    if (result.type !== 'success') {
      setDidError(true);
    } else {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${result.params.access_token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        setDidError(true);
      }
    }
  };

  const displayError = () => (
    <View style={styles.userInfo}>
      <Text style={styles.errorText}>
        There was an error, please try again.
      </Text>
    </View>
  );

  const displayResults = () => {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image
            style={styles.profileImage}
            source={{ uri: userInfo.images[0]?.url }}
          />
          <View>
            <Text style={styles.userInfoText}>Username:</Text>
            <Text style={styles.userInfoText}>{userInfo.id}</Text>
            <Text style={styles.userInfoText}>Email:</Text>
            <Text style={styles.userInfoText}>{userInfo.email}</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>
          Login to Spotify to see user data.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FontAwesome name="spotify" color="#2FD566" size={128} />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSpotifyLogin}
        disabled={!!userInfo}
      >
        <Text style={styles.buttonText}>Login with Spotify</Text>
      </TouchableOpacity>
      {didError ? displayError() : displayResults()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#2FD566',
    padding: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
  },
  userInfo: {
    height: 250,
    width: 200,
    alignItems: 'center',
  },
  userInfoText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
  },
  profileImage: {
    height: 64,
    width: 64,
    marginBottom: 32,
  },
});
