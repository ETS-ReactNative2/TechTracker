import React from 'react';
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from "react-native";
import { Input, Button, Header } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";

const SessionScreen = () => {


    return (
        <View>
            <Header
                centerComponent={{ text: `Sessions`, style: { color: '#fff' } }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={ } //trigger a state change, which will rerender and display
            //a form to create a new session
            >
                <Text style={styles.btnText}>Create A New Session
                </Text>
            </TouchableOpacity>
            <SelectDropdown
                data={ } //replace with state list of activities retrieved from backend
                onSelect={(selectedItem, index) => {
                    //provide this value to the new session
                }}
                defaultButtonText={"Select An Activity"}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={() => {
                    return (
                        <FontAwesome name="chevron-down" color={"#FFF"} size={18} />
                    );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={ } //Creates a session object, which will be preserved in state, until 
                //stop is pressed, then the object is sent to the database.
            >
                <Text style={styles.btnText}>Start Session
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 20,
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 50,
    },
    btnText: {
        color: "white",
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
    },
    dropdown2BtnStyle: {
        width: "80%",
        height: 50,
        backgroundColor: "#444",
        borderRadius: 8,
    },
    dropdown2BtnTxtStyle: {
        color: "#FFF",
        textAlign: "center",
        fontWeight: "bold",
    },
    dropdown2DropdownStyle: { backgroundColor: "#444" },
    dropdown2RowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5" },
    dropdown2RowTxtStyle: {
        color: "#FFF",
        textAlign: "center",
        fontWeight: "bold",
    }
})

export default SessionScreen;