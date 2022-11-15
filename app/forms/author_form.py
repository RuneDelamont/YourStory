from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from flask_login import current_user
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Author

class AuthorForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    pen_name = StringField('pen_name')
    email = StringField('email', validators=[DataRequired()])
    