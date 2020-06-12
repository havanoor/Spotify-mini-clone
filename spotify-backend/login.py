from fastapi import FastAPI
import requests
from pprint import pprint
import webbrowser
import time
from fastapi.responses import RedirectResponse, JSONResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from config import client_id, Authorization_key, scopes

value = ""
origins = [
    "http://localhost:3000/login",
    "http://localhost:3000/logged",
    "http://localhost:3000/",
    # "http://localhost:8000/login",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/login")
def login_user():

    print("In login function")
    val = webbrowser.open(
        "https://accounts.spotify.com/authorize"
        + "?response_type=code"
        + "&client_id="
        + client_id
        + "&scope="
        + scopes
        + "&redirect_uri=http://localhost:8000/logged",
    )

    print(val, "IN LOGIN")

    # return {"hi": "hihihihihihi"}


@app.get("/logged")
def logged_in(code: str = None, state: str = ""):
    print("hi", code)
    print("hi2", state)
    if code:
        header = {"Authorization": f"Basic {Authorization_key}"}
        url = "https://accounts.spotify.com/api/token"
        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": "http://localhost:8000/logged",
        }
        val = requests.post(url, data=data, headers=header)

        print("++++++++++++++++++++++++++++++++++++++++")
        pprint(val.json())
        globals()["value"] = val.json()
        # return RedirectResponse("http://localhost:3000")
        return JSONResponse(val.json())
    else:
        login_user()


@app.get("/data")
def get_data():

    print("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    print(logged_in())
    time.sleep(2)
    return value
