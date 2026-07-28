import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// Ensure the auth session completes properly on web
WebBrowser.maybeCompleteAuthSession();

// NOTE: Replace this with your own Facebook App ID from https://developers.facebook.com
// You must configure a valid OAuth redirect URI in your Facebook app settings.
const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';

// Facebook OAuth discovery document
const discovery = {
  authorizationEndpoint: 'https://www.facebook.com/v18.0/dialog/oauth',
  tokenEndpoint: 'https://graph.facebook.com/v18.0/oauth/access_token',
};

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const redirectUri = AuthSession.makeRedirectUri();

  const logIn = async () => {
    const result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v18.0/dialog/oauth` +
        `?client_id=${FACEBOOK_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=token` +
        `&scope=public_profile`,
    });

    if (result.type === 'success') {
      // Use the access token to fetch user info from the Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${result.params.access_token}&fields=id,name`
      );
      const data = await response.json();
      setUserInfo(data);
      setLoggedIn(true);
    }
  };

  const renderUserInfo = () => {
    if (!loggedIn || !userInfo) return null;

    return (
      <View style={styles.userInfo}>
        <Text style={styles.userInfoLabel}>Name:</Text>
        <Text style={styles.userInfoText}>{userInfo.name}</Text>
        <Text style={styles.userInfoLabel}>User ID:</Text>
        <Text style={styles.userInfoText}>{userInfo.id}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login via Facebook</Text>
      <TouchableOpacity
        onPress={logIn}
        style={styles.button}
        disabled={loggedIn}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {renderUserInfo()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#1877F2',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
  headerText: {
    fontSize: 30,
  },
  userInfo: {
    paddingTop: 30,
    alignItems: 'center',
  },
  userInfoText: {
    fontSize: 24,
  },
  userInfoLabel: {
    fontSize: 20,
    marginTop: 10,
    color: '#474747',
  },
});
