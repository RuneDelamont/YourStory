from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.forms import BookForm, ChapterForm, PageForm
from app.models import Book, Chapter, Page, db
from .auth_routes import validation_errors_to_error_messages

page_routes = Blueprint('pages', __name__)

# add page to chapter
@page_routes.route('/<int:chapter_id>', methods=['POST'])
@login_required
def add_page_to_chapter(chapter_id):
    
    # find chapter
    chapter = Chapter.query.get(chapter_id)
    
    # user_id
    page_user_id = int(current_user.get_id())
    
    # If chapter is None error
    if(chapter is None):
        return {'error': f"Chapter {chapter_id} does not exist"}, 404
    
    # If current_user_id != chapter.user_id return 403
    if(page_user_id != chapter.user_id):
        return {"error": "Forbidden error, user does not have access"}, 403
    
    form = PageForm()
    
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if(form.validate_on_submit()):
        page = Page(
            user_id = page_user_id,
            author_id = chapter.author_id,
            book_id = chapter.book_id,
            chapter_id = chapter.id,
            page_words = form.data['page_words']
        )
        
        # add and commit to db
        db.session.add(page)
        db.session.commit()
        
        # return new page
        return page.to_dict()
    
    # return validation errors if any
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# get page by id
@page_routes.route('/<int:page_id>')
def get_page(page_id):
    
    # get page
    page = Page.query.get(page_id)
    
    # 404 if page is none
    if(page is None):
        return {"error": f"Page {page_id} does not exist"}, 404
    
    return page.to_dict()

# update page
@page_routes.route('/<int:page_id>', methods=["PUT"])
@login_required
def update_page(page_id):
    
    # query page
    page = Page.query.get(page_id)
    
    # get current_user id
    user_id = int(current_user.get_id())
    
    # If page is none 404
    if(page is None):
        return {"error": f"Page {page_id} does not exist"}, 404
    
    # if user_id != page.user_id return 403
    if(user_id != page.user_id):
        return {"error": "Forbidden error, user does not have access"}, 403
    
    # form
    form = PageForm()
    
    page.page_words = form.data['page_words']
    
    db.session.commit()
    
    return page.to_dict()


# delete page
@page_routes.route('/<int:page_id>', methods=["DELETE"])
@login_required
def delete_page(page_id):
    
    # query page
    page = Page.query.get(page_id)
    
    # get current_user id
    user_id = int(current_user.get_id())
    
    # If page is none 404
    if(page is None):
        return {"error": f"Page {page_id} does not exist"}, 404
    
    # if user_id != page.user_id return 403
    if(user_id != page.user_id):
        return {"error": "Forbidden error, user does not have access"}, 403
    
    db.session.delete(page)
    db.session.commit()
    
    return {"message": f"Page {page_id} successfully deleted"}


# get pages
@page_routes.route('/')
def get_pages():
    
    # get pages
    pages = Page.query.all()
    
    return {"pages" : [page.to_dict() for page in pages]}
