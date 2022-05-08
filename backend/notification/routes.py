from flask import request, jsonify
from notification import app, db, ma
from notification.models import User, ImagePost, UserSchema, ImagePostSchema, LikeNotificationSchema, LikeNotification

@app.route('/post', methods=['GET', 'POST'])
def post():
    if request.method == 'POST':
        data = request.get_json(force=True)
        user_id = data['user_id']
        image_url = data['image_url']
        title = data['title']
        post = ImagePost(image_url=image_url, title=title, user_id= user_id)
        db.session.add(post)
        db.session.commit()
        return jsonify({'message': 'Post created successfully'})
    if request.method == 'GET':
        images = ImagePost.query.all()
        print(images[0].liked_by_users)
        image_schema = ImagePostSchema()
        all_images = image_schema.dump(images, many=True)
        response = jsonify({"posts": all_images})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@app.route("/like", methods=['POST', 'DELETE'])
def like():
    if request.method == 'POST':
        data = request.get_json(force=True)
        user_id = data['user_id']
        post_id = data['post_id']
        image_post = ImagePost.query.filter_by(id=post_id).first()
        like = LikeNotification(user_id=user_id, post_id=post_id, like=image_post)
        db.session.add(like)
        db.session.commit()
        return jsonify({'message': 'Post liked successfully'})
    if request.method == 'DELETE':
        data = request.get_json(force=True)
        like_id = data['like_id']
        LikeNotification.query.filter_by(id=like_id).delete()
        db.session.commit()
        return jsonify({'message': 'Post disliked successfully'})



@app.route("/login", methods=['POST'])
def login():
    data = request.get_json(force=True)
    email = data['email']
    currentUser = User.query.filter_by(email=email).first()
    if(currentUser):
        user_schema = UserSchema()
        user = user_schema.dump(currentUser)
        response = jsonify({"user": user})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        user = User(email=email)
        db.session.add(user)
        db.session.commit()
        user_schema = UserSchema()
        currentUser = User.query.filter_by(email=email).first()
        user = user_schema.dump(currentUser)
        response = jsonify({"user": user})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
