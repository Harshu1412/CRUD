import { StatusBar } from "expo-status-bar";
import NavigationScreen from "./src/navigation/NavigationScreen";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <>
      <AuthProvider>
        <NavigationScreen />
        <StatusBar style="auto" />
      </AuthProvider>
    </>
  );
}
