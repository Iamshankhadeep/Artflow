from email.mime import image
import json
from urllib import response
from flask import render_template, url_for, flash, redirect, request, jsonify
from notification import app, db, ma
from notification.models import User, ImagePost, UserSchema, ImagePostSchema

@app.route('/post', methods=['GET', 'POST'])
def pots():
    if request.method == 'POST':
        data = request.get_json(force=True)
        user_id = data['user_id']
        image_url = data['image_url']
        title = data['title']
        currentUser = User.query.filter_by(id=user_id).first()
        post = ImagePost(author=currentUser, image_url=image_url, title=title)
        db.session.add(post)
        db.session.commit()
        return jsonify({'message': 'Post created successfully'})
    if request.method == 'GET':
        images = ImagePost.query.all()
        image_schema = ImagePostSchema(many=True)
        all_images = image_schema.dump(images)
        response = jsonify({"posts": all_images})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@app.route("/about")
def about():
    return "About page"


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
