from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from flask_login import current_user
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Book

class BookForm(FlaskForm):
    author_id = IntegerField('author_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    publish_date = IntegerField('publish_date', validators=[DataRequired()])