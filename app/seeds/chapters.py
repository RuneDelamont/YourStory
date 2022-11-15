from app.models import db, Author, Book, Chapter, environment
# , SCHEMA

def seed_chapters():
    
    chapter1 = Chapter(
        user_id = 1,
        book_id = 1,
        title = "Intro"
    )
    
    chapter2 = Chapter(
        user_id = 1,
        book_id = 1,
        title = "Adventure Begins"
    )
    
    chapter3 = Chapter(
        user_id = 1,
        book_id = 2,
        title = "Book 2 start"
    )
    
    chapter4 = Chapter(
        user_id = 2,
        book_id = 3,
        title = "Book 3 start"
    )
    
    chapter5 = Chapter(
        user_id = 2,
        book_id = 3,
        title = "You so scandolous"
    )
    
    chapter6 = Chapter(
        user_id = 3,
        book_id = 5,
        title = "The beginning of the End"
    )
    
    chapter7 = Chapter(
        user_id = 3,
        book_id = 5,
        title = "Ground to Dust"
    )
    
    chapter8 = Chapter(
        user_id = 3,
        book_id = 5,
        title = "Unfermented Stagnation"
    )
    
    chapter9 = Chapter(
        user_id = 3,
        book_id = 5,
        title = "Dead Soil"
    )
    
    db.session.add(chapter1)
    db.session.add(chapter2)
    db.session.add(chapter3)
    db.session.add(chapter4)
    db.session.add(chapter5)
    db.session.add(chapter6)
    db.session.add(chapter7)
    db.session.add(chapter8)
    db.session.add(chapter9)
    db.session.commit()
    

def undo_chapters():
    # if environment == "production":
    #     db.session.execute(f"TRUNCATE table {SCHEMA}.authors RESTART IDENTITY CASCADE;")
    # else:
    db.session.execute("DELETE FROM chapters")
        
    db.session.commit()    
    