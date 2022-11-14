from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.forms import BookForm
from app.models import Book, db
from .auth_routes import validation_errors_to_error_messages

book_routes = Blueprint('books', __name__)

# get all books
@book_routes.route('/')
@login_required
def books():
    """
    Query get all books
    """
    
    books = Book.query.all()
    return {'books': [book.to_dict() for book in books]}

# get book by id
@book_routes.route('/<int:id>')
@login_required
def book_by_id(id):
    """
    Query get book by id
    """
    book = Book.query.get(id)
    return book.to_dict()
    
    
# Create book
@book_routes.route('/', methods=['POST'])
def create_book():
    """
    Create a new book
    """
    user = current_user.get_id()
    form = BookForm()
    # # Get the csrf_token from the request cookie and put it into the
    # # form manually to validate_on_submit can be used
    # form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        book = Book(
            user_id = user,
            author_id = form['author_id'],
            name = form['name'],
            publish_date = form['publish_date']
        )
        db.session.add(book)
        db.session.commit()
        return book.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401