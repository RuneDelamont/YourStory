from app.models import db, Author, Book, environment
# , SCHEMA

def seed_books():
    
    book1 = Book(
        user_id = 1,
        author_id = 1,
        name = "Demo's Book",
        publish_date = 1984
    )
    
    book2 = Book(
        user_id = 1,
        author_id = 1,
        name = "Oh Your Seed",
        publish_date = 1975
    )
    
    book3 = Book(
        user_id = 2,
        author_id = 2,
        name = "Facebook Feelings",
        publish_date = 1999
    )
    
    book4 = Book(
        user_id = 2,
        author_id = 2,
        name = "Why did I write so many seeders",
        publish_date = 2008
    )
    
    book5 = Book(
        user_id = 3,
        author_id = 3,
        name = "The Demise of the Seeders",
        publish_date = 2022
    )
    
    db.session.add(book1)
    db.session.add(book2)
    db.session.add(book3)
    db.session.add(book4)
    db.session.add(book5)
    db.session.commit()
    
    
def undo_books():
    # if environment == "production":
    #     db.session.execute(f"TRUNCATE table {SCHEMA}.authors RESTART IDENTITY CASCADE;")
    # else:
    db.session.execute("DELETE FROM books")
        
    db.session.commit()    
    
    