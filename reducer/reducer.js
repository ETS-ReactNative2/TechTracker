import axios from 'axios'
import * as actions from '../actions/actions'


const initialState = {
   submitClicked: null,
   createNewActivity: null,
   activityName: '',
   selectedSessionActivity: '',
   selectedStatsActivity: '',
   activities: [],
   userID: '',
   firstName: '',
   started: null,
   session: {
       user_id: null,
       activity: null,
       start_time: null,
       end_time: null,
       duration: null,
       hourOfDay: null,
       dayOfWeek: null
   }
}

const reducer = (state = initialState, action) => {
    if(action.type === actions.SET_ACTIVITIES) {
        return {
            ...state, 
            activities: action.payload
        }
    }
    if(action.type === actions.CREATE_NEW_ACTIVITY) {
        return {
            ...state, 
            createNewActivity: action.payload
        }
    }
    if(action.type === actions.ACTIVITY_NAME_CHANGE) {
        return {
            ...state, 
            activityName: action.payload
        }
    }
    if(action.type === actions.ADD_ACTIVITY) {
        axios.post('http://localhost:3000/activities', {...action.payload}).then(({data}) => {
            if(data.status !== 'success'){
                console.log(data);
            }
        })
        return {
            ...state, 
            activities: [...state.activities, action.payload.activityName]
        }
    }
    if(action.type === actions.SET_SELECTED_ACTIVITY) {
        return {
            ...state, 
            selectedActivity: action.payload
        }
    }
    if(action.type === actions.SET_FIRST_NAME) {
        return {
            ...state, 
            firstName: action.payload
        }
    }
    if(action.type === actions.SET_USER_ID) {
        return {
            ...state, 
            userID: action.payload
        }
    }
    if(action.type === actions.TOGGLE_STARTED) {
        return {
            ...state, 
            started: action.payload
        }
    }
    if(action.type === actions.SET_SESSION_ID) {
        return {
            ...state, 
            session: {...state.session, user_id: action.payload}
        }
    }
    if(action.type === actions.SET_SESSION_ACTIVITY) {
        return {
            ...state, 
            session: {...state.session, activity: action.payload}
        }
    }
    if(action.type === actions.SET_SESSION_START_TIME) {
        return {
            ...state, 
            session: {...state.session, start_time: action.payload}
        }
    }
    if(action.type === actions.SET_SESSION_END_TIME) {
        return {
            ...state, 
            session: {...state.session, end_time: action.payload}
        }
    }
    if(action.type === actions.SET_SESSION_DURATION) {
        return {
            ...state, 
            session: {...state.session, duration: action.payload}
        }
    }
    if(action.type === actions.SET_SESSION_HOUR_OF_DAY) {
        return {
            ...state, 
            session: {...state.session, hourOfDay: action.payload}
        }
    }
    if(action.type === actions.SET_SESSION_DAY_OF_WEEK) {
        return {
            ...state, 
            session: {...state.session, dayOfWeek: action.payload}
        }
    }
    if(action.type === actions.SET_STATS_ACTIVITY) {
        return {
            ...state, 
            selectedStatsActivity: action.payload
        }
    }
    

    return state;
}

export default reducer;