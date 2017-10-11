const initialState = {
    user: {
        username: 'Odysseus',
        firstName: '',
        lastName: '',
        email: '',
        profilepic: '',
        auth_id: '',
        socket_id: '',
        id: '',
        safe_haven: 'Calypso\'s Island',
        emergency_group_created: false
    },
    userLoc: '',
    friends: [], //array of friend objects [{friend_username, friend_firstname, friend_lastname, friend_email, friend_user_id, friend_status, friend_pic, current_user_id, friend_table_id}] 
    groups: [], //array of group objects [{groupID, groupName, members:[{username, userID}]}]
    pendingFriendRequests: [],
    activeLocations: {
        1: [
            {
                senderName: 'Janise',
                coordinates: {
                    lat: 37.437793, 
                    lng: -122.133636
                },
                situation: 'Out with friends',
                message: 'pls hlp they are trying to feed me rice'
            },
            {
                senderName: 'Abby',
                coordinates: {
                    lat: 40.33503, 
                    lng: -111.708984
                },
                situation: 'Running',
                message: `Keep an eye on me? A bat bit me this morning and I'm afraid I might collapse`
            }
        ],
        2: [
            {
                senderName: 'Alan',
                coordinates: {
                    lat: 80.43033, 
                    lng: -93.867187
                },
                situation: 'Uncomfortable',
                message: `a polar bear is nearby and I don't like the way Santa's Elves are looking at me`
            }
        ],
        3: [
            {
                senderName: 'Andi',
                coordinates: {
                    lat: 48.657362, 
                    lng: -121.824340
                },
                situation: 'Emergency',
                message: `PLS HLP HEREAAM`
            }
        ]
    }, //array of active locations with messages and fromUser {1: [{senderName, coordinates, situation, message, alertID}]}
    //activeLocations: [], //array of active locations with messages and fromUser {senderName, coordinates, situation, message, alertID}
    emergencyGroup: [], //{user_id, emergency_id, message, contact_id: []}
    userLoggedIn: false
};


const GET_USER_INFO = 'GET_USER_INFO',
      UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION',
      GET_FRIENDS_LIST = 'GET_FRIENDS_LIST',
      GET_PENDING_FRIEND_REQUESTS = 'GET_PENDING_FRIEND_REQUESTS',
      GET_GROUPS = 'GET_GROUPS',
      GET_EMERGENCY_GROUP = 'GET_EMERGENCY_GROUP',
      GET_ACTIVE_LOCATIONS = 'GET_ACTIVE_LOCATIONS',
      DELETE_USER = 'DELETE_USER';


//get user info
//add to componentDidMount, inside socket.on('update user')/socket.on('heartbeat')
export function getUserInfo(user){
    return {
        type: GET_USER_INFO,
        payload: user 
    }
}

//update user location, stored as 'lat*lng'
export function updateUserLocation(locString){
    return {
        type: UPDATE_USER_LOCATION,
        payload: locString 
    }
}

//get friends list
// add to componentDidMount, inside socket.on('heartbeat')
export function getFriendsList(friends){
    return {
        type: GET_FRIENDS_LIST,
        payload: friends
    }
}

export function getPendingFriendRequests(requests) {
    return {
        type: GET_PENDING_FRIEND_REQUESTS,
        payload: requests
    }
}

//get groups 
// add to componentDidMount, inside socket.on('heartbeat')
export function getGroups(groups){
    return {
        type: GET_GROUPS,
        payload: groups
    }
}


//get emergency group
export function getEmergencyGroup(group){
    return {
        type: GET_EMERGENCY_GROUP,
        payload: group
    }
}

//get active locations sent to current user
// add to componentDidMount, inside socket.on('heartbeat')

export function getActiveLocations(locations){
    return {
        type: GET_ACTIVE_LOCATIONS,
        payload: locations
    }
}

//delete user


//double check what the payload is for each action
export default function reducer(state = initialState, action){
    let { user, friends, groups, activeLocations } = state;

    switch (action.type) {
        case GET_USER_INFO:
            // console.log('reducer get user info', action.payload)
            return Object.assign({}, state, {user: action.payload})
            break;
        case UPDATE_USER_LOCATION:
            // console.log('reducer get user info', action.payload)
            return Object.assign({}, state, {userLoc: action.payload})
            break;
        case GET_FRIENDS_LIST:
        // console.log('reducer get friends',action.payload)
            return Object.assign({}, state, {friends: action.payload})
            break;
        case GET_PENDING_FRIEND_REQUESTS:
            return Object.assign({}, state, {pendingFriendRequests: action.payload})
            break;
        case GET_GROUPS:
        // console.log('reducer get groups', action.payload)
            return Object.assign({}, state, {groups: action.payload})
            break;
        case GET_EMERGENCY_GROUP:
            // console.log(action.payload);
            return Object.assign({}, state, {emergencyGroup: action.payload})
            break;
        case GET_ACTIVE_LOCATIONS:
        // console.log('reducer get active locations', action.payload)
            return Object.assign({}, state, {activeLocations: action.payload})
            break;

        default:
            break;
    }
    // console.log(state)
    return state;
}
