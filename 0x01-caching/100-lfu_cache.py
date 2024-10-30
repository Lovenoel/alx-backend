#!/usr/bin/env python3
""" LFUCache module """
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    def __init__(self):
        """Initialize the LFUCache with necessary attributes."""
        super().__init__()
        # Dictionary to keep track of frequency of access for each key
        self.frequency = {}
        self.usage_order = {}
        self.time = 0

        def put(self, key, item):
            """
            Assign item to key in cache and manage LFU eviction policy
            if necessary.
            """
            if key is None or item is None:
                return

            # Update the cache if key already exists
            if key in self.cache_data:
                self.cache_data[key] = item
                self.frequency[key] += 1
                self.usage_order[key] = self.time
                self.time += 1
            else:
                # Check if the cache exceeds the maximum size
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    # Find the LFU key (least frequently used key)
                    min_freq = min(self.frequency.values())
                    candidates = [
                            k for k,
                            freq in self.frequency.items()
                            if freq == min_freq]

                    # In case of tie, apply LRU policy to select the
                    # least recently used item
                    if len(candidates) > 1:
                        lfu_key = min(
                                candidates,
                                key=lambda k: self.usage_order[k]
                                )
                    else:
                        lfu_key = candidates[0]

                    # Remove the selected key from cache, frequency,
                    # and usage order
                    print(f"DISCARD: {lfu_key}")
                    del self.cache_data[lfu_key]
                    del self.frequency[lfu_key]
                    del self.usage_order[lfu_key]

                # Insert the new item into cache
                self.cache_data[key] = item
                self.frequency[key] = 1
                self.usage_order[key] = self.time
                self.time += 1

    def get(self, key):
        """Return value in cache_data linked to key."""
        if key is None or key not in self.cache_data:
            return None

        # Increase the frequency since this key has been accessed
        self.frequency[key] += 1
        self.usage_order[key] = self.time
        self.time += 1
        return self.cache_data[key]
