#include <iostream>
#include <fstream>
#include <ostream>
#include <vector>
#include "json.hpp"
#include <unordered_map>
#include <chrono>
using json = nlohmann::json;
using namespace std;



/*
 * read_games reads the json file and translate the games.json database to two c++ unordered maps.
 * return values:
 * game_genres : int -> appid (steam), vector<string> -> game generes associated with game
 * games: int -> appid (steam), string -> name of game
 * to access, do pair.first and pair.second
 */

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
        if (i > 0) {
            games[stoi(game_id)] = (string)game_details["name"];
            for(auto& [tag, value]: game_details["tags"].items())
                game_genres[stoi(game_id)].push_back(tag);
        } else {
            break;
        }
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
