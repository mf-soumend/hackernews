import { PermissionsAndroid } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppNavigator } from "src/navigation";
import store, { persistor } from "store/store";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
export default function App() {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Auth status : ", authStatus);
    }
    await messaging()
      .getToken()
      .then((token) => {
        console.log(token);
      });
    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
  };
  useEffect(() => {
    requestUserPermission();
  }, []);
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </Provider>
    </PersistGate>
  );
}
