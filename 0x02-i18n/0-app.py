#!/usr/bin/env python3
"""
Creates a single / route that outputs
“Welcome to Holberton” as page title (<title>)
and “Hello world” as header (<h1>).
"""
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    """
    Route that returns
    “Welcome to Holberton” as page title (<title>)
    and “Hello world” as header (<h1>).
    """
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
