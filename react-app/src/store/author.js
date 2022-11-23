// Actions //

// action variables //
const GET_AUTHORS = 'authors/GET_AUTHORS';
const GET_AUTHOR = 'authors/GET_AUTHOR';
const SET_AUTHOR = 'authors/SET_AUTHOR';
const PUT_AUTHOR = 'authors/PUT_AUTHOR';
const DELETE_AUTHOR = 'authors/DELETE_AUTHOR';


// Action creators //

// get authors //
export const loadAuthors = (authors) => {
    return {
        type: GET_AUTHORS,
        authors
    };
};

export const loadAuthor = (id) => {
    return {
        type: GET_AUTHOR,
        id
    };
};

export const createAuthor = (author) => {
    return {
        type: SET_AUTHOR,
        author
    };
};

export const putAuthor = (id) => {
    return {
        type: PUT_AUTHOR,
        id
    }
}

export const deleteAuthor = (id) => {
    return {
        type: DELETE_AUTHOR,
        id
    };
};



// Thunks //

// Get all authors
export const thunkGetAuthors = () => async (dispatch) => {
    // get all authors
    const res = await fetch('/api/authors/');

    if(res.ok){
        const authorData = await res.json();

        // dispatch authors
        dispatch(loadAuthors(authorData.authors))

        return authorData;
    }
}

// Get author
export const thunkGetAuthor = (id) => async(dispatch) => {
    // get author
    const res = await fetch(`/api/authors/${id}/`);

    if(res.ok){
        // json author
        const author = await res.json();

        // dispatch
        dispatch(loadAuthor(author.id));

        // return author
        return author
    }
}

// Get author books
// export const thunkGetAuthorBooks = (authorId) => async(dispatch) => {
//     // get author
//     const res = await fetch(`/api/authors/${authorId}`);

//     if(res.ok){
//         // json author books
//         const authorBooks = res.json();

//         // dispatch
//         dispatch(loadAuthor(authorBooks));

//         // return author
//         return authorBooks
//     }
// }

// Create an author
export const thunkCreateAuthor = (author) => async(dispatch) => {
    // const { first_name, last_name, pen_name, email } = author;

    const res = await fetch(`/api/authors/`, { 
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(author)
    });

    if(res.ok) {
        const newAuthor = await res.json();

        dispatch(createAuthor(newAuthor));

        return newAuthor;
    }

    return null;
}

// edit author
export const thunkPutAuthor = (author, authorId) => async (dispatch) => {
    // // destructure get id
    // const { id } = author;
    
    // fetch
    const res = await fetch(`/api/authors/${authorId}/`, {
        method: "PUT",
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(author)
    });

    if(res.ok){
        const editedAuthor = await res.json();
        dispatch(createAuthor(editedAuthor));

        return editedAuthor;
    }

    return null;
}


export const thunkDeleteAuthor = (author) => async(dispatch) => {
    // fetch

    const res = await fetch(`/api/author/${author.id}/`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(deleteAuthor(author.id))
    }

    return null;
}


// Selector

const initialState = {};

export default function authorReducer(state = initialState, action) {
    const newAuthors = { ...state };
    
    switch(action.type) {
        
        case DELETE_AUTHOR:
            delete newAuthors[action.id];

            return newAuthors;

        default:
            return Object.assign({}, newAuthors, action.authors)
    }
}