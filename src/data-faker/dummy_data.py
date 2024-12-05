from faker import Faker
import random
import json

fake = Faker()

# List of game titles and genres
game_titles = [
    "Counter-Strike", "Dota 2", "Cyberpunk 2077", "Elden Ring",
    "Stardew Valley", "Apex Legends", "Fortnite", "Minecraft",
    "Baldur's Gate 3", "The Sims 4", "Phasmophobia", "Slime Rancher",
    "Pico Park", "Diablo 4", "Final Fantasy VII"
]

genres = [
    "Action", "Adventure", "RPG", "Shooter",
    "Simulation", "Strategy", "Sports", "Horror",
    "Casual", "Multiplayer Online Battle Arena (MOBA)"
]

def generate_fake_steam_data(num_users=500):
    data = []
    for _ in range(num_users):
        username = fake.user_name()
        recent_games = [{"name": random.choice(game_titles), "playtime_hours": random.randint(1, 50)} for _ in range(10)]
        most_played_genres = [{"genre": random.choice(genres), "playtime_hours": random.randint(100, 1000)} for _ in range(5)]

        data.append({
            "username": username,
            "recent_games": recent_games,
            "most_played_genres": most_played_genres  # Changed from games to genres
        })

    return data

# Generate 500 fake users
fake_data = generate_fake_steam_data(500)

with open('fake_steam_data.json', 'w') as f:
    json.dump(fake_data, f, indent=4)

print("Fake data generated and saved!")
