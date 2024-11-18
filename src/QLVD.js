import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

const QLVD = () => {
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch user activities from API or local storage
  }, []);

  const handleAddActivity = () => {
    if (activity.trim() === '') return;

    // Add activity to the list or send it to the API
    setActivities([...activities, { id: Date.now().toString(), text: activity }]);
    setActivity('');
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý Hoạt động Thể Chất</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập hoạt động thể chất của bạn..."
        value={activity}
        onChangeText={setActivity}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddActivity}>
        <Text style={styles.buttonText}>Thêm</Text>
      </TouchableOpacity>
      <FlatList
        data={activities}
        renderItem={({ item }) => (
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>{item.text}</Text>
            <TouchableOpacity onPress={() => handleDeleteActivity(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
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
  },
  input: {
    height: 60,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#20b2aa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QLVD;
