from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from flask_login import current_user
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Page


class PageForm(FlaskForm):
    page_words = StringField('page_words', validators=[DataRequired()])