# ex1
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat:
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Siamese(Cat):
    def __init__(self, name, age):
        super().__init__(name, age)

    def carac(self, comportement):
        return f"{self.name} miaule : {comportement}"

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'
    
bengal1 = Bengal("Simba", 3)
chartreux1 = Chartreux("Grisou", 5)
siamese1 = Siamese("Luna", 2)
all_cats = [bengal1, chartreux1, siamese1]
sara_pets = Pets(all_cats)
sara_pets.walk()

# ex2
class Dog:
    def __init__(self,name,age,weight):
        self.name = name
        self.age = age
        self.weight = weight
    def bark(self):
        return "haw hhh"
    def run_speed(self):
        return self.weight/ self.age * 10
    def fight(self, other_dog):
        first_dog = self.run_speed() * self.weight
        secound_dog = other_dog.run_speed() * other_dog.weight
    
        if first_dog > secound_dog:
            return f"{self.name} a gagné le combat contre {other_dog.name} !"
        elif first_dog < secound_dog:
            return f"{other_dog.name} a gagné le combat contre {self.name} !"
        else:
            return f"Égalité entre {self.name} et {other_dog.name} !"
dog1 = Dog("Rex", 5, 20)   
dog2 = Dog("Bella", 3, 15)    
dog3 = Dog("Thor", 7, 30)      
print(dog1.bark())        
print(dog2.run_speed())   
print(dog1.fight(dog2)) 
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""
    def is_18(self):
        return self.age >= 18
class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []
    def born(self, first_name, age):
        new_person = Person(first_name, age)
        new_person.last_name = self.last_name
        self.members.append(new_person)
        print(f"{first_name} {self.last_name} est né(e), âge : {age} ans.")

    def check_majority(self, first_name):
        found = False
        for person in self.members:
            if person.first_name == first_name:
                found = True
                if person.is_18():
                    print(f"You are over 18, your parents Jane and John accept that you will go out with your friends.")
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                break
        if not found:
            print(f"Aucun membre avec le prénom {first_name} n’a été trouvé.")
    def family_presentation(self):
        print(f"Nom de famille : {self.last_name}")
        print("Membres de la famille :")
        for person in self.members:
            print(f"- {person.first_name}, {person.age} ans")
if __name__ == "__main__":
    famille_ait = Family("Ait")
    famille_ait.born("Sara", 16)
    famille_ait.born("Youssef", 20)
    famille_ait.born("Meryem", 10)
    famille_ait.check_majority("Youssef")  
    famille_ait.check_majority("Sara")      
    famille_ait.check_majority("Ali")       
    famille_ait.family_presentation()
