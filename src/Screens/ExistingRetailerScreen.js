import React ,{ useState }from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'
import { TextInput } from 'react-native-paper';
const ExistingRetailerScreen = () => {
    const [name,setName]=useState("");
    return (
    <>
    <Text>Hello</Text>
    <TextInput
            mode="outlined"
            label="Outlined input"
            placeholder="Type something"
            theme={theme}
            style={style.TextInput}
            // right={<TextInput.Affix text="/100" />}
    />
    </>
    )

}

const theme={
    colors:{
        primary:"red"
    }
}
const style=StyleSheet.create({
    TextInput:{
        margin:5,
        borderColor:'white',
        color:'green'
    }
})
// export default style;

export default ExistingRetailerScreen;