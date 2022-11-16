from app.models import db, Author, Book, Page, environment
# , SCHEMA


def seed_pages():
    
    page1 = Page(
        user_id = 1,
        author_id = 1,
        book_id = 1,
        chapter_id = 1,
        page_words = "Seed page 1"
    )
    
    page2 = Page(
        user_id = 1,
        author_id = 1,
        book_id = 1,
        chapter_id = 1,
        page_words = "Seed page 2"
    )
    
    page3 = Page(
        user_id = 1,
        author_id = 1,
        book_id = 1,
        chapter_id = 2,
        page_words = "Seed page 3"
    )
    
    page4 = Page(
        user_id = 1,
        author_id = 1,
        book_id = 2,
        chapter_id = 3,
        page_words = "Seed page 4"
    )
    
    page5 = Page(
        user_id = 2,
        author_id = 2,
        book_id = 3,
        chapter_id = 4,
        page_words = "Seed page 5"
    )
    
    page6 = Page(
        user_id = 2,
        author_id = 2,
        book_id = 3,
        chapter_id = 4,
        page_words = "Seed page 6"
    )
    
    page7 = Page(
        user_id = 2,
        author_id = 2,
        book_id = 3,
        chapter_id = 5,
        page_words = "Seed page 7"
    )
    
    page8 = Page(
        user_id = 3,
        author_id = 3,
        book_id = 5,
        chapter_id = 6,
        page_words = "Seed page 8"
    )
        
    page9 = Page(
        user_id = 3,
        author_id = 3,
        book_id = 5,
        chapter_id = 7,
        page_words = "Seed page 9"
    )
            
    page10 = Page(
        user_id = 3,
        author_id = 3,
        book_id = 5,
        chapter_id = 7,
        page_words = "Seed page 10"
    )
    
    page11 = Page(
        user_id = 3,
        author_id = 3,
        book_id = 5,
        chapter_id = 8,
        page_words = "Seed page 11"
    )
    
    page12 = Page(
        user_id = 3,
        author_id = 3,
        book_id = 5,
        chapter_id = 9,
        page_words = "We Stop at 12"
    )
    
    
    db.session.add(page1)
    db.session.add(page2)
    db.session.add(page3)
    db.session.add(page4)
    db.session.add(page5)
    db.session.add(page6)
    db.session.add(page7)
    db.session.add(page8)
    db.session.add(page9)
    db.session.add(page10)
    db.session.add(page11)
    db.session.add(page12)
    
    db.session.commit()
    
    


def undo_pages():
    # if environment == "production":
    #     db.session.execute(f"TRUNCATE table {SCHEMA}.authors RESTART IDENTITY CASCADE;")
    # else:
    db.session.execute("DELETE FROM pages")
        
    db.session.commit()  