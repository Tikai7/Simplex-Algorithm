import { ScrollView,TouchableOpacity,SafeAreaView,StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { globstyles } from "../styles/globstyles"
import { showMessage } from "react-native-flash-message";
import DisplayMatrix from '../components/DisplayMatrix';

export default function SimplexeMatrix({navigation,route}){

    const [matrixB,setMatrixB] = useState(null)
    const [matrix,setMatrix] =useState(null)
    const [fonctionObjective,setFonctionObjective] = useState(null)
    // const [varDecision,setVarDecision] = useState(0)
    // const [contraintes,setNombreContrainte] = useState(0)



    useState(()=>{
        
        const row  = route.params.contraintes
        const col = route.params.var 
        const matrice = createMatrix(row,col,"-")
        const b = createArray(row,"-")
        const Z = createArray(col,"-")
        
        setFonctionObjective(Z)
        setMatrixB(b)
        setMatrix(matrice)
        // setVarDecision(row)
        // setNombreContrainte(col)

    },[route.params])

    function createArray(col,defaultValue){
        var arr = []
        for(let i=0;i<col;i++)
            arr[i] = defaultValue
        return arr
    }

    function createMatrix( rows, cols, defaultValue){
        var arr = [];

        for(var i=0; i < rows; i++){
            arr.push([]);
            arr[i].push( new Array(cols));

            for(var j=0; j < cols; j++)
              arr[i][j] = defaultValue;
        }
      
        return arr;
    }

    function handleNavigate(){

        const verif = !matrix.forEach((el)=> {return el?.includes("-")})
        const verif2 = !fonctionObjective.includes("-") 

        if(verif && verif2)
            navigation.navigate("Calcule",{matrix : matrix,Z : fonctionObjective,B : matrixB});
        else
            showMessage({message : "Tous les champs doivent être rempli",type:"warning"})

    }

    function handleFonctionObjective(val,index){
        const newArray = fonctionObjective;
        newArray[index] = parseInt(val);
        setFonctionObjective([...newArray])
    }

    function handleMatrix(val,row,col){
        const newMatrix = matrix;
        newMatrix[row][col] = parseInt(val);
        setMatrix(newMatrix)
    }

    return(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <SafeAreaView style={{flex:1,backgroundColor:"#1F2633",justifyContent:"flex-start",alignItems:"center"}}> 
                
                <ScrollView style={{width:"100%",marginTop:"25%"}}>
                    <Text style={{...globstyles.primaryTxt,marginBottom:"3%"}}>Fonction Objective</Text>
                    <View style={{alignSelf:"center",width:"90%",flexDirection:"row",flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
                    {
                        fonctionObjective?.map((col,index)=>{
                            return(
                                <TextInput  onChangeText={(val)=>handleFonctionObjective(val,index)} key={index} keyboardType="number-pad" style={{...globstyles.input,width:"15%",margin:10}} placeholder="-" placeholderTextColor="#F65E47"/>
                            )
                        })
                    }
                    </View>
                    <Text style={{...globstyles.primaryTxt,marginBottom:"3%",marginTop:"3%"}}>Matrice</Text>
                    
                    <DisplayMatrix matrix={matrix} handleMatrix={handleMatrix} bool={false} />
        
                    <View style={{marginBottom:"15%"}}></View>

                    <TouchableOpacity onPress={handleNavigate} style={globstyles.primaryBtn}>
                        <Text style={globstyles.primaryTxt}>Continuer</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

