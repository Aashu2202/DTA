import logging
import sys

def setup_logger():
    logger = logging.getLogger("dtable_backend")
    logger.setLevel(logging.INFO)

    # Console Handler
    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(logging.INFO)
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)

    return logger

logger = setup_logger()
