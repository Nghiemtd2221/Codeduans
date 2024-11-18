import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { username } = route.params; // Receive username from route params

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={require('./cssk.jpg')} style={styles.logo} />
        <Text style={styles.title}>Welcome to Health Care App, {username}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HDTT', { username })}>
          <Text style={styles.buttonText}>Quản lý hoạt động tinh thần</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TTCN', { username })}>
          <Text style={styles.buttonText}>Quản lý thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BTSK', { username })}>
          <Text style={styles.buttonText}>Bài tập nâng cao sức khỏe và tinh thần</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QLVD', { username })}>
          <Text style={styles.buttonText}>Quản lý vận động</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2f4f4f',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#20b2aa',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default HomeScreen;
