import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, Button, TextInput, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import Sound from 'react-native-sound';

const BTSK = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newExercise, setNewExercise] = useState({ text: '', detail: '', video: '', audio: '' });
  const [editExercise, setEditExercise] = useState({ id: '', text: '', detail: '', video: '', audio: '' });

  useEffect(() => {
    fetch('http://10.24.63.6:5000/exercises')
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(error => console.error(error));
  }, []);

  const handlePress = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  const playAudio = (audioUrl) => {
    if (audio) {
      audio.stop(() => {
        setAudio(null);
        setIsPlaying(false);
      });
    }
    const newAudio = new Sound(audioUrl, null, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      newAudio.play(() => {
        newAudio.release();
        setIsPlaying(false);
      });
      setAudio(newAudio);
      setIsPlaying(true);
    });
  };

  const stopAudio = () => {
    if (audio) {
      audio.stop(() => {
        setAudio(null);
        setIsPlaying(false);
      });
    }
  };

  const addExercise = () => {
    const newId = exercises.length ? (parseInt(exercises[exercises.length - 1].id) + 1).toString() : '1';
    const newExerciseWithId = { ...newExercise, id: newId };
    const updatedExercises = [...exercises, newExerciseWithId];
    setExercises(updatedExercises);
    setNewExercise({ text: '', detail: '', video: '', audio: '' });

    // Post request to add new exercise to the server
    fetch('http://10.24.63.6:5000/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExerciseWithId),
    });
  };

  const deleteExercise = (id) => {
    const updatedExercises = exercises.filter(exercise => exercise.id !== id);
    setExercises(updatedExercises);

    // Delete request to remove exercise from the server
    fetch(`http://10.24.63.6:5000/exercises/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const editExerciseDetails = () => {
    const updatedExercises = exercises.map(exercise => exercise.id === editExercise.id ? editExercise : exercise);
    setExercises(updatedExercises);
    setEditExercise({ id: '', text: '', detail: '', video: '', audio: '' });
    setEditModalVisible(false);

    // Put request to update exercise on the server
    fetch(`http://10.24.63.6:5000/exercises/${editExercise.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editExercise),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài tập nâng cao tinh thần và sức khỏe</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <View style={styles.exerciseInfo}>
              <TouchableOpacity onPress={() => handlePress(item)}>
                <Text style={styles.exerciseText}>{item.text}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.exerciseActions}>
              <Button title="Sửa" onPress={() => { setEditExercise(item); setEditModalVisible(true); }} />
              <Button title="Xóa" onPress={() => deleteExercise(item.id)} />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      
      <ScrollView style={styles.addExerciseContainer}>
        <Text style={styles.sectionTitle}>Thêm bài tập mới</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên bài tập"
          value={newExercise.text}
          onChangeText={(text) => setNewExercise({ ...newExercise, text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Chi tiết bài tập"
          value={newExercise.detail}
          onChangeText={(detail) => setNewExercise({ ...newExercise, detail })}
        />
        <TextInput
          style={styles.input}
          placeholder="Link video"
          value={newExercise.video}
          onChangeText={(video) => setNewExercise({ ...newExercise, video })}
        />
        <TextInput
          style={styles.input}
          placeholder="Link audio"
          value={newExercise.audio}
          onChangeText={(audio) => setNewExercise({ ...newExercise, audio })}
        />
        <Button title="Thêm bài tập" onPress={addExercise} />
      </ScrollView>

      {selectedExercise && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            stopAudio();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedExercise.text}</Text>
              <Text style={styles.modalDetail}>{selectedExercise.detail}</Text>
              <WebView
                source={{ uri: selectedExercise.video }}  // Liên kết video
                style={styles.video}
              />
              <Button
                title={isPlaying ? "Dừng nhạc" : "Phát nhạc"}
                onPress={() => {
                  if (isPlaying) {
                    stopAudio();
                  } else {
                    playAudio(selectedExercise.audio);
                  }
                }}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  stopAudio();
                  setSelectedExercise(null);
                }}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {editModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(!editModalVisible)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.sectionTitle}>Chỉnh sửa bài tập</Text>
              <TextInput
                style={styles.input}
                placeholder="Tên bài tập"
                value={editExercise.text}
                onChangeText={(text) => setEditExercise({ ...editExercise, text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Chi tiết bài tập"
                value={editExercise.detail}
                onChangeText={(detail) => setEditExercise({ ...editExercise, detail })}
              />
              <TextInput
                style={styles.input}
                placeholder="Link video"
                value={editExercise.video}
                onChangeText={(video) => setEditExercise({ ...editExercise, video })}
              />
              <TextInput
                style={styles.input}
                placeholder="Link audio"
                value={editExercise.audio}
                onChangeText={(audio) => setEditExercise({ ...editExercise, audio })}
              />
              <Button title="Cập nhật" onPress={editExerciseDetails} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  addExerciseContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
  },
  exerciseItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  exerciseText: {
    fontSize: 18,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDetail: {
    fontSize: 16,
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BTSK;
