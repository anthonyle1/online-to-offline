from faker import Faker
import random
import json

fake = Faker()

# List of genres to randomize from
genres = [
    "Singleplayer", "Action", "Adventure", "Indie", "Multiplayer", "Story Rich", "Atmospheric", "RPG", "Simulation", "2D", "Strategy", "Casual", "Exploration", "3D", "First-Person", "Open World", "Fantasy", "Co-op", "Great Soundtrack", "Funny", "Third Person", "Colorful", "Anime", "Cute", "Female Protagonist", "Design & Illustration", "Utilities", "Free to Play", "Massively Multiplayer", "Early Access", "Racing", "Sports", "Video Production", "Photo Editing", "Animation & Modeling", "Audio Production", "Education", "Web Publishing", "Software Training", "Trains", "Music", "Platformer", "Metroidvania", "Dog", "Building", "Driving", "Tower Defense", "Hack and Slash", "Western", "GameMaker", "Satire", "Relaxing", "Zombies", "Survival", "FPS", "Puzzle", "Match 3", "Card Game", "Horror", "Moddable", "4X", "Superhero", "Aliens", "Typing", "RTS", "Turn-Based", "War", "Heist", "Pirates", "Stealth", "Ninja", "Classic", "Point & Click", "Crafting", "Tactical", "Surreal", "Psychedelic", "Roguelike", "Hex Grid", "MOBA", "Comedy", "Dungeon Crawler", "Psychological Horror", "Action RTS", "Sokoban", "Voxel", "Unforgiving", "Fast-Paced", "LEGO", "Hidden Object", "Turn-Based Strategy", "Fighting", "Basketball", "Comic Book", "Rhythm", "Skateboarding", "MMORPG", "Space", "Perma Death", "Board Game", "Arcade", "Shooter", "PvP", "Steampunk", "Based On A Novel", "Side Scroller", "Visual Novel", "Sandbox", "Real Time Tactics", "Third-Person Shooter", "Post-apocalyptic", "Local Co-Op", "Online Co-Op", "Lore-Rich", "Precision Platformer", "Competitive", "Old School", "Cooking", "Immersive", "Sci-fi", "Gothic", "Character Action Game", "Roguelite", "Pixel Graphics", "Epic", "Physics", "Survival Horror", "Historical", "Combat", "Retro", "Vampire", "Difficult", "Parkour", "Dragons", "Magic", "Thriller", "Minimalist", "Combat Racing", "Action-Adventure", "Cyberpunk", "Transhumanism", "Cinematic", "World War II", "Class-Based", "Beat 'em up", "Real-Time", "Military", "Medieval", "Realistic", "Chess", "Addictive", "Cartoony", "Trading", "Action RPG", "Short", "Loot", "Episodic", "Stylized", "Shoot 'Em Up", "Spaceships", "Futuristic", "Turn-Based Combat", "City Builder", "Dark", "Gore", "Grand Strategy", "Assassin", "Abstract", "JRPG", "CRPG", "Choose Your Own Adventure", "Co-op Campaign", "Farming", "Quick-Time Events", "Cartoon", "Alternate History", "Dark Fantasy", "Swordplay", "Top-Down Shooter", "Violent", "Wargame", "Economy", "Movie", "Replay Value", "2D Fighter", "Character Customization", "Politics", "Twin Stick Shooter", "Spectacle fighter", "Top-Down", "Mechs", "6DOF", "4 Player Local", "Capitalism", "Political", "Parody", "Bullet Hell", "Romance", "2.5D", "Naval Combat", "Dystopian", "eSports", "Narration", "Procedural Generation", "Kickstarter", "Score Attack", "Dinosaurs", "Cold War", "Psychological", "Blood", "Sequel", "God Game", "Games Workshop", "Mod", "Family Friendly", "Destruction", "Conspiracy", "2D Platformer", "World War I", "Time Attack", "3D Platformer", "Benchmark", "Beautiful", "Programming", "Hacking", "Puzzle Platformer", "Arena Shooter", "RPGMaker", "Emotional", "Mature", "Detective", "Collectathon", "Modern", "Remake", "Team-Based", "Mystery", "Baseball", "Robots", "Gun Customization", "Science", "Bullet Time", "Isometric", "Walking Simulator", "Tennis", "Dark Humor", "Reboot", "Mining", "Drama", "Horses", "Noir", "Logic", "Birds", "Inventory Management", "Diplomacy", "Crime", "Choices Matter", "3D Fighter", "Pinball", "Time Manipulation", "Nudity", "1990's", "Mars", "PvE", "Hand-drawn", "Nonlinear", "Naval", "Martial Arts", "Rome", "Multiple Endings", "Golf", "Real-Time with Pause", "Party", "Crowdfunded", "Party Game", "Linear", "Skiing", "Bowling", "Base Building", "Local Multiplayer", "Sniper", "Lovecraftian", "Illuminati", "Controller", "Dice", "Grid-Based Movement", "Offroad", "Narrative", "1980s", "Cult Classic", "Dwarf", "Artificial Intelligence", "Soundtrack", "Software", "TrackIR", "Minigames", "Level Editor", "Music-Based Procedural Generation", "Investigation", "Well-Written", "Runner", "Resource Management", "Hentai", "Underwater", "Immersive Sim", "Trading Card Game", "Demons", "Dating Sim", "Hunting", "Dynamic Narration", "Snow", "Experience", "Life Sim", "Transportation", "Memes", "Trivia", "Time Travel", "Party-Based RPG", "Supernatural", "Split Screen", "Interactive Fiction", "Boss Rush", "Vehicular Combat", "Mouse only", "Villain Protagonist", "Vikings", "Tutorial", "Sexual Content", "Boxing", "Warhammer 40K", "Management", "Solitaire", "America", "Tanks", "Archery", "Sailing", "Experimental", "Game Development", "Turn-Based Tactics", "Dungeons & Dragons", "Nostalgia", "Intentionally Awkward Controls", "Flight", "Conversation", "Philosophical", "Documentary", "Fishing", "Motocross", "Silent Protagonist", "Mythology", "Gambling", "Space Sim", "Time Management", "Werewolves", "Strategy RPG", "Lemmings", "Tabletop", "Asynchronous Multiplayer", "Cats", "Pool", "FMV", "Cycling", "Submarine", "Dark Comedy", "Underground", "Tactical RPG", "VR", "Agriculture", "Mini Golf", "Word Game", "NSFW", "Touch-Friendly", "Political Sim", "Voice Control", "Snowboarding", "3D Vision", "Souls-like", "Ambient", "Nature", "Fox", "Text-Based", "Otome", "Deckbuilding", "Mahjong", "Job Simulator", "Jump Scare", "Coding", "Action Roguelike", "LGBTQ+", "Wrestling", "Rugby", "Foreign", "On-Rails Shooter", "Electronic Music", "Spelling", "Farming Sim", "Shop Keeper", "Jet", "Skating", "Cozy", "Elf", "8-bit Music", "Bikes", "ATV", "Electronic", "Gaming", "Cricket", "Tile-Matching", "Battle Royale", "Faith", "Instrumental Music", "Mystery Dungeon", "Motorbike", "Colony Sim", "Feature Film", "BMX", "Automation", "Musou", "Hockey", "Rock Music", "Steam Machine", "Looter Shooter", "Snooker", "Clicker", "Traditional Roguelike", "Wholesome", "Hardware", "Idler", "Hero Shooter", "Social Deduction", "Escape Room", "360 Video", "Card Battler", "Volleyball", "Asymmetric VR", "Creature Collector", "Roguevania", "Boomer Shooter", "Auto Battler", "Roguelike Deckbuilder", "Outbreak Sim", "Automobile Sim", "Medical Sim", "Open World Survival Craft", "Extraction Shooter", "Hobby Sim", "Football (Soccer)", "Football (American)"

]

def generate_fake_steam_data(num_users=10000):
    data = []
    for _ in range(num_users):
        steam_id = fake.unique.random_number(digits=17, fix_len=True)  # Unique 17-digit Steam ID
        username = fake.user_name()

        # Randomly assign games to genres
        genre_counts = {genre: random.randint(1, 100) for genre in random.sample(genres, random.randint(5, 15))}

        data.append({
            "steam_id": str(steam_id),  # Steam ID stored as string for JSON compatibility
            "username": username,
            "genre_counts": genre_counts  # Number of games played per genre
        })

    return data

# Generate 10,000 fake users
fake_data = generate_fake_steam_data(10000)

# Save to JSON file
with open('fake_steam_data.json', 'w') as f:
    json.dump(fake_data, f, indent=4)

print("Fake data generated and saved!")