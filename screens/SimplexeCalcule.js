import { ScrollView,TouchableOpacity,SafeAreaView,StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { globstyles } from "../styles/globstyles"
import { showMessage } from "react-native-flash-message";


export default function SimplexeCalcule({navigation,route}){

    const [matrixB,setMatrixB] = useState(null)
    const [matrix,setMatrix] =useState(null)
    const [fonctionObjective,setFonctionObjective] = useState(null)

    // const [varDecision,setVarDecision] = useState(0)
    // const [contraintes,setNombreContrainte] = useState(0)



    useState(()=>{
    
        setMatrix(route.params.matrix)
        setMatrixB(route.params.B)
        setFonctionObjective(route.params.Z)

    },[route.params])


    function handleNavigate(){

        
        const verif = !matrixB.includes("-")

        if(verif)
            navigation.navigate("Resultat",{matrix : matrix,Z : fonctionObjective,B : matrixB});
        else
            showMessage({message : "Tous les champs doivent être rempli",type:"warning"})

    }

    function handleB(val,index){
        const newArray = matrixB;
        console.log(val);
        newArray[index] = parseInt(val);
        setMatrixB([...newArray])
    }

    return(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <SafeAreaView style={{flex:1,backgroundColor:"#1F2633",justifyContent:"flex-start",alignItems:"center"}}> 
                
                <ScrollView style={{width:"100%",marginTop:"25%"}}>
                    <Text style={{...globstyles.primaryTxt,marginBottom:"3%",marginTop:"5%"}}>Vecteur B</Text>
                    <View style={{alignSelf:"center",width:"90%",alignItems:"center",justifyContent:"center"}}>
                    {
                        matrixB?.map((col,index)=>{
                            return(
                                <TextInput onChangeText={(val)=>handleB(val,index)} key={index} keyboardType="number-pad" style={{...globstyles.input,width:"15%",marginBottom:'0%'}} placeholder="-" placeholderTextColor="#F65E47"/>
                            )
                        })
                    }
                    </View>
                  
                    <View style={{marginBottom:"25%"}}></View>

                    <TouchableOpacity onPress={handleNavigate} style={globstyles.primaryBtn}>
                        <Text style={globstyles.primaryTxt}>Calculer</Text>
                    </TouchableOpacity>

                </ScrollView>
                
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

