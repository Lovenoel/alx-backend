#!/usr/bin/env python3
""" FIFOCache module """
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    def __init__(self):
        """Initialize the FIFOCache with necessary attributes."""
        super().__init__()
        # List to keep track of insertion order for FIFO
        self.order = []

    def put(self, key, item):
        """Assign item to key in cache and manage FIFO eviction
        policy if necessary."""
        if key is None or item is None:
            return

        # If the key already exists, update the value but don't
        # change the order
        if key in self.cache_data:
            self.cache_data[key] = item
        else:
            # If cache exceeds the maximum size, remove the oldest
            # item (FIFO)
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                oldest_key = self.order.pop(0)
                del self.cache_data[oldest_key]
                print(f"DISCARD: {oldest_key}")

            # Add the new item
            self.cache_data[key] = item
            self.order.append(key)

    def get(self, key):
        """Return value in cache_data linked to key."""
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
