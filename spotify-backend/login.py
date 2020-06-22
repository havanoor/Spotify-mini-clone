from fastapi import FastAPI
import requests
from pprint import pprint
import webbrowser
import time
from fastapi.responses import RedirectResponse, JSONResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from config import client_id, Authorization_key, scopes
from selenium import webdriver
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
    driver =webdriver.Firefox()
    print("In login function")
    val = driver.get(
        "https://accounts.spotify.com/authorize"
        + "?response_type=code"
        + "&client_id="
        + client_id
        + "&scope="
        + scopes
        + "&redirect_uri=http://localhost:8000/logged"
        + "&login_dialog=true"
    )

    print(val, "IN LOGIN")

    return {"hi": "hihihihihihi"}


@app.get("/logged")
def logged_in(code: str = None, state: str = ""):
    print("hi", code)
    print("hi2", state)
    if code is None:
        print("Not logged in")
        login_user()
    
    else:
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
        # else:
            # login_user()


@app.get("/data")
def get_data():

    # print("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    logged_in()
    while (globals()["value"]==""):
        print("not yet")
    
    return value

@app.get("/recentlyplayed")
def get_recently():
    details=[]
    header={"Authorization":"Bearer BQDXZ8aE9FvYMR30sIUyE6uj8L4K1K46f3kszx64hnJcKfEmFcF_UQ4mRbQlf5AmiD1yYtUiCTPQWTaVidQAUGH3QsRlwqmmjbpH4RFQAnyjAWWeNsGRgA-v708fBcW0HsPKYnfwrt_T0bxFHojLM3XeJDsG6lxHKYw1qeFT9CBQiWGLDrp4GxIXXf0"}
    url='https://api.spotify.com/v1/me/tracks'
    val=requests.get(url,headers=header)

    for i in val.json()['items']:
        indi={
            "trackname":i['track']['name'],
            "artists":i['track']['artists'],
            "images":{  'small':i['track']['album']['images'][2]['url'],
                        'medium':i['track']['album']['images'][1]['url'],
                        'large':i['track']['album']['images'][0]['url']}
                        


        }
        details.append(indi)



    return details