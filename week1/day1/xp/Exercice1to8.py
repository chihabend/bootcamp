# ex 1
print("hello world\n" *5)
# ex 2
calcule= (99 **3)*8
print(calcule)
# ex 3
name="chihab"
verif=(input("merci d'entrer votre nom: "))
if name == verif:
    print(f"bienvenu {verif}")
else:
    print("utilisateur non trouvé")
# ex 4
taille=(int(input("merci d'entrer votre taille en cm: ")))
if taille >= 145 :
    print(f"avec {taille} cm vous pouvez rouler!")
else:
    print(f"avec {taille} cm vous pouvez pas rouler!")
# ex 5
my_fav_numbers = {7, 14, 21}
my_fav_numbers.add(28)
my_fav_numbers.add(35)
my_fav_numbers.remove(35)
friend_fav_numbers = {3, 14, 42}
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print("My favorite numbers:", my_fav_numbers)
print("Friend's favorite numbers:", friend_fav_numbers)
print("Our favorite numbers:", our_fav_numbers)
# ex 6
mes_nombres = (1, 2, 3)
mes_nombres = mes_nombres + (4, 5)
print("Nouveau tuple :", mes_nombres)
# ex 7
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove('Banana')
basket.remove('Blueberries')
basket.append('Kiwi')
basket.insert(0,'Apples')
print(basket.count('Apples'))
print(basket)
basket.clear()
print(basket)
# ex 8
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")
print(sandwich_orders)


# finalement salit😜