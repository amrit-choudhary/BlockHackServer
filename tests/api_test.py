import requests
import datetime
import random
import os
import time

os.environ['no_proxy'] = '127.0.0.1,localhost'

url = "https://minemonitor.herokuapp.com/api/save"
urlLocal = "http://127.0.0.1:3000/user/login"


def user_test():
    user_data = {
        'username': 'amrit',
        'password': 'pass'
    }
    return user_data


r = requests.post(url=urlLocal, data=user_test())
print(r.text)
