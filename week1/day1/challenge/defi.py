# defi 1
# number = int(input("Entrez un nombre : "))
# length = int(input("Entrez la longueur de la liste : "))
# multiples = []
# for i in range(1, length + 1):
#     multiples.append(number * i)
# print(multiples)
# defi 2
chaine = input("Entrez une chaine charachtere : ")
def supprimer_repetitions(chaine):
    resultat = ""
    for caractere in chaine:
        if caractere not in resultat:
            resultat += caractere
    return resultat
print(supprimer_repetitions(chaine))