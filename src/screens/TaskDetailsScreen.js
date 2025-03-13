import React, { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateTask, deleteTask } from "../api/api";

const TaskDetailsScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [title, setTitle] = useState(params.task.title);
  const [description, setDescription] = useState(params.task.description);

  const handleUpdateTask = async () => {
    const data = await updateTask(params.task._id, title, description);
    if (data.error) Alert.alert("Error", data.error);
    else {
      Alert.alert("Success", "Task updated successfully");
      navigation.goBack();
    }
  };

  const handleDeleteTask = async () => {
    const data = await deleteTask(params.task._id);
    if (data.error) Alert.alert("Error", data.error);
    else {
      Alert.alert("Success", "Task deleted successfully");
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
        onPress={handleUpdateTask}
        style={{ marginTop: 10 }}
      >
        Update
      </Button>
      <Button
        mode="outlined"
        onPress={handleDeleteTask}
        style={{ marginTop: 10, backgroundColor: "red" }}
      >
        Delete
      </Button>
    </View>
  );
};

export default TaskDetailsScreen;
