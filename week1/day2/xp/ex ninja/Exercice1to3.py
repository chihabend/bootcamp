# ex 1
chaine = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"
fabricants = chaine.split(", ")
print("Nombre de fabricants :", len(fabricants))
fabricants_decroissant = sorted(fabricants, reverse=True)
print("Ordre décroissant :", fabricants_decroissant)
avec_o = [f for f in fabricants if 'o' in f.lower()]
print("Noms contenant 'o' :", len(avec_o))
sans_i = [f for f in fabricants if 'i' not in f.lower()]
print("Noms ne contenant pas 'i' :", len(sans_i))
fabricants_doublons = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]
fabricants_uniques = list(dict.fromkeys(fabricants_doublons))
print("Fabricants sans doublons :", ", ".join(fabricants_uniques))
print("Nombre après suppression des doublons :", len(fabricants_uniques))
fabricants_inverses = sorted([nom[::-1] for nom in fabricants_uniques])
print("Fabricants inversés et triés (AZ) :", fabricants_inverses)
# ex 2
def get_full_name(first_name, last_name, middle_name=None):
    if middle_name:
        full_name = f"{first_name.capitalize()} {middle_name.capitalize()} {last_name.capitalize()}"
    else:
        full_name = f"{first_name.capitalize()} {last_name.capitalize()}"
    return full_name
print(get_full_name("john", "lee", middle_name="hooker"))  
print(get_full_name("bruce", "lee"))                  
# ex 3   
# Dictionnaire anglais -> morse
morse_code = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', ' ': '/', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----'
}
def anglais_vers_morse(texte):
    texte = texte.upper()
    return ' '.join([morse_code.get(car, '') for car in texte])
def morse_vers_anglais(morse):
    inverse_morse = {v: k for k, v in morse_code.items()}
    mots = morse.strip().split(' / ')
    traduction = []
    for mot in mots:
        lettres = [inverse_morse.get(code, '') for code in mot.split()]
        traduction.append(''.join(lettres))
    return ' '.join(traduction)
texte = "try giiks"
morse = anglais_vers_morse(texte)
print("Morse :", morse)
retour = morse_vers_anglais(morse)
print("Texte :", retour)

