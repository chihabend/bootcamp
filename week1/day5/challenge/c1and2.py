# challenge1
def sort_words(input_string):
    words = [word.strip() for word in input_string.split(",")]
    sorted_words = sorted(words)
    return ",".join(sorted_words)

input_data = "without,hello,bag,world"
print(sort_words(input_data))  
# challenge2
def longest_word(sentence):
    words = sentence.split()
    longest = max(words, key=len)
    return longest

print(longest_word("Margaret's toy is a pretty doll."))       
print(longest_word("A thing of beauty is a joy forever."))    
print(longest_word("Forgetfulness is by all means powerless!"))  
