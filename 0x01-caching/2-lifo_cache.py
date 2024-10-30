#!/usr/bin/env python3
""" LIFOCache module """
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """ LIFOCache is a caching system with a LIFO eviction policy """

    def put(self, key, item):
        """
        Adds an item to the cache and evicts the newest if over
        capacity
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS
            and key not in self.cache_data:
                last_key = next(reversed(self.cache_data))
                print(f"DISCARD: {last_key}")
                self.cache_data.pop(last_key)
            self.cache_data[key] = item

    def get(self, key):
        """ Retrieves an item by key """
        return self.cache_data.get(key) if key is not None else None
