import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  PersonalDetails: undefined;
  Redeem: undefined;
  Summary: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Menu = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}><Text>PersonalDetails</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Redeem')}><Text>Redeem</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Summary')}><Text>Summary</Text></TouchableOpacity>
    </>
  )
}
function PersonalDetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Personal Details Screen</Text>
      <Menu />
    </View>
  );
}

function RedeemScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Redeem Screen</Text>
      <Menu />
    </View>
  );
}
function SummaryScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Summary Screen</Text>
      <Menu />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='PersonalDetails'>
        <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
        <Stack.Screen name="Redeem" component={RedeemScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
