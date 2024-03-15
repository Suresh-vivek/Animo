import httpx

api_url = 'https://api.jikan.moe/v4/anime'

# Synchronous request using httpx.Client()
with httpx.Client() as client:
    response = client.get(api_url)
    if response.status_code == 200:
        top_anime_data = response.json()
        print(top_anime_data)
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")

