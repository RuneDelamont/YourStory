from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.forms import ChapterForm
from app.models import Chapter, Author, Book, Page, db
from .auth_routes import validation_errors_to_error_messages

chapter_routes = Blueprint('chapters', __name__)

# get pages by chapter id
@chapter_routes.route('/<int:chapter_id>/pages')
@login_required
def get_chapter_pages(chapter_id):

    # get chapter
    chapter = Chapter.query.get(chapter_id)
    
    # If chapter is None 404 error
    if(chapter is None):
        return {'error': f"Chapter {chapter_id} does not exist"}, 404
    
    # get all pages
    pages = Page.query.filter(Page.chapter_id == chapter_id)

    return {
        'chapter': chapter.to_dict(),
        'pages': [page.to_dict() for page in pages]
        }

# add chapter to book
@chapter_routes.route('/<int:book_id>', methods=["POST"])
@login_required
def add_chapter_to_book(book_id):
    
    # Find book by book_id
    book = Book.query.get(book_id)
    
    chapter_user_id = current_user.get_id()
    
    # If no book at id return error
    if(book is None):
        return {'errors': [f"Book {book_id} does not exist"]}, 404
    
    # If not book user return 403
    if(book.user_id != int(chapter_user_id)):
        return {"error": "Forbidden error, user does not have access"}, 403
    
    # chapter form
    form = ChapterForm()
    
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    
    # if form is valid
    if(form.validate_on_submit()):
        chapter = Chapter(
            user_id = chapter_user_id,
            author_id = book.author_id,
            book_id = book.id,
            title = form.data['title']
        )
        
        # commit chapter
        db.session.add(chapter)
        db.session.commit()
        
        # return chapter dict 
        return chapter.to_dict()
    
    # return validation errors if error
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


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
  
    # get chapter_user_id
    chapter_user_id = int(current_user.get_id())
  
    # if chapter.user_id != current_user.id 403  
    if(chapter.user_id != chapter_user_id):
        return {"error": "Forbidden error, user does not have access"}, 403
    
    # chapter form
    form = ChapterForm()
    
    # update chapter
    chapter.title = form.data['title']
    
    # commit to db
    db.session.commit()
    
    return chapter.to_dict()



# delete chapter
@chapter_routes.route('/<int:chapter_id>', methods=["DELETE"])
@login_required
def delete_chapter(chapter_id):
    
    # Query for chapter
    chapter = Chapter.query.get(chapter_id)
    
    # Check if chapter exists
    if(chapter is None):
        return {"error": f"Chapter {chapter_id} does not exist"}
    
    # get current user id
    chapter_user_id = int(current_user.get_id())
    
    # if chapter.user_id != current_user.id 403
    if(chapter.user_id != chapter_user_id):
        return {"error": "Forbidden error, user does not have access"}, 403
    
    # Query for pages then delete
    pages = Page.query.filter(Page.chapter_id == chapter_id)
    pages.delete(synchronize_session = False)
    
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