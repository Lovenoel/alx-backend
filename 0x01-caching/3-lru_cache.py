#!/usr/bin/env python3
""" LRUCache module """
from base_caching import BaseCaching
from collections import OrderedDict


class LRUCache(BaseCaching):
    """ LRUCache is a caching system with an LRU eviction policy """

    def __init__(self):
        """ Initialize """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
        Adds an item to the cache and evicts the least recently
        used if over capacity
        """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.cache_data.move_to_end(key)
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                discarded_key, _ = self.cache_data.popitem(last=False)
                print(f"DISCARD: {discarded_key}")

    def get(self, key):
        """ Retrieves an item by key, marking it as recently used """
        if key in self.cache_data:
            self.cache_data.move_to_end(key)
        return self.cache_data.get(key) if key is not None else None
