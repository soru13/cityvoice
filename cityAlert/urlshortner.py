#!/usr/bin/env python

# Import the modules

import bitly_api
import sys

# Define your API information

API_USER = "o_7q5a74mg3n"
API_KEY = "R_e59dd3a53bb944bf9975b253cc6d3b15"

b = bitly_api.BitLy(API_USER, API_KEY)

# Define how to use the program

usage = """Usage: python shortener.py [url]
e.g python shortener.py http://www.google.com"""

if len(sys.argv) != 2:
    print usage
    sys.exit(0)

longurl = sys.argv[1]

response = b.shorten(longUrl=longurl)

print response['url']