import axios from 'axios'


const initialState = {
   submitClicked: null,
   createNewActivity: null,
   activityName: '',
   selectedActivity: '',
   activities: [],


}

const reducer = (state = initialState, action) => {
    if(action.type === 'SET_ACTIVITIES') {
        return {
            ...state, 
            activities: action.payload
        }
    }
    if(action.type === 'CREATE_NEW_ACTIVITY') {
        return {
            ...state, 
            createNewActivity: action.payload
        }
    }
    if(action.type === 'ACTIVITY_NAME_CHANGE') {
        return {
            ...state, 
            activityName: action.payload
        }
    }
    if(action.type === 'ADD_ACTIVITY') {
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
    if(action.type === 'SET_SELECTED_ACTIVITY') {
        return {
            ...state, 
            selectedActivity: action.payload
        }
    }
    

    return state;
}

export default reducer;