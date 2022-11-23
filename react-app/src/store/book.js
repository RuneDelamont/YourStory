// Actions //

//action variables //
const GET_BOOKS = 'authors/GET_BOOKS';
const GET_BOOK = 'books/GET_BOOK';
const SET_BOOK = 'books/SET_BOOK';
const PUT_BOOK = 'books/PUT_BOOK';
const DELETE_BOOK = 'books/DELETE_BOOK';


// action creators //

// get books
export const getBooks = (books) => {
    return {
        type: GET_BOOKS,
        books
    }
}

// get book
export const getBook = (id) => {
    return {
        type: GET_BOOK,
        id
    }
}

// create book
export const createBook = (book) => {
    return {
        type: SET_BOOK,
        book
    }
}

// update book
export const updateBook = (book) => {
    return {
        type: PUT_BOOK,
        book
    }
}

// delete book
export const deleteBook = (id) => {
    return {
        type: DELETE_BOOK,
        id
    }
}


// Thunks //

// get books
export const thunkGetBooks = () => async (dispatch) => {
    // get all books
    const res = await fetch(`/api/books/`);

    if(res.ok){
        const books = await res.json();

        // dispatch and return all books
        dispatch(getBooks(books.books))

        return books;
    }
}

// get book
export const thunkGetBook = (id) => async (dispatch) => {
    // get book by id
    const res = await fetch(`/api/books/${id}/`);

    if(res.ok){
        const book = await res.json();

        // dispatch and return book
        dispatch(getBook(book.id));

        return book;
    }
}

// create book
export const thunkCreateBook = (book) => async (dispatch) => {
    // fetch
    const res = await fetch(`/api/books/`, {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(book)
    });

    if(res.ok){
        const newBook = await res.json();

        // dispatch && return
        dispatch(createBook(newBook));
        return newBook;
    }

    return null;
}


// edit book
export const thunkEditBook = (book, bookId) => async (dispatch) => {
    // fetch
    const res = await fetch(`/api/books/${bookId}/`, {
        method: "PUT",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(book)
    });

    if(res.ok){
        const updatedBook = await res.json();

        // dispatch && return
        dispatch(updateBook(updatedBook));
        return updatedBook;
    }

    return null;
}


// delete book
export const thunkDeleteBook = (id) => async (dispatch) => {
    // fetch delete
    const res = await fetch(`/api/books${id}/`, {
        method: "DELETE"
    });

    // if res.status === 200 delete book
    if(res.ok){
        dispatch(deleteBook(id))
        return null;
    }

}


// Reducer //

const initialState = {};

export default function bookReducer(state = initialState, action){
    const newBooks = { ...state };

    switch(action.type) {

        case DELETE_BOOK:
            delete newBooks[action.id]
            return newBooks;

        default:
            return Object.assign({}, newBooks, action.books)
    }
}