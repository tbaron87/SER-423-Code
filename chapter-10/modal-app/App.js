import { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export default function App() {
  const [isModal1Visible, setModal1Visible] = useState(false);
  const [isModal2Visible, setModal2Visible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModal1Visible(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Open Modal 1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setModal2Visible(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Open Modal 2</Text>
      </TouchableOpacity>

      {/* Modal 1: Center modal with fade animation */}
      <Modal
        isVisible={isModal1Visible}
        onBackdropPress={() => setModal1Visible(false)}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={[styles.modal, styles.modal1]}>
          <Text style={styles.modalText}>Hello from Modal 1</Text>
          <TouchableOpacity
            onPress={() => setModal1Visible(false)}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal 2: Bottom slide-up modal */}
      <Modal
        isVisible={isModal2Visible}
        onBackdropPress={() => setModal2Visible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.bottomModal}
      >
        <View style={[styles.modal, styles.modal2]}>
          <Text style={styles.modalText}>Hello from Modal 2</Text>
          <Text style={styles.modalSubText}>
            This modal slides up from the bottom
          </Text>
          <TouchableOpacity
            onPress={() => setModal2Visible(false)}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modal: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal1: {
    height: 200,
    backgroundColor: '#4AC9B0',
  },
  modal2: {
    height: 300,
    backgroundColor: '#6CCEFF',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalText: {
    fontSize: 25,
    padding: 10,
    color: '#474747',
  },
  modalSubText: {
    fontSize: 16,
    color: '#474747',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
  },
});
