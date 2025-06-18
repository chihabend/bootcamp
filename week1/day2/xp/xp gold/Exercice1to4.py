# ex 1
birthdays = {
    "chihab": "2004/04/23",
    "salma": "2000/04/26",
    "marwan": "1999/08/23",
    "amina": "1992/09/03",
    "touria": "1968/01/01"
}

print("Bienvenue dans le programme des anniversaires ")
print("Vous pouvez consulter les dates d'anniversaire des personnes de la liste !")
print("Personnes disponibles :", ", ".join(birthdays.keys()))

nom = input("Entrez le nom de la personne dont vous voulez connaître l'anniversaire : ").strip().lower()

if nom in birthdays:
    print(f"L'anniversaire de {nom.title()} est le {birthdays[nom]}")
else:
    print(f"Désolé, je n'ai pas d'anniversaire enregistré pour {nom}.")
# ex 2
birthdays = {
    "chihab": "2004/04/23",
    "salma": "2000/04/26",
    "marwan": "1999/08/23",
    "amina": "1992/09/03",
    "touria": "1968/01/01"
}
print("Bienvenue dans le programme des anniversaires ")
print("Voici les personnes pour lesquelles nous avons des dates d'anniversaire :")
for name in birthdays:
    print("-", name.title())
nom = input("Entrez le nom de la personne dont vous voulez connaître l'anniversaire : ").strip().lower()
if nom in birthdays:
    print(f"L'anniversaire de {nom.title()} est le {birthdays[nom]}")
else:
    print(f"Désolé, nous n'avons pas les informations d'anniversaire pour {nom.title()}.")
# ex 3
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
nom = input("Entrez un nom : ")
if nom in names:
    index = names.index(nom)
    print(f"L'index de la première occurrence de {nom} est {index}")
else:
    print(f"{nom} n'est pas dans la liste.")
# ex 4
import random
def throw_dice():
    return random.randint(1, 6)
def throw_until_doubles():
    count = 0
    while True:
        die1 = throw_dice()
        die2 = throw_dice()
        count += 1
        if die1 == die2:
            break
    return count
def main():
    results = []
    for _ in range(100):
        throws = throw_until_doubles()
        results.append(throws)
    total_throws = sum(results)
    average_throws = total_throws / len(results)

    print(f"Total throws: {total_throws}")
    print(f"Average throws to reach doubles: {average_throws:.2f}")
main()
