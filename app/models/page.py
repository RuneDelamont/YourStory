from .db import db
import datetime

class Page(db.Model):
    __tablename__ = 'pages'
    
    __mapper_args__ = {
        'polymorphic_identity': 'pages',
        'with_polymorphic': '*'
    }
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    chapter_id = db.Column(db.Integer)
    page_words = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'chapter_id': self.chapter_id,
            'page_words': self.page_words,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }