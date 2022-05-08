from notification import db
from notification.models import User, ImagePost

db.create_all()
user = User(email="shankhadeepdey99@gmail.com")
db.session.add(user)
db.session.commit()