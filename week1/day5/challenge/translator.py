from googletrans import Translator

french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]
translator = Translator()

translations = {word: translator.translate(word, src='fr', dest='en').text for word in french_words}
print(translations)
