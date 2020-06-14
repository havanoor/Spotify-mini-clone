import requests
from config import client_id, Authorization_key, scopes
session=requests.session()
import json
from pprint import pprint
from requests.auth import HTTPBasicAuth
response=requests.get(
     "https://accounts.spotify.com/authorize"
        + "?response_type=code"
        + "&client_id="
        + client_id
        + "&scope="
        + scopes
        + "&redirect_uri=http://localhost:8000/logged"
        + "&login_dialog=true",auth=HTTPBasicAuth('havanoor@gmail.com','Hrishih2spotify')
)


print(response)
#val=response.content.decode('utf-8')

#pprint(val)