#include <iostream>
#include <fstream>
#include <ostream>
#include <vector>
#include "json.hpp"
#include <unordered_map>
#include <chrono>
#include <algorithm>
using json = nlohmann::json;
using namespace std;

/*
 * read_games reads the json file and translate the games.json database to two c++ unordered maps.
 * return values:
 * game_genres : int -> appid (steam), vector<string> -> game generes associated with game
 * games: int -> appid (steam), string -> name of game
 * to access, do pair.first and pair.second
 */

struct Game {
    int appid;
    string name;
    int time_played;
    vector<string> genres;

    NLOHMANN_DEFINE_TYPE_INTRUSIVE(Game, appid, name, time_played, genres)
};

struct User{
    int userid;
    vector<int> gameIDs;
    unordered_map<string, int> genreCounter;
}

vector<User> read_userdatabase(){
    std::ifstream file(filename);  
    if (!file.is_open())
        cerr << "file is not opened successfully" << endl;
    json js = json::parse(file);
}

unordered_map<int, Game> read_user(string filename) {          // O(n * m), n = number of games, m = number of genres per game
                                                                 // ids are dependent on games, so we treat them as the same. 
    cout << "reading userlibrary.json" << endl;
    unordered_map<int, Game> games;

    std::ifstream file(filename); //  
    if (!file.is_open())
        cerr << "file is not opened successfully" << endl;
    json js = json::parse(file);
    for (auto& j: js) {                     
        Game game = j.get<Game>();
        games[game.appid] = game;
    }

    return games;
}

unordered_map<string, int> count_genres(vector<int> ids, unordered_map<int, Game> games){
    unordered_map<string, int> genreCounter;
    for (auto& i: ids) {
        if (games.find(i) == games.end())
            continue;
        for (auto& g: games[i].genres)
            genreCounter[g]++;
    }
    return genreCounter;
}

vector<User> top_users_by_genres(vector<User> users, unordered_map<string, int> input_genres){
    vector<pair<User, int>> compatibility;
    vector<User> r;
    for (auto& u: users){
        // calculate score
        int total = 0;
        for (auto& g: input_genres){
            if (u.genreCounter.find(g.first) == u.genreCounter.end())
                continue;
            if (u.genreCounter[g.first] >= input_genres[g.first])
                total += input_genres[g.first];
            else:
                total += u.genreCounter[g.first];
        }
        compatibility.push_back({u, total});
    }
}

pair<unordered_map<int, string>, unordered_map<int, vector<string>>> read_games() {
    // https://stackoverflow.com/questions/14391327/how-to-get-duration-as-int-millis-and-float-seconds-from-chrono
    // https://stackoverflow.com/questions/33628250/c-reading-a-json-object-from-file-with-nlohmann-json
    // https://json.nlohmann.me/features/iterators/#access-object-key-during-iteration

    cout << "reading games.json";
    auto start = chrono::system_clock::now();
    unordered_map<int, string> games;
    unordered_map<int, vector<string>> game_genres;
    std::ifstream file("games.json"); //  TODO: FIX LOCATION OF games.json
    json js = json::parse(file);
    int i = 2; // TODO: delete this.... just for testing to run for i games
    for (auto& [game_id, game_details] : js.items()) {
        games[stoi(game_id)] = (string)game_details["name"];
        for(auto& [tag, value]: game_details["tags"].items())
            game_genres[stoi(game_id)].push_back(tag);
       
    }

    auto end = chrono::system_clock::now();
    auto total = std::chrono::duration_cast<std::chrono::seconds>(end-start);
    cout << total.count();
    file.close();
    // ### print games + their respective genres (very big file so don't do this) ###
    //    for (auto& a: game_genres){
//        cout << names[a.first] << " ";
//        for (auto& b: a.second){
//            cout << b << " ";
//        }
//        cout << endl;
//    }
    return {games, game_genres};
}

// sample useage:
// int main(){
//     unordered_map<int, Game> usersgames = read_user("C:\\Users\\mjtad\\O2O\\online-to-offline\\src\\pages\\api\\userlibrary.json");
//     for (auto& a: count_genres({4000}, usersgames))
//         cout << a.first << " " << a.second << endl;
// }
