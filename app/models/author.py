from .db import db
import datetime

class Author(db.Model):
    __tablename__ = 'authors'
    
    __mapper_args__ = {
        'polymorphic_identity': 'authors',
        'with_polymorphic': '*'
    }
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    first_name = db.Column(db.String(55), nullable=False)
    last_name = db.Column(db.String(55), nullable=False)
    pen_name = db.Column(db.String(55))
    email = db.Column(db.String(255), nullable=False)
    # num_books = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'pen_name': self.pen_name,
            'email': self.email,
            # 'num_books': self.num_books,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }