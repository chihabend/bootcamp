class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}
    def add_animal(self, animal_type, count=1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count
    def get_info(self):
        result = f"{self.name}'s farm\n\n"
        for animal, count in self.animals.items():
            result += f"{animal} : {count}\n"
        result += "\n    E-I-E-I-0!"
        return result
macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)
print(macdonald.get_info())

def get_animal_types(self):
        return sorted(self.animals.keys())

def get_short_info(self):
        animal_types = self.get_animal_types()
        formatted_animals = []

        for animal in animal_types:
            count = self.animals[animal]
            if count > 1:
                if animal.endswith('y') and animal[-2] not in "aeiou":
                    plural = animal[:-1] + "ies"
                elif animal.endswith(('s', 'sh', 'ch', 'x', 'z')):
                    plural = animal + "es"
                else:
                    plural = animal + "s"
            else:
                plural = animal
            formatted_animals.append(plural)

        animals_list = ", ".join(formatted_animals[:-1])
        if len(formatted_animals) > 1:
            animals_list += f" et {formatted_animals[-1]}"
        else:
            animals_list = formatted_animals[0]

        return f"La ferme {self.name} a des {animals_list}."
#ntestew
print(macdonald.get_info())
print(macdonald.get_animal_types())
print(macdonald.get_short_info())

