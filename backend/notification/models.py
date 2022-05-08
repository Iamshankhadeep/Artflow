from datetime import datetime
from notification import db, ma

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f"User('{self.email}')"


class ImagePost(db.Model):
    __tablename__ = 'image_post'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    image_url = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    liked_by_users = db.relationship('LikeNotification', backref='like')

    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"

class LikeNotification(db.Model):
    __tablename__ = 'like_notification'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('image_post.id'), nullable=False)

    def __repr__(self):
        return f"Like('{self.user_id}', '{self.post_id}')"


class LikeNotificationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LikeNotification
    
    id = ma.auto_field()
    user_id = ma.auto_field()
    post_id = ma.auto_field()

class ImagePostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ImagePost
        load_instance = True
        include_fk = True
    
    id = ma.auto_field()
    title = ma.auto_field()
    date_posted = ma.auto_field()
    image_url = ma.auto_field()
    user_id = ma.auto_field()
    liked_by_users = ma.Nested(LikeNotificationSchema, many=True)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_fk = True

    id = ma.auto_field()
    email = ma.auto_field()
