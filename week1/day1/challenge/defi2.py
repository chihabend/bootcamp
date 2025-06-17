from datetime import datetime
def est_bissextile(annee):
    return (annee % 4 == 0 and annee % 100 != 0) or (annee % 400 == 0)
def afficher_gateau(nb_bougies):
    bougies = "i" * nb_bougies
    print(f"       ___{bougies}___")
    print("      |:H:a:p:p:y:|")
    print("    __|___________|__")
    print("   |^^^^^^^^^^^^^^^^^|")
    print("   |:B:i:r:t:h:d:a:y:|")
    print("   |                 |")
    print("   ~~~~~~~~~~~~~~~~~~~")
date_naissance = input("Entrez votre date de naissance (format DD/MM/YYYY) : ")
try:
    naissance = datetime.strptime(date_naissance, "%d/%m/%Y")
    aujourd_hui = datetime.today()
    age = aujourd_hui.year - naissance.year - ((aujourd_hui.month, aujourd_hui.day) < (naissance.month, naissance.day))
    dernier_chiffre = age % 10
    if dernier_chiffre == 0:
        dernier_chiffre = 10
    if est_bissextile(naissance.year):
        afficher_gateau(dernier_chiffre)
        print()
        afficher_gateau(dernier_chiffre)
    else:
        afficher_gateau(dernier_chiffre)
except ValueError:
    print("Format de date invalide. Veuillez entrer la date sous la forme DD/MM/YYYY.")
