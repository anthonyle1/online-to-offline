#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <utility>

struct Genre {
    std::string name;
    long long lastPlayed; // long long to get time

    bool operator<(const Genre& other) const {
        return lastPlayed < other.lastPlayed;
    }
};

class MaxHeap {
    std::vector<Game> heap;

    void heapifyUp(int index) {
        while(index > 0 && heap[index] > heap[parent(index)]) {
            std::swap(heap[index], heap[parent(index)]);
            index = parent(index);
        }
    }

    void heapifyDown(int index) { // recursive heapifydown
        int left = 2 * index + 1;
        int right = 2* index + 2;
        int largest = index;

        if(left < heap.size() && heap[left] > heap[largest]) {
            largest = left;
        }
        if(right < heap.size() && heap[right] > heap[largest]) {
            largest = right;
        }
        if(largest != index) {
            std::swap(heap[index], heap[largest]);
            heapifyDown(largest);
        }
    }

public:
    void insert(Genre genre) {
        heap.push_back(genre);
        heapifyUp(heap.size() - 1);
    }

    Genre getMax() {
        if(heap.empty()) return;
        Genre max = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        heapifyDown(0);
        return max;
    }

    const std::vector<Genre>& getSortedGenres() {
        std::vector<Genre> sorted = heap;
        std::sort(sorted.begin(), sorted.end(), std::greater<Genre>());
        return sorted;
    }

    bool empty() const { return heap.empty(); }
};