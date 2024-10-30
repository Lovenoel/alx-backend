#!/usr/bin/env python3
""" BasicCache module """
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ BasicCache is a caching system with no size limit """

    def put(self, key, item):
        """ Adds an item to the cache """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """ Retrieves an item by key """
        return self.cache_data.get(key) if key is not None else None
