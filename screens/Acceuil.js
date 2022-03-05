import { ScrollView,TouchableOpacity,SafeAreaView,StyleSheet, Text, View } from 'react-native';
import { globstyles } from '../styles/globstyles';

export default function Acceuil({navigation}){
    
    function handleGoTo(destination){
        navigation.navigate(destination)
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:"#1F2633",justifyContent:"flex-start",alignItems:"center"}}> 
            <Text style={{...globstyles.primaryTxt,fontSize:20,padding:"10%"}}>Choissisez une methode de résolutions</Text>
            <ScrollView style={{width:"100%"}}>
                <TouchableOpacity onPress={()=>handleGoTo("Simplexe")} style={{...globstyles.primaryBtn,marginTop:"5%"}}>
                    <Text style={globstyles.primaryTxt}>Simplexe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...globstyles.primaryBtn,backgroundColor:"#f4a296",marginTop:"5%"}}>
                    <Text style={globstyles.primaryTxt}>Non disponible</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...globstyles.primaryBtn,backgroundColor:"#f4a296",marginTop:"5%"}}>
                    <Text style={globstyles.primaryTxt}>Non disponible</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...globstyles.primaryBtn,backgroundColor:"#f4a296",marginTop:"5%"}}>
                    <Text style={globstyles.primaryTxt}>Non disponible</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
        
    )
}