const express = require('express');
const { Expo } = require('expo-server-sdk');

const app = express();
const expo = new Expo();

let savedPushTokens = [];
const PORT_NUMBER = 3000;

const handlePushTokens = async (message) => {
  const notifications = [];

  for (const pushToken of savedPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    notifications.push({
      to: pushToken,
      sound: 'default',
      title: 'Message received!',
      body: message,
      data: { message },
    });
  }

  // Expo accepts batched notifications to reduce requests
  const chunks = expo.chunkPushNotifications(notifications);

  for (const chunk of chunks) {
    try {
      const receipts = await expo.sendPushNotificationsAsync(chunk);
      console.log(receipts);
    } catch (error) {
      console.error(error);
    }
  }
};

const saveToken = (token) => {
  if (!savedPushTokens.includes(token)) {
    savedPushTokens.push(token);
  }
};

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Push Notification Server Running');
});

app.post('/token', (req, res) => {
  saveToken(req.body.token.value);
  console.log(`Received push token: ${req.body.token.value}`);
  res.send(`Received push token: ${req.body.token.value}`);
});

app.post('/message', (req, res) => {
  handlePushTokens(req.body.message);
  console.log(`Received message: ${req.body.message}`);
  res.send(`Received message: ${req.body.message}`);
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server Online on Port ${PORT_NUMBER}`);
});
