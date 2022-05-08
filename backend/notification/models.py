from datetime import datetime
import email
from notification import db, ma

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    posts = db.relationship('ImagePost', backref='author')

    def __repr__(self):
        return f"User('{self.email}')"


class ImagePost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    image_url = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"
class ImagePostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ImagePost
        include_fk = True

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_fk = True

    id = ma.auto_field()
    email = ma.auto_field()
    posts = ma.Nested(ImagePostSchema)
