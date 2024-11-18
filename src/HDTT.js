// HDTT.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

const API_URL = 'http://10.24.63.6:4000/entries'; // Address of JSON server

const HDTT = ({ route }) => {
  const { username } = route.params || {}; // Get username from route params
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (username) {
      fetchEntries();
    } else {
      Alert.alert('Error', 'No username provided.');
    }
  }, [username]);

  const fetchEntries = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEntries(data.filter(item => item.name === username));
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch entries.');
      console.error('Error fetching entries:', error);
    }
  };

  const handleAddEntry = async () => {
    if (entry.trim() === '') return;

    const currentDate = new Date().toLocaleString(); // Get current date and time

    try {
      if (isEditing) {
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: username, text: entry, date: currentDate }),
        });
        Alert.alert('Success', 'Entry updated successfully.');
        setIsEditing(false);
        setEditingId(null);
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: username, text: entry, date: currentDate }),
        });
        Alert.alert('Success', 'Entry added successfully.');
      }

      setEntry('');
      fetchEntries();
    } catch (error) {
      Alert.alert('Error', 'Failed to add/update entry.');
      console.error('Error adding/updating entry:', error);
    }
  };

  const handleEditEntry = (id, text) => {
    setIsEditing(true);
    setEditingId(id);
    setEntry(text);
  };

  const handleDeleteEntry = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      Alert.alert('Success', 'Entry deleted successfully.');
      fetchEntries();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete entry.');
      console.error('Error deleting entry:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.entry}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryName}>User name: {item.name}</Text>
        <Text style={styles.entryDate}>{item.date}</Text> 
      </View>
      <Text style={styles.entryText}>{item.text}</Text>
      <View style={styles.entryActions}>
        <TouchableOpacity onPress={() => handleEditEntry(item.id, item.text)} style={styles.editButton}>
          <Text style={styles.editButtonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteEntry(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý hoạt động tinh thần</Text>
      <TextInput
        style={styles.input}
        placeholder="Viết lời biết ơn hoặc hạnh phúc của bạn..."
        value={entry}
        onChangeText={setEntry}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddEntry}>
        <Text style={styles.buttonText}>{isEditing ? 'Cập nhật' : 'Thêm'}</Text>
      </TouchableOpacity>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
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
    color: '#333',
  },
  input: {
    height: 80,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
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
  entry: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  entryName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  entryDate: {
    fontSize: 14,
    color: '#555',
  },
  entryText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  entryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#ffa07a',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default HDTT;
