from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.forms import AuthorForm
from app.models import Author, Book, Chapter, Page, db
from .auth_routes import validation_errors_to_error_messages

author_routes = Blueprint('authors', __name__)

#get author by id and books
@login_required
@author_routes.route('/<int:author_id>')
def get_author_by_id(author_id):
    
    author = Author.query.get(author_id)
    
    if(author is None):
        return {'errors': f"Author {author_id} does not exist"}, 404

    # get all books with author id
    books = Book.query.filter(Book.author_id == int(author_id))
    
    # return author.to_dict()
    return {
        "author" : author.to_dict(),
        "books" : [book.to_dict() for book in books]
    }

#get author books
@author_routes.route('/<int:author_id>/books')
def get_author_books(author_id):
    
    author = Author.query.get(author_id)
    
    if(author is None):
        return {'errors': f"Author {author_id} does not exist"}, 404
    
    # get all books with author id
    books = Book.query.filter(Book.author_id == int(author_id))
    
    return {
        "author" : author.to_dict(),
        "books" : [book.to_dict() for book in books]
        }

#get all authors
@author_routes.route('/')
@login_required
def get_authors():
    
    authors = Author.query.all()
    
    return {'authors': [author.to_dict() for author in authors]}


#create an author
@author_routes.route('/', methods=['POST'])
@login_required
def create_author():
    
    # current user id
    curr_user_id = current_user.get_id()
    
    form = AuthorForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        author = Author(
            user_id = curr_user_id,
            first_name = form.data['first_name'],
            last_name = form.data['last_name'],
            pen_name = form.data['pen_name'],
            email = form.data['email']
        )
        
        # add to db
        db.session.add(author)
        db.session.commit()
        
        # return the new author
        return author.to_dict()
    
    # return validation errors
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#update author
@author_routes.route('/<int:author_id>', methods=['PUT'])
@login_required
def update_author(author_id):
    
    # query for author in params id
    author = Author.query.get(author_id)
    
    # return error if not found
    if(author is None):
        return {'error', f"Author {author_id} does not exist"}, 404
    
    # get current user id
    current_user_id = current_user.get_id()
    
    # check if current user is author user
    if(current_user_id != author.user_id):
        return {"error": "Forbidden error, user does not have access"}, 403
    
    # Update in form
    form = AuthorForm()
    
    
    author.first_name = form.data['first_name']
    author.last_name = form.data['last_name']
    author.pen_name = form.data['pen_name']
    author.email = form.data['email']
    
    db.session.commit()
    
    return author.to_dict()

# delete author
@author_routes.route('/<int:author_id>', methods=['DELETE'])
@login_required
def delete_author(author_id):
     
    # query for author in params id
    author = Author.query.get(author_id)
    
    # return error if not found
    if(author is None):
        return {'error', f"Author {author_id} does not exist"}, 404
    
    # get current user id
    current_user_id = int(current_user.get_id())
    
    # check if current user is author user
    if(current_user_id != author.user_id):
        return {"error": "Forbidden error, user does not have access"}, 403
    
    # query books, chapter, and pages then delete
    books = Book.query.filter(Book.author_id == author_id)
    chapters = Chapter.query.filter(Chapter.author_id == author_id)
    pages = Page.query.filter(Page.author_id == author_id)
    
    books.delete(synchronize_session = False)
    chapters.delete(synchronize_session = False)
    pages.delete(synchronize_session = False)
    
    
    db.session.delete(author)
    db.session.commit()
    
    return {"message": f"Successfully deleted author {author_id}"}
