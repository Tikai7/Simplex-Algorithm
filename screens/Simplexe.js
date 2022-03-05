import { ScrollView,TouchableOpacity,SafeAreaView,StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { useState,useEffect } from 'react';
import {globstyles} from "../styles/globstyles"
import { showMessage } from 'react-native-flash-message';

export default function Simplexe({navigation}){

    const [varDecision,setVarDecision] = useState(0)
    const [nombreContrainte,setNombreContrainte] = useState(0)
    
    function handleNavigate(){
        if(varDecision  && nombreContrainte)
            navigation.navigate("Matrice",{var : varDecision, contraintes : nombreContrainte});
        else
            showMessage({message : "Aucuns champs ne doit être à 0",type:"warning"})}

    return(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <SafeAreaView style={{flex:1,backgroundColor:"#1F2633",justifyContent:"flex-start",alignItems:"center"}}> 
            
            <ScrollView style={{width:"100%",marginTop:"25%"}}>
            
            <View slyle={{width:"100%",backgroundColor:"white",padding:"5%",justifyContent:"center",alignItems:"center"}}>
                <Text style={{...globstyles.primaryTxt,fontSize:17}}>Nombre variables</Text>
                <TextInput placeholder='-' placeholderTextColor={"#F65E47"} style={globstyles.input} keyboardType="number-pad" onChangeText={(txt)=>setVarDecision(txt)}/>                
                <Text style={{...globstyles.primaryTxt,fontSize:17}}>Nombre de contraintes</Text>
                <TextInput placeholder='-' placeholderTextColor={"#F65E47"} style={globstyles.input} keyboardType="number-pad"  onChangeText={(txt)=>setNombreContrainte(txt)}/>
            </View>

            <View style={{marginBottom:"15%"}}></View>
                <TouchableOpacity onPress={handleNavigate} style={globstyles.primaryBtn}>
                    <Text style={globstyles.primaryTxt}>Continuer</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

