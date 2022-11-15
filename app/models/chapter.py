from .db import db
import datetime

class Chapter(db.Model):
    __tablename__ = 'chapters'
    
    __mapper_args__ = {
        'polymorphic_identity': 'chapters',
        'with_polymorphic': '*'
    }
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    # author_id = db.Column(db.Integer)
    book_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(55), nullable=False)
    # num_pages = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            # 'author_id': self.author_id,
            'book_id': self.book_id,
            'title': self.title,
            # 'num_pages': self.num_pages,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }