from Exercice1to4 import Dog 
import random
class PetDog(Dog):
    def __init__(self, name, age, weight, trained=False):
        super().__init__(name, age, weight)
        self.trained = trained
    def train(self):
        print(self.bark())  
        self.trained = True
    def play(self, *args):
        dog_names = [self.name] + [dog.name for dog in args]
        print(f"{', '.join(dog_names)} jouent tous ensemble 🐾")
    def do_a_trick(self):
        if self.trained:
            tricks = [
                "fait un salto arrière",
                "se met sur ses pattes arrière",
                "te serre la patte",
                "fait le mort"
            ]
            print(f"{self.name} {random.choice(tricks)}")
        else:
            print(f"{self.name} n'est pas encore entraîné pour faire un tour.")
if __name__ == "__main__":
    dog1 = PetDog("Rex", 5, 20)
    dog2 = PetDog("Bella", 3, 15)
    dog3 = PetDog("Thor", 7, 30)
    dog1.train()            
    dog1.play(dog2, dog3)   
    dog1.do_a_trick()      
    dog2.do_a_trick()     
