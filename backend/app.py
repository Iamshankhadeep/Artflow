from flask_cors import CORS
from notification import app, socketio

if __name__ == '__main__':
    # app.run(debug=True,host='0.0.0.0', port=5002)
    socketio.run(app, debug=True, host='0.0.0.0', port=5002)