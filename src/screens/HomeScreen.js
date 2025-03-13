import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getTasks, logoutUser } from "../api/api";
import AuthContext from "../context/AuthContext";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const fetchTasks = async () => {
    setRefreshing(true);
    const data = await getTasks();
    if (data.error) Alert.alert("Error", data.error);
    else setTasks(data);
    setRefreshing(false);
  };

  const { logout } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchTasks} />
        }
        renderItem={({ item }) => (
          <Card
            style={{ marginVertical: "5%", width: "98%", alignSelf: "center" }}
            onPress={() => navigation.navigate("TaskDetails", { task: item })}
          >
            <Card.Title title={item.title} />
            <Card.Content>
              <Text>{item.description}</Text>
            </Card.Content>
          </Card>
        )}
      />
      <Button mode="contained" onPress={() => navigation.navigate("AddTask")}>
        Add Task
      </Button>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
