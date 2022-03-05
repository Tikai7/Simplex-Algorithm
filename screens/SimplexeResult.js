import { ScrollView,TouchableOpacity,SafeAreaView,StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { globstyles } from "../styles/globstyles"
import DisplayMatrix from '../components/DisplayMatrix';

export default function SimplexeResult({navigation,route}){


    const [iterativeMatrixOff,setIterativeMatrix] = useState(null)
    // const [allIterativeMatrix,setAllIterativeMatrix] = useState(null);
    const [row,setRow] = useState(0)
    const [col,setCol] = useState(0)
    const [variableIn,setVariableIn] = useState("")
    const [variableOut,setVariableOut] = useState("")
    const [nbIteration,setNbIteration] = useState(0)
    const [finish,setFinish] = useState(false);
    const [showResultVar,setShowResult] = useState(false)
    const [variableDeBase,setVaribleBase] = useState(null)
    const [myPivot,setPivot] = useState(null)
    // const [varDecision,setVarDecision] = useState(0)
    // const [contraintes,setNombreContrainte] = useState(0)



    function createMatrix( rows, cols, A,B,Z){
        var arr = [];

        for(var i=0; i < rows; i++){
            arr.push([]);
            arr[i].push( new Array(cols));

            for(var j=0; j < cols; j++){
                if(j+1 === cols && i+1 === rows)
                    arr[i][j] = 0
                else if(j+1 === cols && i+1 < rows)
                    arr[i][j] = B[i];
                else if(i+1 === rows)
                    arr[i][j] = Z[j];
                else
                    arr[i][j] = A[i][j];
            }
        }
      
        return arr;
    }

    function checkIsFinish(iterativeMatrix){
        const arr = iterativeMatrix.map((el)=>el>0)
        setFinish(!arr.includes(true))
    }

    function addDefaultValue(iterativeMatrix,minimum_key,index){
        
        for(let i=0;i<iterativeMatrix.length;i++){
            if(i !== minimum_key)
                iterativeMatrix[i][index] = 0
        }

        setIterativeMatrix([...iterativeMatrix])
        checkIsFinish(iterativeMatrix[iterativeMatrix.length-1])

    }

    function calculateNewMatrixState(iterativeMatrix,minimum_key,index){

        for(let i=0;i<iterativeMatrix.length;i++){
            if(i !== minimum_key){
                for(let j=0;j< iterativeMatrix[i].length ;j++){
                    if(j!==index){
                        const a = iterativeMatrixOff[i][j]
                        const b = iterativeMatrixOff[i][index]
                        const c = iterativeMatrixOff[minimum_key][j]   
                        
                        iterativeMatrix[i][j] = a - (b*c)
                    }
                }
            }
        }

        return iterativeMatrix
    
    }

    function findEnteredExitedVariable(){

        const iterativeMatrix = iterativeMatrixOff
        const max = Math.max(...iterativeMatrix[row-1]);
        const index = iterativeMatrix[row-1].indexOf(max);

        let minimum_key = 0
        let first = true
        let minimum

        for(const key in iterativeMatrix){

            if(key < (row-1)){

                const aie = iterativeMatrix[key][index]
                const bi = iterativeMatrix[key][col-1]

                if(aie > 0){
                    let min = bi/aie
                    if(first) {
                        minimum =  min
                        first = false
                    }

                    if(minimum>min){
                        minimum = min
                        minimum_key = parseInt(key)
                    }
                }
            }
        }

        setVariableIn(`x${index+1}`);
        setVariableOut(`x${variableDeBase[minimum_key]}`);
        let variable_base = variableDeBase
        variable_base[minimum_key] = index+1
        setVaribleBase(variableDeBase)

        return [minimum_key,index]
    }



    function findPivot(minimum_key,index){
        const iterativeMatrix = iterativeMatrixOff
        const pivot = iterativeMatrix[minimum_key][index]
        setPivot(pivot)
        for(let i=0;i<iterativeMatrix[minimum_key].length;i++)
            iterativeMatrix[minimum_key][i] /= pivot;

        return iterativeMatrix;
    }


    function calculateIteration(){

        if(iterativeMatrixOff){
           
            const [minimum_key,index] = findEnteredExitedVariable();
            const iterativeMatrixPivot = findPivot(minimum_key,index);
        
            const iterativeMatrix = calculateNewMatrixState(iterativeMatrixPivot,minimum_key,index);
            addDefaultValue(iterativeMatrix,minimum_key,index)
            setNbIteration(nbIteration+1)
        }
    }

    function setOldMatrix(){
        // console.log(allIterativeMatrix)
    }

    function handleNavigate(){
        navigation.navigate("Acceuil")
    }

    function showResult(){
        setShowResult(true)
    }

    useState(()=>{
        const A = route.params.matrix
        const B = route.params.B
        const Z = route.params.Z

        let variable_base = []
        for(let i = 0 ;i<Z.length - Z.indexOf(0);i++)
            variable_base.push(Z.indexOf(0)+i+1)

        console.log(variable_base)

        setVaribleBase(variable_base)
        
        const newRows = A.length + 1
        const newCols = Z.length + 1
        const iterative = createMatrix(newRows,newCols,A,B,Z)

        setRow(newRows)
        setCol(newCols)
        setIterativeMatrix(iterative)

    },[route.params])
    
    return(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <SafeAreaView style={{flex:1,backgroundColor:"#1F2633",justifyContent:"flex-start",alignItems:"center"}}> 
                {showResultVar ? (
                    <Text style={{fontSize:17,fontWeight:"bold",textAlign:"center",color:"white",marginTop:"15%"}}>Variable de bases :</Text>
                ):(
                    <Text style={{fontSize:17,fontWeight:"bold",textAlign:"center",color:"white",marginTop:"15%"}}>Iteration N°{nbIteration}</Text>
                )
                }       

                <ScrollView style={{width:"100%",marginTop:"10%"}}>
                    {
                        showResultVar ? (
                            <View style={{...globstyles.secondaryBtn,width:"50%",marginTop:"15%",borderWidth:0}}>
                                <Text style={{...globstyles.secondaryTxt,fontSize:25}}>Z   =   {iterativeMatrixOff[iterativeMatrixOff.length-1][iterativeMatrixOff[iterativeMatrixOff.length-1].length-1]}</Text>
                                {
                                    variableDeBase.map((e,index)=>{
                                        return(
                                            <Text style={{...globstyles.secondaryTxt,fontSize:25}} >x{e}    =    {iterativeMatrixOff[index][col-1]}</Text>
                                        )
                                    })
                                }
                            
                            </View>
                        ):(
                            <View>
                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",marginTop:"5%",marginBottom:"15%"}}>
                                    <Text style={{...globstyles.primaryTxt,fontSize:17}}>Ve : {variableIn}</Text>
                                    <Text style={{...globstyles.primaryTxt,fontSize:17}}>Pivot : {myPivot}</Text>
                                    <Text style={{...globstyles.primaryTxt,fontSize:17}}>Vs : {variableOut}</Text>
                                </View>

                                <DisplayMatrix matrix={iterativeMatrixOff} bool={true}/>
                               
                            </View>
                        )
                    }
                   
                    <View style={{marginBottom:"15%"}}></View>
                    {
                        showResultVar ? (
                            <TouchableOpacity onPress={handleNavigate} style={{...globstyles.primaryBtn,width:"70%",margin:"4%",marginTop:"25%"}}>
                                <Text style={globstyles.primaryTxt}>Nouvelle résolution</Text>
                            </TouchableOpacity>
                        ):(
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                <TouchableOpacity onPress={setOldMatrix} style={{...globstyles.secondaryBtn,width:"40%",margin:"4%"}}>
                                    <Text style={globstyles.secondaryTxt}>Précédent</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={!finish ? calculateIteration : showResult} style={{...globstyles.primaryBtn,width:"40%",margin:"4%"}}>
                                    <Text style={globstyles.primaryTxt}>{!finish ? "Suivant" : "Finir"}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    
                    
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

