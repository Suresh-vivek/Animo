from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import csv
import os

app = Flask(__name__)
CORS(app,resources={r"/*": {"origins": "*"}})
# Define endpoint to receive malId
@app.route('/fetch-anime', methods=['POST'])
def fetch_anime():
    anime_info = request.json.get('animeInfo')
    mal_id = anime_info.get('mal_id')
 
    # Check if malId already exists in CSV
    if check_mal_id_exists(mal_id):
        return jsonify({"message": "Anime with given malId already exists"}), 400

    try:
        # Fetch anime data from Jikan API
        anime_data = fetch_anime_data(mal_id)
        print("fetched")
        print(anime_data)

        # Transform fetched data
        transformed_data = transform_data(anime_data)
        print("transformed")
       

        # Load transformed data into CSV
        load_into_csv(transformed_data)
        print("loaded")

        return jsonify({"message": "Anime data fetched, transformed, and loaded into CSV"}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "Internal server error"}), 500

# Function to check if malId exists in CSV
def check_mal_id_exists(mal_id):
    if not os.path.exists('anime_with_synopsis.csv'):
        return False

    with open('anime_with_synopsis.csv', 'r',encoding='utf-8') as csv_file:
        csv_reader = csv.reader(csv_file)
        for row in csv_reader:
            if row and row[0] == str(mal_id):
                return True
    return False

# Function to fetch anime data from Jikan API
def fetch_anime_data(mal_id):
    response = requests.get(f'https://api.jikan.moe/v4/anime/{mal_id}/full')
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception("Failed to fetch anime data")

# Function to transform fetched data
def transform_data(anime_data):
    # Extracting data from the provided JSON
    mal_id = anime_data['data']['mal_id']
    title = anime_data['data']['title']
    score = anime_data['data']['score']
    genres = ", ".join(genre['name'] for genre in anime_data['data']['genres'])
    synopsis = anime_data['data']['synopsis']

    # Creating a dictionary with the transformed data
    transformed_data = {
        "MAL_ID": mal_id,
        "Name": title,
        "Score": score,
        "Genres": genres,
        "Synopsis": synopsis
    }
    return transformed_data
# Function to load transformed data into CSV
def load_into_csv(data):
    fieldnames = ["MAL_ID", "Name", "Score", "Genres", "Synopsis"]
    with open('anime_with_synopsis.csv', 'a', newline='',encoding='utf-8') as csv_file:
        csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        if csv_file.tell() == 0:
            csv_writer.writeheader()
        csv_writer.writerow(data)

if __name__ == '__main__':
    app.run(debug=True,port=8000)
