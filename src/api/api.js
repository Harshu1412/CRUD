import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://crud-backend-1-j8il.onrender.com"; // Change this to your backend URL

export const signupUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (data.token) {
      await AsyncStorage.setItem("token", data.token);
      console.log("Signup successful, token stored:", data.token);
    }
    return data;
  } catch (error) {
    console.log("Error during signup:", error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      await AsyncStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Something went wrong!" };
  }
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("token");
};

export const getTasks = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return { error: "No token found, please login again." };

    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔥 Ensure correct format
      },
    });

    const data = await response.json();
    console.log("+", data);
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { error: "Failed to fetch tasks." };
  }
};

// 🟡 ADD A NEW TASK
export const addTask = async (title, description) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });
    console.log("add task ++", response);

    return await response.json();
  } catch (error) {
    console.error("Error adding task:", error);
    return { error: "Failed to add task" };
  }
};

// 🔵 UPDATE A TASK
export const updateTask = async (taskId, title, description) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    return { error: "Failed to update task" };
  }
};

// 🔴 DELETE A TASK
export const deleteTask = async (taskId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    return await response.json();
  } catch (error) {
    console.error("Error deleting task:", error);
    return { error: "Failed to delete task" };
  }
};
