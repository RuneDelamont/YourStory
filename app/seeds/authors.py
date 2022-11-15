from app.models import db, Author, environment
# , SCHEMA


def seed_authors():
    Demo = Author(
        user_id = 1,
        first_name = "Demo",
        last_name = "User",
        pen_name = "Demo User",
        email = "demo@aa.io"
    )
    
    Marnie = Author(
        user_id = 2,
        first_name ="Marnie",
        last_name = "Ross",
        pen_name = "Gabriella Spinstress",
        email = "marnie@aa.io"
    )
    
    Bobbie = Author(
        user_id = 3,
        first_name = "Bobbie",
        last_name = "Thompson",
        pen_name = "Robert Winthrop",
        email = "bobbie@aa.io"
    )
    
    db.session.add(Demo)
    db.session.add(Marnie)
    db.session.add(Bobbie)
    db.session.commit()
    
    
    
def undo_authors():
    # if environment == "production":
    #     db.session.execute(f"TRUNCATE table {SCHEMA}.authors RESTART IDENTITY CASCADE;")
    # else:
    
    db.session.execute("DELETE FROM authors")
    db.session.commit()
