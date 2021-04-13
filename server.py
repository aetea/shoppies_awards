"""Shopify Frontend Internship Project: 
Single-Page Web App to search and nominate movies for Shoppies Awards.
"""

# import flask, jinja & session requirements
from flask import Flask, render_template, session, flash 

# initialise flask app
app = Flask(__name__)
app.secret_key = "temp-dev-skey"
# set secret key 

# ========= APP ROUTES ==========

# index
@app.route("/")
def index():
    """Return main page for Shoppies.""" 

    return render_template("index.html")

# search


# marquee? 

# ========== RUN APP ==========

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True) 