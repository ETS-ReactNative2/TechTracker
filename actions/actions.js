export const CHANGE_SUBMIT = 'CHANGE_SUBMIT';
export const CREATE_NEW_ACTIVITY = 'CREATE_NEW_ACTIVITY';
export const SET_ACTIVITIES = 'SET_ACTIVITIES';
export const ACTIVITY_NAME_CHANGE = 'ACTIVITY_NAME_CHANGE';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const SET_SELECTED_ACTIVITY = 'SET_SELECTED_ACTIVITY';

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
