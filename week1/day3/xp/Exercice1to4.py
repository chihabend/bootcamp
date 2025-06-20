# ex1
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age
    def __str__(self):
        return f"{self.name}, {self.age} ans"
cat1 = Cat('pouchi', 3)
cat2 = Cat('max', 2)
cat3 = Cat('lili', 1)
def get_vieux_cat(cat_un, cat_deux, cat_trois):
    plus_vieux = cat_un
    if cat_deux.age > plus_vieux.age:
        plus_vieux = cat_deux
    if cat_trois.age > plus_vieux.age:
        plus_vieux = cat_trois
    return (f"Le chat le plus âgé est {plus_vieux.name}, et a {plus_vieux.age} ans")
print(get_vieux_cat(cat1, cat2, cat3))

# ex2
class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height
    def bark(self):
        print(f"{self.name} fait ouaf !")
    def jump(self):
        print(f"{self.name} saute {self.height * 2} cm de haut !")
    def __str__(self):
        return f"{self.name} mesure {self.height} cm"
davids_dog = Dog('Diva', 50)
sarahs_dog = Dog('Rex', 60)
print(davids_dog)
davids_dog.bark()
davids_dog.jump()
print(sarahs_dog)
sarahs_dog.bark()
sarahs_dog.jump()
if davids_dog.height > sarahs_dog.height:
    print(f"{davids_dog.name} est plus grand.")
elif davids_dog.height < sarahs_dog.height:
    print(f"{sarahs_dog.name} est plus grand.")
else:
    print("Les deux chiens ont la même taille.")
# ex 3
class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics
    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)
stairway = Song([
    "There’s a lady who's sure",
    "All that glitters is gold",
    "And she’s buying a stairway to heaven"
])
stairway.sing_me_a_song()
# ex 4
class Zoo:
    def __init__(self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)
    def get_animals(self):
        print("Animaux dans le zoo :", self.animals)
    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
    def sort_animals(self):
        self.groups = {}
        for animal in sorted(self.animals):
            first_letter = animal[0].upper()
            if first_letter not in self.groups:
                self.groups[first_letter] = []
            self.groups[first_letter].append(animal)
        return self.groups
    def get_groups(self):
        if hasattr(self, 'groups'):
            for letter, group in self.groups.items():
                print(f"{letter}: {group}")
        else:
            print("Aucun groupe d'animaux disponible. Veuillez d'abord trier.")
ramat_gan_safari = Zoo("Ramat Gan Safari")
ramat_gan_safari.add_animal("Giraffe")
ramat_gan_safari.add_animal("Bear")
ramat_gan_safari.add_animal("Baboon")
ramat_gan_safari.add_animal("Cat")
ramat_gan_safari.add_animal("Cougar")
ramat_gan_safari.add_animal("Zebra")
ramat_gan_safari.add_animal("Lion")
ramat_gan_safari.get_animals()
ramat_gan_safari.sell_animal("Bear")
ramat_gan_safari.get_animals()
ramat_gan_safari.sort_animals()
ramat_gan_safari.get_groups()
