from faker import Faker
import random
import json

fake = Faker()

def generate_fake_steam_data(num_users=10000):
    data = []
    for _ in range(num_users):
        steam_id = fake.unique.random_number(digits=17, fix_len=True)  # Generate a unique 17-digit Steam ID
        username = fake.user_name()
        recent_games = [{"game_id": f"game_{random.randint(1, 1000)}"} for _ in range(10)]  # No playtime

        data.append({
            "steam_id": str(steam_id),  # Store as a string for JSON compatibility
            "username": username,
            "recent_games": recent_games
        })

    return data

# Generate 10,000 fake users
fake_data = generate_fake_steam_data(10000)

# Save to JSON file
with open('fake_steam_data.json', 'w') as f:
    json.dump(fake_data, f, indent=4)

print("Fake data generated and saved!")
