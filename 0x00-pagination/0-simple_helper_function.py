#!/usr/bin/env python3
"""
Helper function for pagination.
"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Returns a tuple containing the start and end index for a given pagination.

    Args:
        page (int): The page number (1-indexed).
        page_size (int): The number of items per page.

    Returns:
        Tuple[int, int]: The start and end indices for the page.
    """
    start = (page - 1) * page_size
    end = page * page_size
    return start, end
