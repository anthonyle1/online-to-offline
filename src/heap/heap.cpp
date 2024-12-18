#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <utility>
#include "httplib.h"
#include "json.hpp"

struct Genre {
    std::string name;
    long long lastPlayed; // long long to get time

    bool operator<(const Genre& other) const {
        return lastPlayed < other.lastPlayed;
    }

    bool operator>(const Genre& other) const {
        return lastPlayed > other.lastPlayed;
    }
};

class MaxHeap {
    std::vector<Genre> heap;

    int parent(int index) const {
        return (index - 1) / 2;
    }

    void heapifyUp(int index) {
        while (index > 0 && heap[index] > heap[parent(index)]) {
            std::swap(heap[index], heap[parent(index)]);
            index = parent(index);
        }
    }

    void heapifyDown(int index) {
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        int largest = index;

        if (left < heap.size() && heap[left] > heap[largest]) {
            largest = left;
        }
        if (right < heap.size() && heap[right] > heap[largest]) {
            largest = right;
        }
        if (largest != index) {
            std::swap(heap[index], heap[largest]);
            heapifyDown(largest);
        }
    }

public:
    void insert(const Genre& genre) {
        heap.push_back(genre);
        heapifyUp(heap.size() - 1);
    }

    std::vector<Genre> getSortedGenres() {
        std::vector<Genre> sorted = heap;
        std::sort(sorted.begin(), sorted.end(), std::greater<Genre>());
        return sorted;
    }

    bool empty() const { return heap.empty(); }
};

class MinHeap {
    std::vector<Genre> heap;

    int parent(int index) const {
        return (index - 1) / 2;
    }

    void heapifyUp(int index) {
        while (index > 0 && heap[index] < heap[parent(index)]) {
            std::swap(heap[index], heap[parent(index)]);
            index = parent(index);
        }
    }

    void heapifyDown(int index) {
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        int smallest = index;

        if (left < heap.size() && heap[left] < heap[smallest]) {
            smallest = left;
        }
        if (right < heap.size() && heap[right] < heap[smallest]) {
            smallest = right;
        }
        if (smallest != index) {
            std::swap(heap[index], heap[smallest]);
            heapifyDown(smallest);
        }
    }

public:
    void insert(const Genre& genre) {
        heap.push_back(genre);
        heapifyUp(heap.size() - 1);
    }

    std::vector<Genre> getSortedGenres() {
        std::vector<Genre> sorted = heap;
        std::sort(sorted.begin(), sorted.end()); // Ascending order
        return sorted;
    }

    bool empty() const { return heap.empty(); }
};

// Global data
// MaxHeap genreHeap;
MinHeap genreHeap;
std::vector<std::string> recentlyPlayedGames = {"Game1", "Game2", "Game3"};
std::vector<std::string> userPairings = {"User1", "User2", "User3"};

// Implement the functions
std::vector<Genre> getSortedGenres() {
    return genreHeap.getSortedGenres();
}

std::vector<std::string> getRecentlyPlayed() {
    return recentlyPlayedGames;
}

std::vector<std::string> getPairings() {
    return userPairings;
}

int main() {
    // Insert some mock data into the MaxHeap
    genreHeap.insert({"RPG", 1625533220});
    genreHeap.insert({"Adventure", 1625536820});
    genreHeap.insert({"Puzzle", 1625529020});

    httplib::Server server;

    // Endpoint to get sorted genres
    server.Get("/api/genres", [](const httplib::Request&, httplib::Response& res) {
        auto sortedGenres = getSortedGenres(); // Get the sorted genres from the MinHeap
        nlohmann::json genresJson = nlohmann::json::array();

        // Convert the sorted genres to JSON
        for (const auto& genre : sortedGenres) {
            genresJson.push_back({{"name", genre.name}, {"lastPlayed", genre.lastPlayed}});
        }

        // Create and send the response
        nlohmann::json response = {{"genres", genresJson}};
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_content(response.dump(), "application/json");
});

server.Get("/api/recently-played", [](const httplib::Request&, httplib::Response& res) {
        nlohmann::json response = {
            {"recentlyPlayed", recentlyPlayedGames}
        };
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_content(response.dump(), "application/json");
    });


server.Get("/api/pairings", [](const httplib::Request&, httplib::Response& res) {
        nlohmann::json response = {
            {"pairings", userPairings}
        };
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_content(response.dump(), "application/json");
    });


    // Start the server
    std::cout << "Server running at http://localhost:8080" << std::endl;
    server.listen("0.0.0.0", 8080);

    return 0;
}
