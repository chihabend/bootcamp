import random

class Gene:
    def __init__(self, value=None):
        self.value = value if value in (0, 1) else random.choice([0, 1])

    def mutate(self):
        self.value = 1 - self.value  # inverse 0 → 1 ou 1 → 0

    def __str__(self):
        return str(self.value)

class Chromosome:
    def __init__(self, genes=None):
        self.genes = genes if genes else [Gene() for _ in range(10)]

    def mutate(self):
        for gene in self.genes:
            if random.random() < 0.5:  # 50% de chance de muter
                gene.mutate()

    def is_perfect(self):
        return all(gene.value == 1 for gene in self.genes)

    def __str__(self):
        return ''.join(str(g) for g in self.genes)

class DNA:
    def __init__(self, chromosomes=None):
        self.chromosomes = chromosomes if chromosomes else [Chromosome() for _ in range(10)]

    def mutate(self):
        for chrom in self.chromosomes:
            chrom.mutate()

    def is_perfect(self):
        return all(chrom.is_perfect() for chrom in self.chromosomes)

    def __str__(self):
        return '\n'.join(str(ch) for ch in self.chromosomes)

class Organism:
    def __init__(self, dna, environment_mutation_rate=0.1):
        self.dna = dna
        self.env_rate = environment_mutation_rate
        self.generation = 0

    def mutate_until_perfect(self):
        while not self.dna.is_perfect():
            self.generation += 1
            if random.random() < self.env_rate:
                self.dna.mutate()
        return self.generation
if __name__ == "__main__":
    organism = Organism(DNA(), environment_mutation_rate=0.3)
    generations = organism.mutate_until_perfect()
    print(f"L'organisme a évolué en {generations} générations pour atteindre l'ADN parfait 💯.")
    print("ADN final :\n")
    print(organism.dna)
