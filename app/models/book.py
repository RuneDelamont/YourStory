from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Book(db.Model):
    __tablename__ = 'books'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    __mapper_args__ = {
        'polymorphic_identity': 'books',
        'with_polymorphic': '*'
    }
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    author_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(55), nullable=False)
    publish_date = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'author_id': self.author_id,
            'name': self.name,
            'publish_date': self.publish_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }