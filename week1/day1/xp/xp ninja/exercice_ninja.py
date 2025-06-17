# ex 1
# True
# True
# False
# False
# False
# True
# False
# 5
# 10
# x True
# y False
# a 5
# b 10

# ex 2
longest_phrase = ""

while True:
    phrase = input("Entrez une phrase sans la lettre 'A' (ou tapez 'exit' pour quitter) : ")
    if phrase.lower() == "exit":
        print("Fin du programme.")
        break
    if "a" in phrase.lower():
        print("La phrase contient la lettre 'A'. Réessayez.")
        continue
    if len(phrase) > len(longest_phrase):
        longest_phrase = phrase
        print(f"Bravo ! Nouvelle phrase la plus longue sans 'A' ({len(longest_phrase)} caractères).")
    else:
        print("Cette phrase est plus courte que la précédente plus longue.")

# ex 3
texte = """Comprendre et analyser les résultats de différentes expressions Python et fonctions intégrées.
Améliorer votre capacité à prédire le comportement des expressions booléennes et des comparaisons de valeurs en Python.
Développer des compétences en manipulation de chaînes et en analyse de texte.
Apprendre à interagir avec les entrées des utilisateurs pour créer des scripts Python dynamiques et interactifs.
Appliquer les concepts de traitement de texte pour effectuer des analyses textuelles et des statistiques détaillées."""

nb_caracteres = len(texte)

phrases = [p for p in texte.split('.') if p.strip()]
nb_phrases = len(phrases)

mots = texte.replace('\n', ' ').split()
nb_mots = len(mots)

mots_uniques = set(mot.strip(".,").lower() for mot in mots)
nb_mots_uniques = len(mots_uniques)

nb_caracteres_non_blancs = len([c for c in texte if not c.isspace()])

moyenne_mots_par_phrase = nb_mots / nb_phrases if nb_phrases else 0

nb_mots_non_uniques = nb_mots - nb_mots_uniques

print(f"Analyse du paragraphe :")
print(f"- Nombre de caractères (avec espaces) : {nb_caracteres}")
print(f"- Nombre de phrases : {nb_phrases}")
print(f"- Nombre de mots : {nb_mots}")
print(f"- Nombre de mots uniques : {nb_mots_uniques}")
print(f"- Nombre de caractères non blancs : {nb_caracteres_non_blancs}")
print(f"- Moyenne de mots par phrase : {moyenne_mots_par_phrase:.2f}")
print(f"- Nombre de mots non uniques : {nb_mots_non_uniques}")
