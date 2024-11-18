import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TTCN = () => {
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [recommendation, setRecommendation] = useState('');

  const validateInputs = () => {
    if (!height || isNaN(height)) {
      Alert.alert('Lỗi', 'Chiều cao không được bỏ trống và phải là số.');
      return false;
    }
    if (!weight || isNaN(weight)) {
      Alert.alert('Lỗi', 'Cân nặng không được bỏ trống và phải là số.');
      return false;
    }
    return true;
  };

  const calculateBMI = () => {
    if (!validateInputs()) {
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
    generateRecommendation(bmiValue);
  };

  const generateRecommendation = (bmiValue) => {
    if (bmiValue < 18.5) {
      setRecommendation('Bạn đang thiếu cân. Hãy tăng cường ăn uống các thực phẩm giàu dinh dưỡng.');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setRecommendation('Chỉ số BMI của bạn bình thường. Hãy duy trì chế độ ăn uống và tập luyện hiện tại.');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setRecommendation('Bạn đang thừa cân. Hãy điều chỉnh chế độ ăn uống và tập luyện thường xuyên.');
    } else {
      setRecommendation('Bạn đang béo phì. Hãy tìm gặp bác sĩ hoặc chuyên gia dinh dưỡng để được tư vấn.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Giới tính:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Nam" value="male" />
        <Picker.Item label="Nữ" value="female" />
      </Picker>

      <Text style={styles.label}>Chiều cao (cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={(text) => setHeight(text)}
      />

      <Text style={styles.label}>Cân nặng (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />

      <Button title="Tính chỉ số BMI" onPress={calculateBMI} />

      {bmi && (
        <>
          <Text style={styles.result}>Chỉ số BMI: {bmi}</Text>
          <Text style={styles.recommendation}>{recommendation}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  recommendation: {
    fontSize: 18,
    marginVertical: 10,
    color: 'green',
  },
});

export default TTCN;
