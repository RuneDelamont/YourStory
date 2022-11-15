from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.forms import ChapterForm
from app.models import Chapter, Author, Book, db
from .auth_routes import validation_errors_to_error_messages

chapter_routes = Blueprint('chapters', __name__)

# add chapter to book
@chapter_routes.route('/<int:id>', methods=["POST"])
@login_required
def add_chapter_to_book(id):
    
    # Find book by id
    book = Book.query.get(id)
    
    chapter_user_id = current_user.get_id()
    
    # If no book at id return error
    if(book is None):
        return {'errors': [f"Book {id} does not exist"]}, 404
    
    # chapter form
    form = ChapterForm()
    
    # if form is valid
    if(form.validate_on_submit()):
        chapter = Chapter(
            user_id = chapter_user_id,
            book_id = id,
            title = form['title']
        )
        
        # commit chapter
        db.session.add(chapter)
        db.session.commit()
        
        # return chapter dict 
        return chapter.to_dict
    
    # return validation errors if error
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# get a books chapters
@chapter_routes.route('/<int:book_id>/chapters')
@login_required
def get_book_chapters(book_id):
    
    # get all chapters
    chapters = Chapter.query.get(Chapter.book_id == book_id).all()
    
    return {"chapters": [chapter.to_dict() for chapter in chapters]}


# get chapter by id
@chapter_routes.route('/<int:chapter_id>')
@login_required
def get_chapter_by_id(chapter_id):
    
    # query for chapter
    chapter = Chapter.query.get(chapter_id)
    
    # If chapter does not exist 404
    if(chapter is None):
        return {'error': f"Chapter {chapter_id} is not found"}, 404
    
    return chapter.to_dict()

# update chapter
@chapter_routes.route('/<int:chapter_id>', methods=["PUT"])
@login_required
def update_chapter(chapter_id):
    
    # Query for chapter
    chapter = Chapter.query.get(chapter_id)
    
    # Check if chapter exists
    if(chapter is None):
        return {"error": f"Chapter {chapter_id} does not exist"}
    
    # chapter form
    form = ChapterForm
    
    # update chapter
    chapter.title = form['title']
    
    # commit to db
    db.session.commit()
    
    return chapter.to_dict()



# delete chapter
@chapter_routes.route('/<int:chapter_id>', methods=["PUT"])
@login_required
def delete_chapter(chapter_id):
    
    # Query for chapter
    chapter = Chapter.query.get(chapter_id)
    
    # Check if chapter exists
    if(chapter is None):
        return {"error": f"Chapter {chapter_id} does not exist"}
    
    
    # delete && commit to db
    db.session.delete(chapter)
    db.session.commit()
    
    return {"message": f"Chapter {chapter_id} successfully deleted"}


# get all chapters
@chapter_routes.route('/')
@login_required
def get_chapters():
    
    # get chapters
    chapters = Chapter.query.all()
    
    return {"chapters": [chapter.to_dict() for chapter in chapters]}