le_mot = input("Merci d'entrer un mot: ")
def createur(word):
    dic = {}
    for i, lettre in enumerate(word):
        if lettre in dic:
            dic[lettre].append(i)
        else:
            dic[lettre] = [i]
    return dic
print(createur(le_mot))