from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.forms import BookForm, ChapterForm, PageForm
from app.models import Book, Chapter, Page, db
from .auth_routes import validation_errors_to_error_messages

page_routes = Blueprint('pages', __name__)

# add page to chapter
@page_routes.route('/<int:id>', methods=['POST'])
@login_required
def add_page_to_chapter(id):
    
    # find chapter
    chapter = Chapter.query.get(id)
    
    # user_id
    page_user_id = current_user.get_id()
    
    # If chapter is None error
    if(chapter is None):
        return {'error': f"Chapter {id} does not exist"}, 404
    
    form = PageForm()
    
    if(form.validate_on_submit()):
        page = Page(
            user_id = page_user_id,
            chapter_id = id,
            page_words = form['page_words']
        )
        
        # add and commit to db
        db.session.add(page)
        db.session.commit()
        
        # return new page
        return page.to_dict()
    
    # return validation errors if any
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# get pages by chapter id
@page_routes.route('/<int:chapter_id>')
def get_chapter_pages(chapter_id):

    # get chapter
    chapter = Chapter.query.get(chapter_id)
    
    # If chapter is None 404 error
    if(chapter is None):
        return {'error': f"Chapter {chapter_id} does not exist"}, 404
    
    # get all pages
    pages = Page.query.get(Page.chapter_id == chapter_id).all()

    return {'pages': [page.to_dict for page in pages]}


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
@page_routes.route('/<int:page_id>')
@login_required
def update_page(page_id):
    
    # query page
    page = Page.query.get(page_id)
    
    # If page is none 404
    if(page is None):
        return {"error": f"Page {page_id} does not exist"}, 404
    
    form = PageForm()
    
    page.page_words = form['page_words']
    
    db.session.commit()
    
    return page.to_dict()


# delete page
@page_routes.route('/<int:page_id>')
@login_required
def delete_page(page_id):
    
    # query page
    page = Page.query.get(page_id)
    
    # If page is none 404
    if(page is None):
        return {"error": f"Page {page_id} does not exist"}, 404
    
    form = PageForm()
    
    page.page_words = form['page_words']
    
    db.session.delete(page)
    db.session.commit()
    
    return {"message": f"Page {page_id} successfully deleted"}
