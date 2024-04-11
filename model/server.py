import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.impute import SimpleImputer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import hstack
from sklearn.preprocessing import MinMaxScaler
import pickle


df = pd.read_csv("anime_with_synopsis.csv")
df['Score'].fillna('Unknown', inplace=True)
df['Score'] = pd.to_numeric(df['Score'], errors='coerce')
imputer = SimpleImputer(strategy='median')
df['Score'] = imputer.fit_transform(df[['Score']])

scaler = MinMaxScaler()
numeric_scores_normalized = scaler.fit_transform(df['Score'].values.reshape(-1, 1))

synopsis_vectorizer = TfidfVectorizer(stop_words='english')
synopsis_matrix = synopsis_vectorizer.fit_transform(df['Synopsis'].fillna(''))

# Create a TF-IDF vectorizer for genres
genres_vectorizer = TfidfVectorizer(stop_words='english')
genres_matrix = genres_vectorizer.fit_transform(df['Genres'])

# Combine the TF-IDF matrices for synopses and genres
combined_matrix = hstack([synopsis_matrix, genres_matrix,numeric_scores_normalized])


# Calculate cosine similarity for combined features
combined_similarity = cosine_similarity(combined_matrix)

# Display the cosine similarity matrix for combined features
combined_similarity_df = pd.DataFrame(combined_similarity, index=df['Name'], columns=df['Name'])
# with open('combined_similarity.pkl', 'wb') as f:
    # pickle.dump(combined_similarity_df, f)

print("Cosine Similarity Matrix for Combined Features (Synopsis and Genres):")
print(combined_similarity_df.tail(10))

def recommend_anime(anime_name, similarity_matrix, df, num_recommendations=5):
    idx = df[df['Name'] == anime_name].index[0]
    sim_scores = list(enumerate(similarity_matrix[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:num_recommendations + 1]
    recommendations = [df['Name'][i[0]] for i in sim_scores]
    return recommendations

# Example usage
anime_name = 'Ninja Kamui'
recommendations = recommend_anime(anime_name, combined_similarity_df.values, df, num_recommendations=20)
print(f"Recommendations for {anime_name}: {recommendations}")