import { createStackNavigator } from '@react-navigation/stack';
import { useEffect,useState } from 'react';
import { SafeAreaView,View,Text, TouchableOpacity } from 'react-native';

import Acceuil from '../screens/Acceuil';
import Simplexe from '../screens/Simplexe';
import SimplexeMatrix from '../screens/SimplexeMatrix';
import SimplexeCalcule from '../screens/SimplexeCalcule';
import SimplexeResult from '../screens/SimplexeResult';

import { globstyles } from '../styles/globstyles';
import { Ionicons } from '@expo/vector-icons'; 

const Stack = createStackNavigator();

export default function MethodeStack() {

    const options = {
        header : (props)=> <HeaderStack {...props} />
    }
    return (
        <Stack.Navigator>
            <Stack.Screen name="Acceuil" component={Acceuil} options={options} />
            <Stack.Screen name="Simplexe" component={Simplexe} options={options} />
            <Stack.Screen name="Matrice" component={SimplexeMatrix} options={options} />
            <Stack.Screen name="Calcule" component={SimplexeCalcule} options={options} />
            <Stack.Screen name="Resultat" component={SimplexeResult} options={options} />

        </Stack.Navigator>
    );
}

function HeaderStack({navigation,route}){
    const [name,setName] = useState("")
    const [myBool,setMyBool] = useState(false)

    function handleNavigate(){
        navigation.pop()
    }

    useEffect(()=>{
        setName(route.name)
        setMyBool(route.name!=="Acceuil");
    },[route])

    return(
        <SafeAreaView style={{paddingTop:"5%",backgroundColor:"#F65E47",justifyContent:"space-between",alignItems:"center",flexDirection:"row"}}>
            {
                myBool ? (
                    <TouchableOpacity onPress={handleNavigate}>
                        <Ionicons name="chevron-back-outline" style={{marginLeft:"4%"}} size={30} color="white" />
                    </TouchableOpacity>
                ):(null)
            }
            <Text style={{...globstyles.primaryTxt,padding:"7%",flex:1,marginRight:myBool ? "11%" : "0%"}}>{name}</Text>
        </SafeAreaView>
    )
}