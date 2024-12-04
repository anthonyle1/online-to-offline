#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>

using namespace std;

class UserInformation{
    private:
        struct Game{
            string gamename;
            unsigned int gameid;
            vector<string> genre;
            float timeplayed;
        };
        struct User{
            unsigned int userid;
            vector<Game> userlibrary; // user's game library
            unordered_map<string, float> timeplayedpergame; // map that tracks the time played per game
        };
        unordered_map<unsigned int, vector<unsigned int>> userbygame; // maps game id to vector of user ids
        unordered_map<unsigned int, User> users;
    public:

    void addUser(User& user){
        if (users.find(user.userid) != users.end()) {
            return;
        }
        users[user.userid] = user;

        for (const auto& game : user.userlibrary) {
            userbygame[game.gameid].push_back(user.userid);
        }
    }

    void reccommendUsersbyGame(unsigned int& gameid, unsigned int& userid){
        if (userbygame.find(gameid) == userbygame.end()) {
            return;
        }
        
        for (const auto& id : userbygame[gameid]) {
            if (id != userid) { // exclude's the current user we're using to find pairs for
                //test print
                cout << "user pairs with id: " << id << endl;
            }
        }
    }

    void reccommendUsersbyGenre(){
        unordered_set<unsigned int> userpairings;
        

    }

};