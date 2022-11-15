from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from flask_login import current_user
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Chapter

class ChapterForm(FlaskForm):
    # book_id = IntegerField('book_id', validators=[DataRequired])
    title = StringField('title', validators=[DataRequired()])
    