import requests

url = "https://api.themoviedb.org/3/authentication"

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmRhMTY4ZjhlOTU3Y2MzMTQzMjc4YmY2Y2Q2ZmFkNCIsInN1YiI6IjY1YmQyYzQ0MmI4YTQzMDE3YjFlMjRhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x6dAuisvHaKWMvWNUJSWjOBYqepnxHi9UNN5DmItiYs"
}

response = requests.get(url, headers=headers)

print(response.text)