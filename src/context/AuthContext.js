import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, logoutUser, signupUser } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setUser({ token });
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      if (response.token) {
        setUser({ token: response.token });
        setLoading(false);
        console.log(user);
      }
      return response;
    } catch (e) {
      console.log("login", e);
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await signupUser(name, email, password);
      console.log(response);
      if (response.token) {
        setUser({ token: response.token });
      }
      setLoading(false);
      return response;
    } catch (error) {
      console.log("signup ka error", error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, signup, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

