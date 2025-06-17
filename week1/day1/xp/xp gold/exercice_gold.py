# ex 1
mois = int(input("merci d'entrer un mois en chifres:"))
saisons = [{3,4,5},{6,7,8},{9,10,11},{12,1,2}]
match mois:
    case m if m in saisons[0]:
        print("C'est le Spring.")
    case m if m in saisons[1]:
        print("C'est le Summer.")
    case m if m in saisons[2]:
        print("C'est le Autumn.")
    case m if m in saisons[3]:
        print("C'est le Winter.")
# ex 2
for i in range(21):
    print(i)
for i in range(21):
    if i%2 == 0:
        print(i)
# ex 3
mon_nom = "chihab"
stopper = 1
while stopper == 1:
    a=input("entrer votre nom: ")
    if mon_nom == a:
        print("bienvenue")
        stopper = 0
# ex 4
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
nom_user = input("merci d'entrer votre nom: ")
if nom_user in names:
    position = names.index(nom_user)
    print(f"l'index est {position}")
else:
    print("introuvable")
# ex 5
num1=int(input('entrer nombre :'))
num2=int(input('entrer nombre :'))
num3=int(input('entrer nombre :'))
arr = [num1, num2, num3]
print(max(arr))
# ex 6
import random
ran_num= random.randint(1, 9)
number_clt= int(input("nombre entre 1 et 9 :"))
if number_clt == ran_num:
    print('bravo')
else :
    print("loser")
