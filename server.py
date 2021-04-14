"""Shopify Frontend Internship Project: 
Single-Page Web App to search and nominate movies for Shoppies Awards.
"""

# import flask, jinja & session requirements
from flask import Flask, render_template, make_response, request, session, flash 
import os, requests, pprint

# initialise flask app
app = Flask(__name__)
app.secret_key = "temp-dev-skey"

OMDB_KEY = os.environ["OMDB_KEY"]


# ========= APP ROUTES ==========

# index
@app.route("/")
def index():
    """Return main page for Shoppies.""" 

    # session.clear() 
    nom_movies = {}
    
    # if session has noms, get nominated movie info 
    if session.get("noms") != None:
        print("found previous nominations")

        for movie_id in session["noms"]:
            api_resp = requests.get(f"http://www.omdbapi.com/?apikey={OMDB_KEY}"\
            f"&i={movie_id}") 
            api_dict = api_resp.json()
            nom_movies[movie_id] = {
                "title": api_dict["Title"],
                "year": api_dict["Year"]
            }

        pprint.pprint(nom_movies) 

    return render_template("index.html", nom_movies=nom_movies)


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


@app.route("/nominate")
def add_nomination():
    """Add a movie to the nomination list."""

    movie_id = request.args.get("movie_id")
    print("******** adding nomination to session[noms]:")
    print(session.get("noms"))

    if session.get("noms") == None:
        session["noms"] = [movie_id]

    elif len(session.get("noms")) == 5:
        return "full"
    
    else:
        session["noms"].append(movie_id)
        session.modified = True     
        # * needed bec changes on mutable structures not auto picked up 
        print(f"session noms is now {session['noms']}")

    status = str(len(session.get("noms")))
    
    return status


@app.route("/remove-nom")
def remove_nomination():
    """Remove movie from nomination list."""

    movie_id = request.args.get("movie_id")
    print(f"******** removing {movie_id} from this list:")
    print(session.get("noms"))

    session["noms"].remove(movie_id)
    session.modified = True  

    status = str(len(session.get("noms")))

    return status



# ========== RUN APP ==========

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True) 