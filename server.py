from flask import Flask, render_template, send_from_directory

app = Flask(__name__, template_folder='.')

# @app.route('/') 
@app.route('/<path:path>') #Everything else just goes by filename
def index(path):
    return render_template(path)