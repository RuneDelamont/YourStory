from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Chapter(db.Model):
    __tablename__ = 'chapters'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    __mapper_args__ = {
        'polymorphic_identity': 'chapters',
        'with_polymorphic': '*'
    }
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    author_id = db.Column(db.Integer, nullable=False)
    book_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(55), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'author_id': self.author_id,
            'book_id': self.book_id,
            'title': self.title,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }