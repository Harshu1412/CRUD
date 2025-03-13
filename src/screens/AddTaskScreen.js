import React, { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { addTask } from "../api/api";

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async () => {
    if (!title || !description) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const data = await addTask(title, description);
    if (data.error) Alert.alert("Error", data.error);
    else {
      Alert.alert("Success", "Task added successfully");
      navigation.goBack();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignSelf: "center",
        height: "20%",
        width: "95%",
        marginTop: "10%",
      }}
    >
      <TextInput label="Title" value={title} onChangeText={setTitle} />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button
        mode="contained"
        onPress={handleAddTask}
        style={{ marginTop: 10 }}
      >
        Add Task
      </Button>
    </View>
  );
};

export default AddTaskScreen;
