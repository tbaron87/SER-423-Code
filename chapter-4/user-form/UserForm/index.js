import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function UserForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{7,15}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      Alert.alert("User's data", `Name: ${name}, Phone: ${phone}, Email: ${email}`);
    }
  };

  return (
    <View style={styles.panel}>
      <Text style={styles.instructions}>
        Please enter your contact information
      </Text>

      <TextInput
        style={[styles.textfield, errors.name && styles.textfieldError]}
        onChangeText={setName}
        value={name}
        placeholder="Your name"
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        style={[styles.textfield, errors.phone && styles.textfieldError]}
        onChangeText={setPhone}
        value={phone}
        placeholder="Your phone number"
        keyboardType="phone-pad"
      />
      {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

      <TextInput
        style={[styles.textfield, errors.email && styles.textfieldError]}
        onChangeText={setEmail}
        value={email}
        placeholder="Your email address"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 10,
    marginBottom: 20,
  },
  instructions: {
    color: '#828282',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
  },
  textfield: {
    height: 40,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 5,
  },
  textfieldError: {
    borderBottomColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginBottom: 10,
    marginTop: -5,
  },
  button: {
    backgroundColor: '#34495e',
    borderRadius: 3,
    padding: 12,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});
