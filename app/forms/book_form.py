from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from flask_login import current_user
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Book

def valid_name(form, field):
    # check name field
    name = field.data
    if(name.strip() == '' or name is None):
        raise ValidationError('Invalid Name')

# DataRequired() for name on front end

class BookForm(FlaskForm):
    author_id = IntegerField('author_id', validators=[DataRequired()])
    name = StringField('name', validators=[valid_name])
    publish_date = IntegerField('publish_date', validators=[DataRequired()])