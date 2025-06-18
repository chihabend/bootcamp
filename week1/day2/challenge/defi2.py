import re
lines = [
    "7ii",
    "Tsx",
    "h%?",
    "i #",
    "sM ",
    "$a ",
    "#t%",
    "^r!"
]
cols = len(lines[0])
rows = len(lines)
message = ''
for col in range(cols):
    for row in range(rows):
        message += lines[row][col]
decoded = re.sub(r'(?<=[a-zA-Z])[^a-zA-Z]+(?=[a-zA-Z])', ' ', message)
print("Message caché :", decoded)
