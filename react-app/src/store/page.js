// Actions //
const GET_PAGES = 'pages/GET_PAGES';
const GET_PAGE = 'pages/GET_PAGE';
const CREATE_PAGE = 'pages/CREATE_PAGE';
const UPDATE_PAGE = 'pages/UPDATE_PAGE';
const DELETE_PAGE = 'pages/DELETE_PAGE';


// Action Creators //
export const getPages = (pages) => {
    return {
        type: GET_PAGES,
        pages
    }
}

export const getPage = (id) => {
    return {
        type: GET_PAGE,
        id
    }
}

export const createPage = (page) => {
    return {
        type: CREATE_PAGE,
        page
    }
}

export const updatePage = (page) => {
    return {
        type: UPDATE_PAGE,
        page
    }
}

export const deletePage = (id) => {
    return {
        type: DELETE_PAGE,
        id
    }
}

// thunks //

// get all pages
export const thunkGetPages = () => async (dispatch) => {
    // fetch all pages
    const res = await fetch(`/api/pages`);

    // if res.status === 200
    if(res.ok){
        const pages = res.json();

        // dispatch and return pages
        dispatch(getPages(pages.pages));
        return pages;
    }
}

// get page by Id
export const thunkGetPage = (pageId) => async (dispatch) => {
    // fetch get page by Id
    const res = await fetch(`/api/pags/${pageId}`);

    // if res.status === 200
    if(res.ok) {
        const page = res.json();
        dispatch(getPage(page.id));

        return page;
    };
};

// create page in chapter 
export const thunkCreateNewPage = (chapterId, page) => async(dispatch) => {
    // fetch post new page
    const res = await fetch(`/api/pages/${chapterId}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(page)
    });

    // if res.status === 200
    if(res.ok){

        const newPage = res.json();
        dispatch(createPage(newPage));

        return newPage;
    }
}

// edit page
export const thunkEditPage = (page, pageId) => async (dispatch) => {
    // fetch page
    const res = await fetch(`/api/pages/${pageId}`,{
        method: "PUT",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(page)
    });

    // if res.status === 200
    if(res.ok){
        const editedPage = res.json();

        // edit and dispatch
        dispatch(updatePage(editedPage));
        return editedPage;
    }

    return null;
}

// delete page
export const thunkDeletePage = (id) => async (dispatch) => {
    // fetch delete page
    const res = await fetch(`/api/pages/${id}`, {
        method: "DELETE"
    });

    // if res.status === ok
    if(res.ok){
        dispatch(deletePage(id))
        return null;
    }
}


// Reducer

const initialState = {}

export default function pageReducer(state = initialState, action){

    const newPages = { ...state };

    switch(action.type) {

        case DELETE_PAGE:
            delete newPages[action.id];

            return newPages;

        default:
            return Object.assign({}, newPages, action.pages)

    };
};