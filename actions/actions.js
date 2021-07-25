export const CHANGE_SUBMIT = 'CHANGE_SUBMIT';
export const CREATE_NEW_ACTIVITY = 'CREATE_NEW_ACTIVITY';
export const SET_ACTIVITIES = 'SET_ACTIVITIES';
export const ACTIVITY_NAME_CHANGE = 'ACTIVITY_NAME_CHANGE';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const SET_SELECTED_ACTIVITY = 'SET_SELECTED_ACTIVITY';
export const SET_FIRST_NAME = 'SET_FIRST_NAME';
export const SET_USER_ID =  'SET_USER_ID';
export const TOGGLE_STARTED = 'TOGGLE_STARTED';
export const SET_SESSION_ID = 'SET_SESSION_ID';
export const SET_SESSION_ACTIVITY = 'SET_SESSION_ACTIVITY';
export const SET_SESSION_START_TIME = 'SET_SESSION_START_TIME';
export const SET_SESSION_END_TIME = 'SET_SESSION_END_TIME';
export const SET_SESSION_DURATION = 'SET_SESSION_DURATION';
export const SET_SESSION_HOUR_OF_DAY = 'SET_SESSION_HOUR_OF_DAY';
export const SET_SESSION_DAY_OF_WEEK = 'SET_SESSION_DAY_OF_WEEK';
export const SET_STATS_ACTIVITY = 'SET_STATS_ACTIVITY';
export const SET_SESSIONS = 'SET_SESSIONS';
export const SET_LINE_GRAPH_DATA_OBJECTS = 'SET_LINE_GRAPH_DATA_OBJECTS';
export const SET_FINAL_LINE_GRAPH_DATA = 'SET_FINAL_LINE_GRAPH_DATA';
export const SET_FINAL_BAR_CHART_DATA = 'SET_FINAL_BAR_CHART_DATA';
export const SET_TOTAL_TIME = 'SET_TOTAL_TIME';
export const TOGGLE_GET_STATS_CLICKED = 'TOGGLE_GET_STATS_CLICKED';

export const setActivities = (activities) => {
    return {
        type: SET_ACTIVITIES,
        payload: activities
    }
}
export const toggleCreateActivity = () => {
    return {
        type: CREATE_NEW_ACTIVITY,
        payload: true
    }
}
export const handleActivityNameChange = (name) => {
    return {
        type: ACTIVITY_NAME_CHANGE,
        payload: name
    }
}
export const addActivity = (activity) => {
    return {
        type: ADD_ACTIVITY,
        payload: activity
    }
}
export const setSelectedActivity = (activityName) => {
    return {
        type: SET_SELECTED_ACTIVITY,
        payload: activityName
    }
}
export const setFirstName = (firstName) => {
    return {
        type: SET_FIRST_NAME,
        payload: firstName
    }
}
export const setUserID = (userID) => {
    return {
        type: SET_USER_ID,
        payload: userID
    }
}
export const toggleStarted = (boolean) => {
    return {
        type: TOGGLE_STARTED,
        payload: boolean
    }
}
export const setSessionID = (userID) => {
    return {
        type: SET_SESSION_ID,
        payload: userID
    }
}
export const setSessionActivity = (activity) => {
    return {
        type: SET_SESSION_ACTIVITY,
        payload: activity
    }
}
export const setSessionStartTime = (time) => {
    return {
        type: SET_SESSION_START_TIME,
        payload: time
    }
}
export const setSessionEndTime = (time) => {
    return {
        type: SET_SESSION_END_TIME,
        payload: time
    }
}
export const setSessionDuration = (duration) => {
    return {
        type: SET_SESSION_DURATION,
        payload: duration
    }
}
export const setSessionHourOfDay = (hour) => {
    return {
        type: SET_SESSION_HOUR_OF_DAY,
        payload: hour
    }
}
export const setSessionDayOfWeek = (day) => {
    return {
        type: SET_SESSION_DAY_OF_WEEK,
        payload: day
    }
}
export const setStatsActivity = (activity) => {
    return {
        type: SET_STATS_ACTIVITY,
        payload: activity
    }
}
export const setLineGraphDataObjects = (data) => {
    return {
        type: SET_LINE_GRAPH_DATA_OBJECTS,
        payload: data
    }
}
export const setFinalLineGraphData = (finalData) => {
    return {
        type: SET_FINAL_LINE_GRAPH_DATA,
        payload: finalData
    }
}
export const setFinalBarChartData = (finalData) => {
    return {
        type: SET_FINAL_BAR_CHART_DATA,
        payload: finalData
    }
}
export const setTotalTime = (time) => {
    return {
        type: SET_FINAL_BAR_CHART_DATA,
        payload: time
    }
}
export const toggleGetStatsClicked = (boolean) => {
    return {
        type: TOGGLE_GET_STATS_CLICKED,
        payload: boolean
    }
}