import {
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React from 'react';
import axios from 'axios';
import { Input, Button, Header } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import axios from 'axios';
import { connect } from 'react-redux'

const StatisticsScreen = (props) => {

    const getStats = () => {
        if (props.selectedStatsActivity === '') {
            return console.log('activity not chosen')
        }
        axios.get(`http://localhost:3000/sessions/${props.selectedActivity}`).then(({ data }) => {
            props.setSessions(data.sessions) //will this cause rerender before the rest of the function finishes?
        })
    }

    return (
        <SafeAreaView>
            <Header
                centerComponent={{ text: `Statistics`, style: { color: '#fff' } }}
            />
            <Text>To see your Statistics, choose an activity from the dropdown, then click "Get Stats"</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={getStats}
            >
                <Text style={styles.btnText}>Get Stats
                </Text>
            </TouchableOpacity>
            <SelectDropdown
                data={ } //replace with state list of activities retrieved from backend
                onSelect={(selectedActivity, index) => {
                    props.setStatsActivity(selectedActivity);
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

        </SafeAreaView>
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

const mapStateToProps = (state) => {
    return {
        activities: state.activities,
        selectedStatsActivity: state.selectedStatsActivity
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setStatsActivity: (activity) => dispatch(actions.setStatsActivity(activity)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen);
