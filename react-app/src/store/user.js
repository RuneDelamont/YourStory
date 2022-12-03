// actions

const GET_USERS = 'users/GET_USERS';
const GET_USER = 'users/GET_USER';
const GET_CURRENT_USER = 'users/GET_CURRENT_USER';
const DELETE_USER = 'users/DELETE_USER';


// action creators

export const getUsers = (users) => {
    return {
        type: GET_USERS,
        users
    }
}

export const getUser = (id) => {
    return {
        type: GET_USER,
        id
    }
}

export const getCurrentUser = (user) => {
    return {
        type: GET_CURRENT_USER,
        user
    }
}

export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        id
    }
}

// thunks

export const thunkGetUsers = () => async (dispatch) => {
    // fetch
    const res = await fetch(`/api/users/`);

    // if res.status === 200
    if(res.ok){
        const users = await res.json();

        // dispatch and return
        dispatch(getUsers(users.users));
        return users;
    }
}

export const thunkGetUser = (id) => async (dispatch) => {
    // fetch
    const res = await fetch(`/api/users/${id}/`);

    // if res.status === 200
    if(res.ok){
        const user = await res.json();

        // dispatch user and return
        dispatch(getUser(user.id));
        return user;
    }
}

export const thunkGetCurrentUser = () => async (dispatch) => {
    // fetch
    const res = await fetch(`/api/users/current/`);

    // if res.status === 200
    if(res.ok){
        const currentUser = await res.json();

        dispatch(getCurrentUser(currentUser));
        return currentUser;
    }
}


// reducer
const initialState = {};

export default function userReducer(state = initialState, action){
    const newUsers = { ...state };

    switch(action.type){

        case DELETE_USER:
            delete newUsers[action.id];
            return newUsers;

        default:
            return Object.assign({}, newUsers, action.users)
    }
    
}