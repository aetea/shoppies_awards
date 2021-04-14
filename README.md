# Overview

Pick your top 5 movies for the Shoppies Awards! 
View hosted version at [aetea.pythonanywhere.com](http://aetea.pythonanywhere.com/)

# Features

* Search OMDB for movies and nominate 5 favourites for the Shoppies Awards
* Movies can only be nominated once (no matter how much you love them)
* Nominations can be removed if you change your mind
* When 5 movies have been nominated, an alert is shown
* Nominated movies persist even after navigating away from the page 

**Tech Stack** Javascript, jQuery, Bootstrap, Python, Flask, Jinja 


# Installation 

### 🔑 Prep
1. Obtain an API key from OMDB.com
2. Place it in a file called secrets.sh

    ```
    export OMDB_KEY="your_key"
    export APP_KEY="secret_app_key"
    ```

3. Set the environment variable by running in terminal (only needed once per terminal)

    ```$ source secrets.sh```

4. Check server.py to make sure environment variable is being accessed with 
    ```SECRET_KEY = os.environ["SECRET_KEY"]```

*Or, if you are using python-dotenv*
2. Place API key in a file called .env
3. Set the environment variable by running in terminal 
    ```load_dotenv("~/project/.env")``` 

    see https://help.pythonanywhere.com/pages/environment-variables-for-web-apps/ 


## Setup Instructions

1. Fork/clone this repository 
2. Create and activate a virtual environment 
    ```
    $ virtualenv env
    $ source env/bin/activate
    ```

3. Install dependencies 

    ```$ pip3 install -r requirements.txt```

    3. a) Source secrets.sh or .env if not yet done for this shell

4. Run the app 

    ```$ python3 server.py```

5. Go to localhost:5000 in your browser and browse away!