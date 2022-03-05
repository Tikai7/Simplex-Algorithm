import { StyleSheet, Text, View } from 'react-native';
import MethodeStack from './routes/MethodeStack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";

export default function App() {
	return (
		<NavigationContainer>
			<MethodeStack/>
			<FlashMessage position="bottom"  titleStyle={{fontSize:17,textAlign:"center",color:"white",fontWeight:"bold"}}/> 
		</NavigationContainer>
	);
}

