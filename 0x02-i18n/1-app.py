#!/usr/bin/env python3
"""
Create a Config class for my flask app
"""
from flask import Flask, render_template
from flask_Babel import Babel

class Config:
    """A Config class for my flask app"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = 'UTC'

app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)

@app.route('/')
def index():
    """"""
    return render_template('1-indexhtml')


if __name__ == '__main__':
    app.run(debug=True)