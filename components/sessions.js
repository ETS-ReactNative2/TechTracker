import React from 'react';
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from "react-native";
import { Header } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import * as actions from '../actions/actions'
import axios from 'axios';
import { connect } from 'react-redux'

const SessionScreen = (props) => {

    React.useEffect(() => {
        axios.get('http://localhost:3000/activities').then(activities => {
            const names = activities.map(activity => {
                return activity.activityName
            })
            return props.setActivities(names);
        })
    }, []);

    const startSession = () => { //does rerender happen before function finishes executing?

        if(props.selectedSessionActivity === ''){
            return console.log("activity not chosen");
        }

        const startDate = new Date();
        props.setSessionStartTime(startDate);
        props.setSessionID(props.userID);
        props.setSessionActivity(props.userActivity);

        if(props.started !== true){
            props.toggleSessionStarted(true)
        } 
    }

    const stopSession = () => {

        const endDate = new Date();
        props.setSessionEndTime(endDate);

        const duration = Math.abs(props.sessionStart.getTime() - props.sessionEnd.getTime()) / (1000*60*60)
        props.setSessionDuration(duration);

        let hourOfDay = props.sessionStart.getHours()
        if(hourOfDay > 12){
            hourOfDay = hourOfDay - 12 + 'PM'
        } else {
            hourOfDay = hourOfDay + "AM"
        }
        props.setSessionHourOfDay(hourOfDay)

        let dayOfWeek = props.sessionStart.getDay()
        if(dayOfWeek === 0){
            dayOfWeek = 'Sunday'
        } else if (dayOfWeek === 1){
            dayOfWeek = 'Monday'
        } else if (dayOfWeek === 2){
            dayOfWeek = 'Tuesday'
        } else if (dayOfWeek === 3){
            dayOfWeek = 'Wednesday'
        } else if (dayOfWeek === 4){
            dayOfWeek = 'Thursday'
        } else if (dayOfWeek === 5){
            dayOfWeek = 'Friday'
        } else if (dayOfWeek === 6){
            dayOfWeek = 'Saturday'
        }
        props.setSessionDayOfWeek(dayOfWeek)

        if(props.started === true){
            props.toggleSessionStarted(false)
        } 

        axios.post('http://localhost:3000/sessions', {...props.session}).then(({data}) => {
            if(data.status === 'success'){
                console.log('successfully added')
            }
        }).catch(error => {
            console.log(error)
        })  
    }

    const startButton = (
        <TouchableOpacity
            style={styles.button}
            onPress={startSession}
        >
            <Text style={styles.btnText}>Start Session
            </Text>
        </TouchableOpacity>
    );

    const stopButton = (
        <TouchableOpacity
            style={styles.button}
            onPress={stopSession} 
        >
            <Text style={styles.btnText}>Stop Session
            </Text>
        </TouchableOpacity>
    );

    const createActivityForm = (
        <View>
            <Input
                label='Activity Name'
                value={props.activityName}
                onChangeText={(name) => props.handleActivityNameChange(name)}
                autoCapitalize="none"
                autoCorrect={false}

            />
            <TouchableOpacity
                style={styles.button}
                onPress={props.addActivity({ activityName: props.activityName })}
            >
                <Text style={styles.btnText}>Create New Activity
                </Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View>
            <Header
                centerComponent={{ text: `Sessions`, style: { color: '#fff' } }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={props.makeCreateActivityTrue}
            >
                <Text style={styles.btnText}>Create A New Activity
                </Text>
            </TouchableOpacity>
            <SelectDropdown
                data={props.activities}
                onSelect={(selectedActivity) => {
                    props.setSelectedActivity(selectedActivity);
                }}
                defaultButtonText={"Select An Activity"}
                buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item) => {
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
            {props.createActivityState === true ? createActivityForm : null}
            {props.started !== true ? startButton : stopButton}
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

const mapStateToProps = (state) => {
    return {
        activities: state.activities,
        createActivityState: state.createNewActivity,
        activityName: state.activityName,
        selectedSessionActivity: state.selectedSessionActivity,
        userActivity: state.selectedSessionActivity,
        userID: state.userID,
        sessionStart: state.session.start_time,
        sessionEnd: state.session.end_time,
        started: state.started,
        session: state.session
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActivities: (activities) => dispatch(actions.setActivities(activities)),
        makeCreateActivityTrue: () => dispatch(actions.toggleCreateActivity()),
        handleActivityNameChange: (name) => dispatch(actions.handleActivityNameChange(name)),
        addActivity: (activity) => dispatch(actions.addActivity(activity)),
        setSelectedActivity: (activityName) => dispatch(actions.setSelectedActivity(activityName)),
        toggleSessionStarted: (boolean) => dispatch(actions.toggleStarted(boolean)),
        setSessionID: (id) => dispatch(actions.setSessionID(id)),
        setSessionActivity: (activity) => dispatch(actions.setSessionActivity(activity)),
        setSessionStartTime: (time) => dispatch(actions.setSessionStartTime(time)),
        setSessionEndTime: (time) => dispatch(actions.setSessionEndTime(time)),
        setSessionDuration: (duration) => dispatch(actions.setSessionDuration(duration)),
        setSessionHourOfDay: (hour) => dispatch(actions.setSessionHourOfDay(hour)),
        setSessionDayOfWeek: (day) => dispatch(actions.setSessionDayOfWeek(day))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionScreen);

