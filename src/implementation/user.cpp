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
            unsigned int steamgameid;
            string primary_genre; // primary genre
            string secondary_genre; //secondary genre if any
            float timeplayed;
        };
        struct User{
            string username;
            unsigned int userid;
            vector<Game> userlibrary; // user's game library
            unordered_set<string> recentgenres;
            unordered_map<string, float> timeplayedpergame; // map that tracks the time played per game
            unordered_set<string, float> timeplayedpergenre; // map that tracks the time played per genre
        };

        unordered_map<string, vector<unsigned int>> userbygenre;
        unordered_map<string, vector<unsigned int>> userbygame;
    public:

};