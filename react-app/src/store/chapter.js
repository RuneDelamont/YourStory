// actions //

// action variables //
const GET_CHAPTERS = 'chapters/GET_CHAPTERS';
const GET_CHAPTER = 'chapters/GET_CHAPTER';
const SET_CHAPTER = 'chapters/SET_CHAPTER';
const PUT_CHAPTER = 'chapters/PUT_CHAPTER';
const DELETE_CHAPTER = 'chapters/DELETE_CHAPTER';


// action creators //
export const getChapters = (chapters) => {
    return {
        type: GET_CHAPTERS,
        chapters
    }
}

export const getChapter = (id) => {
    return {
        type: GET_CHAPTER,
        id
    }
}

export const createChapter = (chapter) => {
    return {
        type: SET_CHAPTER,
        chapter
    }
}

export const updateChapter = (chapter) => {
    return {
        type: PUT_CHAPTER,
        chapter
    }
}

export const deleteChapter = (id) => {
    return {
        type: DELETE_CHAPTER,
        id
    }
}

// thunks //

// get all chapters
export const thunkGetChapters = () => async (dispatch) => {
    // fetch
    const res = await fetch(`/api/chapters/`);

    if(res.ok){
        const chapters = await res.json();

        // dispatch and return
        dispatch(getChapters(chapters.chapters));
        return chapters;
    }
}

export const thunkGetChapter = (id) => async (dispatch) => {
    // get chapter by id
    const res = await fetch(`/api/chapters/${id}/`);

    // if res.status === 200 get chapter
    if(res.ok){
        const chapter = await res.json();

        // dispatch and return
        dispatch(getChapter(chapter.id));
        return chapter;
    }
}

// get chapters by book
export const thunkGetChaptersByBook = (id) => async (dispatch) => {
    // fetch
    const res = await fetch(`/api/chapters/${id}/`);

    if(res.ok){
        const bookChapters = await res.json();

        dispatch(getChapters(bookChapters.id));
        return bookChapters;
    }
}

// create chapter
export const thunkCreateChapter = (chapter) => async (dispatch) => {
    // fetch
    const res = await fetch(`/api/chapters/`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(chapter)
    });

    // if res.status === 200 create
    if(res.ok){
        const newChapter = await res.json();

        // dispatch and return
        dispatch(SET_CHAPTER(newChapter));
        return newChapter;
    }

    return null;
}


export const thunkUpdateChapter = (chapter) => async (dispatch) => {
    // fetch 
    const res = await fetch(`/api/chapters/${chapter.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(chapter)
    });

    // if res.status === 200 update
    if(res.ok){
        const updatedChapter = await res.json();

        // dispatch and return
        dispatch(PUT_CHAPTER(updateChapter));
        return updatedChapter;
    }

    return null;
}

export const thunkDeleteChapter = (chapter) => async (dispatch) => {
    // fetch
    const res = await fetch(`/api/chapters/${chapter.id}`,{
        method: "DELETE"
    });
    
    // if res.status === 200 delete
    if(res.ok){
        dispatch(deleteChapter(chapter.id))
    }
    return null;
}
// Reducer //

const initialState = {};

export default function chapterReducer(state = initialState, action){
    const newChapters = { ...state };

    switch(action.type) {

        case DELETE_CHAPTER:
            delete newChapters[action.id];

            return newChapters;

        default:
            return Object.assign({}, newChapters, action.chapters);
    }
}