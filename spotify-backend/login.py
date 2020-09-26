from fastapi import FastAPI
import requests
from pprint import pprint
import webbrowser
import time
from fastapi.responses import RedirectResponse, JSONResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from config import client_id, Authorization_key, scopes
import threading
value = {}
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
    #driver =webdriver.Firefox()
    print("In login function")
    val = webbrowser.open(
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
        global value
        value= val.json()
            # return RedirectResponse("http://localhost:3000")
        return JSONResponse(val.json())
        # else:
            # login_user()


@app.get("/data")
def get_data():

    # print("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    logged_in()
    global value
    while (value==""):
        print("not yet")
    
    return value

@app.get("/likedsongs")
def get_liked():
    details=[]
    #print("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",f"Bearer { globals()['value']['access_token'] }")
    print("slkjhdlksjdklsjdlkjdlksjdlkd",globals()['value'])
    header={"Authorization":f"Bearer { value['access_token'] }"}
    url='https://api.spotify.com/v1/me/tracks'
    val=requests.get(url,headers=header)
    print(val.json())
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

@app.get('/recentlyplayed')
def get_recently():
    details=[]
    global value
    header={"Authorization": f"Bearer {value['access_token']}"}
    url='https://api.spotify.com/v1/me/player/recently-played'
    val=requests.get(url,headers=header)

    # for i in val.json()['items']:
    #     print(i['track']['name'])
    #     data={
    #         "images":{  'small':i['track']['album']['images'][2]['url'],
    #                     'medium':i['track']['album']['images'][1]['url'],
    #                     'large':i['track']['album']['images'][0]['url']},
    #         "trackname":i['track']['name'],
    #         "artists":i['track']['artists'],

                        
    #     }

    #     details.append(data)



    return val.json()


@app.get('/refreshToken')
def refresh_token():
    global value
    threading.Timer(3600.0, test).start() 
    header = {"Authorization": f"Basic {Authorization_key}"}
    url = "https://accounts.spotify.com/api/token"
    data = {
                "grant_type": "refresh_token",
                "refresh_token":value['refresh_token'] ,
                "client_id": client_id,
            }
    val = requests.post(url, data=data, headers=header)

    print("++++++++++++++++++++++++++++++++++++++++")
    pprint(val.json())
    value=val.json()
    return value

@app.get('/test')
def lol():
    threading.Timer(60.0, lol).start() 
    print("hi")

    

@app.get('/search')
def getsearchresults(name: str):
    header={"Authorization": f"Bearer {value['access_token']}"}
    url='https://api.spotify.com/v1/search?q=raghudixit&type=artist,album,artist,playlist,track,show,episode'
    val=requests.get(url,headers=header)

    # for i in val.json():



    return val.json()

