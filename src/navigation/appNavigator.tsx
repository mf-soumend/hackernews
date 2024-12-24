import { NavigationContainer } from "@react-navigation/native";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "src/theme";
import { PrimaryNavigator } from "src/navigation/primaryNavigator";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const scheme = useColorScheme();
  const [fontLoaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const appTheme = useMemo(() => {
    const isDarkMode = scheme === "dark";
    return isDarkMode ? darkTheme : lightTheme;
  }, [darkTheme, lightTheme, scheme]);
  if (!fontLoaded && !error) {
    return null;
  }
  return (
    <NavigationContainer theme={appTheme} {...props}>
      <PrimaryNavigator {...props} />
    </NavigationContainer>
  );
};
