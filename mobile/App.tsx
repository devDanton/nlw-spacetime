import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className="flex-1 items-center justify-start bg-gray-950 pt-24">
      <Text className="text-5xl font-bold text-zinc-50">Hello World!</Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
