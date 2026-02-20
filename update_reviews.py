import re

with open('src/data/reviews.ts', 'r') as f:
    content = f.read()

# Replace video calls
# getMediaUrl("homepage/trends/home-trends-4.mp4", "video") -> getMediaUrl("home/home-trends-4", "video")
# Also handle .mov
content = re.sub(r'getMediaUrl\("homepage/trends/home-trends-(\d+)\.(mp4|mov)", "video"\)',
                 r'getMediaUrl("home/home-trends-\1", "video")',
                 content)

# Replace thumbnail calls
# thumbnailUrl: getMediaUrl("homepage/trends/home-trends-4.mp4", "image") -> thumbnailUrl: getMediaUrl("home/home-trends-4.jpg", "video")
# The capture group 1 is the number.
content = re.sub(r'getMediaUrl\("homepage/trends/home-trends-(\d+)\.(mp4|mov)", "image"\)',
                 r'getMediaUrl("home/home-trends-\1.jpg", "video")',
                 content)

with open('src/data/reviews.ts', 'w') as f:
    f.write(content)
