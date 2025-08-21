import { PerguntasProvider } from '@/contexts/PerguntasContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    if (error) {
      console.error('Font loading error:', error);
    }
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f4f7'}}>
      <PerguntasProvider>
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar/>
    </ThemeProvider>
      </PerguntasProvider>
    </SafeAreaView>
  )
}
