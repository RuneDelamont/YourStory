from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Author, Book, Chapter, Page, User

user_routes = Blueprint('users', __name__)

# get all users
@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


# get user by id
@user_routes.route('/<int:id>/')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    
    # get current user through current user id
    user = User.query.get(id)

    # user authors
    authors = Author.query.filter(Author.user_id == user.id)

    # user books
    books = Book.query.filter(Book.user_id == user.id)

    # return
    return {
        "user": user.to_dict(),
        "authors": {author.id: author.to_dict() for author in authors},
        "books": {book.id: book.to_dict() for book in books}
    }

# get current user
@user_routes.route('/current/')
@login_required
def get_current_user():
    
    # get current user through current user id
    user = User.query.get(int(current_user.get_id()))
    
    # user authors
    authors = Author.query.filter(Author.user_id == user.id)
    
    # user books
    books = Book.query.filter(Book.user_id == user.id)
    
    # return
    return {
        "user": user.to_dict(),
        "authors": {author.id: author.to_dict() for author in authors},
        "books": {book.id: book.to_dict() for book in books}
        }
    
    
    
# get user authors
@user_routes.route('/authors/')
@login_required
def get_current_user_authors():
    
    # get current user
    user = User.query.get(int(current_user.get_id()))

    # get user authors
    authors = Author.query.filter(Author.user_id == int(user.id))
    
    # return user with authors
    return {
        "user": user.to_dict(),
        "authors": {author.id: author.to_dict() for author in authors}
    }
    
    
# get user books
@user_routes.route('/books/')
@login_required
def get_current_user_books():
    
    # get current user
    user = User.query.get(int(current_user.get_id()))
    
    # get books
    books = Book.query.filter(Book.user_id == user.id)
    
    # return user and books
    return {
        "user": user.to_dict(),
        "books": {book.id: book.to_dict() for book in books}
    }