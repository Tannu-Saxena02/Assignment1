import React from 'react'
import { View, Text,StyleSheet} from 'react-native'
import RetailerScreen from './src/Screens/RetailerScreen';
import RetailerScreenAccount from './src/Screens/RetailerScreenAccount';
import StackNavigation from './src/Navigation/StackNavigation';
import RetailerVerify from './src/Screens/RetailerVerify';

class App extends React.Component {
  render() {

    return (
      
 <StackNavigation/>

    )
  }
}
export default App