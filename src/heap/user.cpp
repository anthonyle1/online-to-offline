#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>

using namespace std;

class UserInformation{
    public:
        struct Game{
                string gamename;
                unsigned int gameid;
                vector<string> genre;
                float timeplayed;

                Game(string& name, unsigned int& id, vector<string>& gen, const float& time){
                    gamename = name;
                    gameid = id;
                    genre = gen;
                    timeplayed = time;
                }
            };
            struct User{    
                unsigned int userid;
                vector<Game> userlibrary; // user's game library
                unordered_map<unsigned int, float> timeplayedpergame; // map that tracks the time played per game

                User(){
                    userid = 0;
                }

                User(unsigned int& id,  vector<Game>& library,  unordered_map<unsigned int, float>& timeplayed){
                    userid = id;
                    userlibrary = library;
                    timeplayedpergame = timeplayed;
                }
            };
        private:
        
        unordered_map<unsigned int, vector<unsigned int>> userbygame; // maps game id to vector of user ids
        unordered_map<unsigned int, User> users;
    public:

    void addUser(User& user){
        if (users.find(user.userid) != users.end()) {
            return;
        }
        users[user.userid] = user;

        for (auto& game : user.userlibrary) {
            userbygame[game.gameid].push_back(user.userid);
        }
    }
    
    void recommendUsersByGenre(string& genre, unsigned int& userid){
        unordered_set<unsigned int> userpairings;
        for(auto& [id, user] : users){
            if(id == userid) continue;
            for(auto& game: user.userlibrary){
                if(find(game.genre.begin(), game.genre.end(), genre) != game.genre.end()){
                    userpairings.insert(id);
                    break;
                }
            }
        }
        
        if(userpairings.empty()){
            return;
        }

    }
};
