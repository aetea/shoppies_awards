"""Shopify Frontend Internship Project: 
Single-Page Web App to search and nominate movies for Shoppies Awards.
"""

# import flask, jinja & session requirements
from flask import Flask, render_template, request, session, flash 
import os, requests

# initialise flask app
app = Flask(__name__)
app.secret_key = "temp-dev-skey"

OMDB_KEY = os.environ["OMDB_KEY"]


# ========= APP ROUTES ==========

# index
@app.route("/")
def index():
    """Return main page for Shoppies.""" 

    return render_template("index.html")


# search
@app.route("/search")
def title_search():
    """Search OMDB API using form input."""

    # get movie title from form 
    search_term = request.args.get("title-field")
    print(f"searching omdb for {search_term}")

    # send search request to omdb api 
    search_response = requests.get(f"http://www.omdbapi.com/?apikey={OMDB_KEY}"\
        f"&s={search_term}&type=movie")

    # turn response object into dict
    search_res_dict = search_response.json()

    return search_res_dict


# ========== RUN APP ==========

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True) 