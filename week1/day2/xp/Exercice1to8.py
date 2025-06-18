# ex 1
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]
dic= {}
for i in range(len(keys)):
    dic[keys[i]] = values[i]
print(dic)
# ex 2
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
prix = dict(map(
    lambda item: (
        item[0],                
        0 if item[1] < 3 else   
        10 if item[1] <= 12 else 
        15                     
    ),
    family.items()
    
))
for nom, montant in prix.items():
    print(nom, "doit payer", montant, "$")
print("Total à payer :", sum(prix.values()), "$")
# ex 3
brand = {"name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": ["blue"],
        "Spain": ["red"],
        "US": ["pink", "green"]
    }
}
brand["number_stores"] = 2
print(brand["number_stores"])
def ty():
    phrase_acc = "bonjour chez zara vous etes :"
    for i in range(len(brand["type_of_clothes"])):
        phrase_acc = phrase_acc +" " + brand["type_of_clothes"][i]
    return(phrase_acc)
print(ty())
brand["country_creation"] = "Spain"
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual ")
del brand["creation_date"]
langeur_inter = len(brand["international_competitors"])
dernier_elm = brand["international_competitors"][langeur_inter-1]
print(dernier_elm)
for i in range(len(brand["major_color"]["US"])):
    print(brand["major_color"]["US"][i])
print(len(brand))
print(brand.keys())
more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}
brand.update(more_on_zara)
print(brand)
# ex 4
def describe_city(city,country="Inconnu"):
    phrs = f"{city} est dans {country}"
    return(phrs)
print(describe_city('el jadida','maroc'))
# ex 5
import random
num_al = random.randint(1, 100 )
num_clt = int(input("entrer votre nombre :"))
if num_al == num_clt:
    print('bravo jbtiha')
else:
    print('loser')
# ex 6
def make_shirt(size,text=" I love Python"):
    return(f"The size of the shirt is {size} and the text is {text}.")
print(make_shirt("large"))
print(make_shirt("medium"))
print(make_shirt("large","I love me"))
print(make_shirt(size="xxl", text="wa sahdd"))
# ex 7
import random
# def get_random_temp():
#     return(random.uniform(10,40))
def get_random_temp(saison):
    if saison == "hiver":
        return round(random.uniform(-10, 10), 1)
    elif saison == "printemps":
        return round(random.uniform(10, 20), 1)
    elif saison == "été":
        return round(random.uniform(20, 40), 1)
    elif saison == "automne":
        return round(random.uniform(5, 20), 1)

def detect_saison(mois):
    if mois in [12, 1, 2]:
        return "hiver"
    elif mois in [3, 4, 5]:
        return "printemps"
    elif mois in [6, 7, 8]:
        return "été"
    elif mois in [9, 10, 11]:
        return "automne"
    else:
        return None
def main():
    mois = int(input("Entrez un mois (1 à 12) : "))
    saison = detect_saison(mois)
    if saison is None:
        print("Mois invalide.")
        return
    temp = get_random_temp(saison)
    print(f"Nous sommes en {saison}, la température est de {temp}°C.")
    if temp < 0:
        print("Brrr, il fait un froid de canard ! Portez des couches supplémentaires aujourd'hui.")
    elif 0 <= temp <= 16:
        print("Il fait plutôt frais ! N'oubliez pas votre manteau.")
    elif 17 <= temp <= 23:
        print("Beau temps agréable.")
    elif 24 <= temp <= 32:
        print("Un peu chaud, restez hydraté.")
    else:
        print("Il fait vraiment chaud ! Restez au frais.")
main()
# ex 8
toppings = []
prix_base = 10
prix_topping = 2.5
print("Entrez les garnitures pour votre pizza (tapez 'quit' pour terminer) :")
while True:
    garniture = input("➤ Garniture : ").strip()
    if garniture.lower() == 'quit':
        break
    toppings.append(garniture)
    print(f"Adding {garniture} to your pizza.")
cout_total = prix_base + len(toppings) * prix_topping
print("\n🧾 Votre commande :")
if toppings:
    print("Garnitures choisies :", ", ".join(toppings))
else:
    print("Aucune garniture choisie.")
print(f"Prix total : {cout_total:.2f} $")


