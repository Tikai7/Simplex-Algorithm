import { StyleSheet } from "react-native"


export const globstyles = StyleSheet.create({
    background : {
        backgroundColor:"#1F2633"
    },

    primaryBtn :{
        backgroundColor:"#F65E47",
        padding:"5%",
        borderRadius:15,
        width:"70%",
        alignSelf:"center"
    },
    secondaryBtn:{
        backgroundColor:"white",
        borderColor:"#F65E47",
        borderWidth : 1,
        padding:"5%",
        borderRadius:15,
        width:"70%",
        alignSelf:"center"
    },
    primaryTxt :{
        textAlign:"center",
        fontWeight:"bold",
        fontSize:20,
        color:"white",
    },
    secondaryTxt :{
        fontSize:20,
        textAlign:"center",
        fontWeight:"bold",
        color :"#F65E47"
    },
    input:{
        alignSelf:"center",
        width:"50%",
        marginTop:"5%",
        backgroundColor:"white",
        borderRadius:10,
        color:"#F65E47",
        padding:"3%",
        textAlign:"center",
        fontWeight:"bold",
        fontSize:17,
        marginBottom:"5%"
    },
    inputMatrix:{
        alignSelf:"center",
        width:"50%",
        backgroundColor:"white",
        borderRadius:10,
        color:"#F65E47",
        padding:"2%",
        textAlign:"center",
        fontWeight:"bold",
        fontSize:17,
    }

})