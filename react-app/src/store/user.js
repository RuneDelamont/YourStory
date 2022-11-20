// actions

const GET_USERS = 'users/GET_USERS';
const GET_USER = 'users/GET_USER';
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

export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        id
    }
}

// thunks

export const thunkGetUsers = () => async (dispatch) => {
    // fetch
    const res = await fetch(`/api/users`);

    // if res.status === 200
    if(res.ok){
        const users = res.json();

        // dispatch and return
        dispatch(users.users);
        return users;
    }
}

export const thunkGetUser = (id) => async (dispatch) => {
    // fetch
    const res = await fetch(`'/api/users/${id}`);

    // if res.status === 200
    if(res.ok){
        const user = res.json();

        // dispatch user and return
        dispatch(user.id);
        return user;
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