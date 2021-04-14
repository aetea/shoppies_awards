# Overview

Pick your top 5 movies for the Shoppies Awards! 

# Features

* Search OMDB for movies and nominate 5 favourites for the Shoppies Awards
* Nominated movies will not be renominated 
* Nominations can be removed if you change your mind
* When 5 movies have been nominated, an alert is shown
* Nominated movies persist even after navigating away from the page 

**Tech Stack** Javascript, jQuery, Bootstrap, Python, Flask, Jinja 


# Installation 

### 🔑 Prep
Obtain an API key from OMDB.com
Place it in a file called secrets.sh
    ```export OMDB_KEY="your_key"```
Set the global variable by running in your terminal (only needed once per terminal)
    ```$ source secrets.sh```

## Setup Instructions

1. Fork/clone this repository 
2. Create and activate a virtual environment 
    ```
    $ virtualenv env
    $ source env/bin/activate
    ```

3. Install dependencies 

    ```$ pip3 install -r requirements.txt```

4. Run the app 

    ```$ python3 server.py```

5. Go to localhost:5000 in your browser and browse away!