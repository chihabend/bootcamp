# 7awlt n9ad had tp bdkchi li t3lmt hadchi nade hhhh
class MenuManager:
    def __init__(self):
        self.menu = [
            {
                "nom": "Soup",
                "prix": 10,
                "epice": "B", 
                "gluten": False
            },
            {
                "nom": "Hamburger",
                "prix": 15,
                "epice": "A",  
                "gluten": True
            },
            {
                "nom": "Salad",
                "prix": 18,
                "epice": "A", 
                "gluten": False
            },
            {
                "nom": "French Fries",
                "prix": 5,
                "epice": "C", 
                "gluten": False
            },
            {
                "nom": "Beef bourguignon",
                "prix": 25,
                "epice": "B",  
                "gluten": True
            }
        ]

    def add_item(self, name, price, spice, gluten):
        nv_plat = {
            "nom": name,
            "prix": price,
            "epice": spice,
            "gluten": gluten
        }
        self.menu.append(nv_plat)

    def update_item(self):
        findpl = input("merci d'entrer le nom de plat:")
        plat_existe = False  

        for plat in self.menu:
            if plat.get("nom") == findpl:
                plat_existe = True
                print("Existe:", plat)
                decision = input("entrer le mot 'yes' pour faire update: ")
                if decision == 'yes':
                    new_update = (
                        input("merci d'entrer le nom de plat:"),
                        input("merci d'entrer le prix de plat:"),
                        input("merci d'entrer l'epice de plat:"),
                        input("merci d'entrer le gluten de plat:")
                    )

                    plat["nom"] = new_update[0]
                    try:
                        plat["prix"] = int(new_update[1])
                    except ValueError:
                        print("Prix invalide, valeur non modifiée.")

                    plat["epice"] = new_update[2]

                    if new_update[3].lower() == 'true':
                        plat["gluten"] = True
                    elif new_update[3].lower() == 'false':
                        plat["gluten"] = False
                    else:
                        print("Valeur gluten invalide, valeur non modifiée.")
                    print(Menu1.menu)
                elif decision != "yes":
                    print("Mise à jour annulée.")
                break  

        if not plat_existe:
            print("le plat existe pas")
    def remove_item(self):
        target_plat = input("entrer le plat a suprimer: ")
        for plat in self.menu:
            if plat.get("nom") == target_plat:
                self.menu.remove(plat)
                print("plat suprimé")
                print(Menu1.menu)
            else:
                print("plat non trouvé")
                break


Menu1 = MenuManager()
# Menu1.add_item('pizza', 50, 'B', True)
print(Menu1.update_item())
Menu1.remove_item()

