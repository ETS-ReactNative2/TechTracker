import {
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React from 'react';
import axios from 'axios';
import { Header } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import axios from 'axios';
import { connect } from 'react-redux'
import {
    LineChart,
    BarChart,
} from 'react-native-chart-kit'

const StatisticsScreen = (props) => {

    let lineGraphDataObjects = [];
    let finalLineGraphData = new Array(7);
    let barChartDataObjects = [];
    let finalBarChartData = new Array(24);

    const getStats = () => {
        if (props.selectedStatsActivity === '') {
            return console.log('activity not chosen')
        }
        props.toggleGetStatsClicked();

        axios.get(`http://localhost:3000/sessions/${props.userID}/${props.selectedStatsActivity}`).then(({ data }) => {
            props.setSessions(data.sessions)

            function calculateLineGraphData() {
                let sessionsByDay = [];
                let i = 0;
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                for (let day of days) {
                    let sessions = data.sessions.filter(session => {
                        return session.dayOfWeek === day;
                    })
                    sessionsByDay.push(sessions);
                }
                for (let grouping of sessionsByDay) {

                    let durations = grouping.map(session => {
                        return session.duration;
                    })

                    let lineGraphDataObject = {
                        duration: durations.reduce(reducer, 0),
                        dayOfWeek: days[i]
                    }
                    lineGraphDataObjects.push(lineGraphDataObject);
                    i++;
                }
                props.setLineGraphDataObjects(lineGraphDataObjects);

                for (i = 0; i < finalLineGraphData.length - 1; i++) {
                    finalLineGraphData[i] = lineGraphDataObjects[i].duration
                }

                props.setFinalLineGraphData(finalLineGraphData);
            }
            calculateLineGraphData();

            function calculateBarGraphData() {
                let sessionsByHour = [];
                let i = 0;
                const hours = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'];
                for (let hour of hours) {
                    let sessions = data.sessions.filter(session => {
                        return session.hourOfDay === hour;
                    })
                    sessionsByHour.push(sessions);
                }
                for (let grouping of sessionsByHour) {
                    
                    let barChartDataObject = {
                        uses: grouping.length,
                        hourOfDay: hours[i]
                    }
                    barChartDataObjects.push(barChartDataObject);
                    i++;
                }
                

                for (i = 0; i < finalBarChartData.length - 1; i++) {
                    finalBarChartData[i] = barChartDataObjects[i].uses
                }

                props.setFinalBarChartData(finalBarChartData);
            }
            calculateBarGraphData();

            function calculateTotalHoursOfUse(){
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                const durations = data.sessions.map(session => {
                    return session.duration;
                })
                const totalTime = durations.reduce(reducer, 0)
                props.setTotalTime(totalTime);
            }
            calculateTotalHoursOfUse();
        })
    }



    const charts = (
        <SafeAreaView>
            <View>
                <Text>Total Hours Of Usage: {props.totalTime}</Text>
            </View>
            <View>
                <Text>
                    Use Popularity By Hour
                </Text>
                <BarChart
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                    data={barChartData}
                    width={screenWidth}
                    height={220}
                    yAxisLabel={'Number of Uses'}
                    xAxisLabel={'Hour Of The Day'}
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                />

            </View>
            <View>
                <Text>
                    Hours Of Use By Day Of The Week
                </Text>
                <LineChart
                    data={lineChartData}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    xAxisLabel={'Days Of The Week'}
                    yAxisLabel={'Hours Of Use'}
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier={false}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        </SafeAreaView>
    )

    const lineChartData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                data: props.finalLineGraphData,
                strokeWidth: 2
            },
        ],
    };
    const barChartData = {
        labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
        datasets: [
            {
                data: props.finalBarChartData,
                
            },
        ],
    };

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
                data={props.activities}
                onSelect={(selectedActivity) => {
                    props.setStatsActivity(selectedActivity);
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
            {props.getStatsClicked ? charts : null}

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
        selectedStatsActivity: state.selectedStatsActivity,
        sessions: state.sessions,
        finalLineGraphData: state.finalLineGraphData,
        finalBarChartData: state.finalBarChartData,
        totalTime: state.totalTime,
        getStatsClicked: state.getStatsClicked,
        userID: state.userID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setStatsActivity: (activity) => dispatch(actions.setStatsActivity(activity)),
        setSessions: (sessions) => dispatch(actions.setSessions(sessions)),
        setLineGraphDataObjects: (data) => dispatch(actions.setLineGraphDataObjects(data)),
        setFinalLineGraphData: (finalData) => dispatch(actions.setFinalLineGraphData(finalData)),
        setTotalTime: (totalTime) => dispatch(actions.setTotalTime(totalTime)),
        toggleGetStatsClicked: () => dispatch(actions.toggleGetStatsClicked(true))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen);
