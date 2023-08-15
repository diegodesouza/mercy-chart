import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "home",
};

const Layout = () => {
    const [fontsLoaded] = useFonts({
        "OpenSansRegular": require("../assets/fonts/OpenSans-Regular.ttf"),
        "OpenSansItalic": require("../assets/fonts/OpenSans-Italic.ttf"),
    });

    const onLayoutRoorView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <Stack initialRouteName="home" onLayout={onLayoutRoorView}>
            <Stack.Screen name="home" />
        </Stack>
    )
};

export default Layout;