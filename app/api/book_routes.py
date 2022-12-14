from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.forms import BookForm, ChapterForm
from app.models import Book, Chapter, Page, db
from .auth_routes import validation_errors_to_error_messages

book_routes = Blueprint('books', __name__)

# # add chapter to book
# @book_routes.route('/<int:id>/chapters', methods=["POST"])
# @login_required
# def add_chapter_to_book(id):
    
#     # Find book by id
#     book = Book.query.get(id)
    
#     # If no book at id return error
#     if(book is None):
#         return {'errors': [f"Book {id} does not exist"]}, 404
    
#     # chapter form
#     form = ChapterForm()
    
#     # if form is valid
#     if(form.validate_on_submit()):
#         chapter = Chapter(
#             book_id = id,
#             title = form['title']
#         )
        
#         # commit chapter
#         db.session.add(chapter)
#         db.session.commit()
        
#         # return chapter dict 
#         return chapter.to_dict
    
#     # return validation errors if error
#     return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# get a books chapters
@book_routes.route('/<int:book_id>/chapters')
@login_required
def get_book_chapters(book_id):
    
    # get book
    book = Book.query.get(book_id)
    
    # If book is none return 404
    if(book is None):
        return {"error": f"Book {book_id} does not exist"}, 404
    
    # get all chapters
    chapters = Chapter.query.filter(Chapter.book_id == book_id)
    
    return {
        "book": book.to_dict(),
        "chapters": {chapter.id: chapter.to_dict() for chapter in chapters}
        }


# get book by id
@book_routes.route('/<int:book_id>')
@login_required
def book_by_id(book_id):

    # Find book by id
    book = Book.query.get(book_id)
    
    # If no book at book_id return error
    if(book is None):
        return {'errors': [f"Book {book_id} does not exist"]}, 404

    # get all chapters
    chapters = Chapter.query.filter(Chapter.book_id == book_id)
    
    return {
        "book": book.to_dict(),
        "chapters": {chapter.id: chapter.to_dict() for chapter in chapters}
        }    
    # return book.to_dict()



# get all books
@book_routes.route('/')
@login_required
def books():
    """
    Query get all books
    """
    # Find all books in table
    books = Book.query.all()
    return {'books': {book.id: book.to_dict() for book in books}}

# Create book
@book_routes.route('/', methods=['POST'])
def create_book():
    """
    Create a new book
    """
    # get current user.id for submit
    user = current_user.get_id()
    
    # book form
    form = BookForm()

    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    
    # if form validates create book
    if form.validate_on_submit():
        book = Book(
            user_id = user,
            author_id = form.data['author_id'],
            name = form.data['name'],
            publish_date = form.data['publish_date']
        )
        
        # add to db
        db.session.add(book)
        db.session.commit()
        
        # return new book
        return book.to_dict()
    
    # if validation error return error
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# edit book by id
@book_routes.route('/<int:book_id>', methods=["PUT"])
@login_required
def update_book_by_id(book_id):

    # Find book by id
    book = Book.query.get(book_id)
    
    # If no book at book_id return error
    if(book is None):
        return {'errors': [f"Book {book_id} does not exist"]}, 404
    
    # get current user id
    current_user_id = current_user.get_id()

    # check if current user is book user
    if(int(current_user_id) != book.user_id):
        return {"error": "Forbidden error, user does not have access"}, 403
    
    form = BookForm()
    
    # if form.data fields are whitespace error
    if(form.data['name'].strip() == '' or form.data['name'] is None):
        return {'errors': ['Invalid name']}, 400
    
    # if(form.data['author_id'].strip() == '' or form.data['author_id'] is None):
    #     return {'errors': ['Invalid author id']}, 400
    
    # if(form.data['publish_date'].strip() == '' or form.data['publish_date'] is None):
    #     return {'errors': ['Invalid publish date']}, 400
    
    # update book
    book.author_id = form.data['author_id']
    book.name = form.data['name']
    book.publish_date = form.data['publish_date']
    
    # commit updated book
    db.session.commit()
    
    # return new book
    return book.to_dict()

# delete book by id
@book_routes.route('/<int:book_id>', methods=["DELETE"])
@login_required
def delete_book_by_id(book_id):
    """
    Query delete book by id
    """
    # Find book by id
    book = Book.query.get(book_id)
    
    # If no book at book_id return error
    if(book is None):
        return {'errors': [f"Book {book_id} does not exist"]}, 404
    
    
    # get current user id
    current_user_id = current_user.get_id()
    
    # check if current user is book user
    if(int(current_user_id) != book.user_id):
        return {"error": "Forbidden error, user does not have access"}, 403

    # grab chapters and delete
    chapters = Chapter.query.filter(Chapter.book_id == book_id)
    chapters.delete(synchronize_session = False)
    
    # grab pages and delete
    pages = Page.query.filter(Page.book_id == book_id)
    pages.delete(synchronize_session = False)
    
    # delete then commit to db
    db.session.delete(book)
    db.session.commit()
    
    return {"message": f"Successfully deleted book {book_id}."}
    
    