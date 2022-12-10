from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from flask_login import current_user
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Author

def valid_first_name(form, field):
    # check if first name is valid submit
    first_name = field.data
    if(first_name.strip() == ''or first_name is None):
        raise ValidationError('Invalid first name.')
    
def valid_last_name(form, field):
    # check if last name is valid submit
    last_name = field.data
    if(last_name.strip() == ''or last_name is None):
        raise ValidationError('Invalid last name.')
    
def valid_pen_name(form, field):
    # check if pen name is valid submit
    pen_name = field.data
    if(pen_name.strip() == ''or pen_name is None):
        raise ValidationError('Invalid pen name.')
    

# DataRequired() put on front end form

class AuthorForm(FlaskForm):
    first_name = StringField('first_name', validators=[valid_first_name])
    last_name = StringField('last_name', validators=[valid_last_name])
    pen_name = StringField('pen_name', validators=[valid_pen_name])
    email = StringField('email', validators=[DataRequired()])
    