import { ScrollView,TextInput,View,Text } from "react-native"
import { globstyles } from "../styles/globstyles"



export default function DisplayMatrix({matrix,handleMatrix,bool}){
    return( 
            <View style={{alignSelf:"center",width:"100%",flexDirection:"row",flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
            {
                matrix?.map((row,indexI)=>{
                    if(bool){
                        return(
                            row?.map((col,indexJ)=>{
                                return(
                                    <View style={{...globstyles.inputMatrix,width:"18%",height:"18%",margin:10}}>
                                        <Text key={indexJ*1+indexI} style={{fontSize:17,fontWeight:"bold",textAlign:"center",color:"#F65E47"}}>{col}</Text>
                                    </View>
                                )
                            })
                        )
                    }
                    else{
                        return(
                            row?.map((col,indexJ)=>{
                                return(
                                    <TextInput onChangeText={(val)=>handleMatrix(val,indexI,indexJ)} key={indexJ} keyboardType="number-pad" style={{...globstyles.input,width:"15%",margin:10}}  placeholder="-"  placeholderTextColor="#F65E47"/>
                                )
                            })
                        )
                    }
                })
            }
            </View>
    )
}