
import random

class Gene:
    """Represents a single gene with a value of 0 or 1."""
    def __init__(self, value=None):
        self.value = value if value in (0, 1) else random.choice([0, 1])

    def mutate(self):
        """Flips the value of the gene (0 -> 1 or 1 -> 0)."""
        self.value = 1 if self.value == 0 else 0

    def __repr__(self):
        return str(self.value)


class Chromosome:
    """Represents a chromosome composed of 10 Genes."""
    def __init__(self, genes=None):
        if genes and len(genes) == 10:
            self.genes = genes
        else:
            self.genes = [Gene() for _ in range(10)]

    def mutate(self):
        """Random number of genes can flip with a 1/2 chance each."""
        # Pick a random number of genes to consider mutating (1 to 10)
        num_to_consider = random.randint(1, 10)
        genes_to_mutate = random.sample(self.genes, num_to_consider)
        
        for gene in genes_to_mutate:
            if random.random() < 0.5:  # 50% chance to flip
                gene.mutate()

    def is_all_ones(self):
        return all(gene.value == 1 for gene in self.genes)

    def __repr__(self):
        return "".join(str(g) for g in self.genes)


class DNA:
    """Represents DNA composed of 10 Chromosomes."""
    def __init__(self, chromosomes=None):
        if chromosomes and len(chromosomes) == 10:
            self.chromosomes = chromosomes
        else:
            self.chromosomes = [Chromosome() for _ in range(10)]

    def mutate(self):
        """Random number of chromosomes mutate with a 1/2 chance each."""
        num_to_consider = random.randint(1, 10)
        chromosomes_to_mutate = random.sample(self.chromosomes, num_to_consider)
        
        for chromosome in chromosomes_to_mutate:
            if random.random() < 0.5:  # 50% chance to mutate chromosome
                chromosome.mutate()

    def is_all_ones(self):
        """Checks if all 100 genes across all 10 chromosomes are 1s."""
        return all(chrom.is_all_ones() for chrom in self.chromosomes)

    def __repr__(self):
        return "\n".join(str(c) for c in self.chromosomes)


class Organism:
    """Represents an organism containing DNA affected by environmental mutation rates."""
    def __init__(self, dna, environment):
        self.dna = dna
        self.environment = environment  # Float probability between 0 and 1

    def mutate(self):
        """Triggers DNA mutation based on environmental probability."""
        if random.random() < self.environment:
            self.dna.mutate()


# ==========================================
# Simulation Execution
# ==========================================
def run_simulation(num_organisms=10, environment_rate=0.8):
    # Instantiate population of organisms
    population = [Organism(DNA(), environment_rate) for _ in range(num_organisms)]
    
    generations = 0
    winner = None

    print(f"Starting evolution simulation with {num_organisms} organisms...")
    print(f"Environment Mutation Probability: {environment_rate}\n")

    while not winner:
        generations += 1
        for organism in population:
            organism.mutate()
            if organism.dna.is_all_ones():
                winner = organism
                break

    print("=" * 40)
    print(f"TARGET DNA REACHED!")
    print(f"Total Generations (Iterations): {generations}")
    print("=" * 40)
    return generations


if __name__ == "__main__":
    run_simulation(num_organisms=50, environment_rate=0.9)



### **Research Notebook Conclusion**

#*Observation:** The total number of genes in a single DNA sequence is $10 \text{ chromosomes} \times 10 \text{ genes} = 100 \text{ total bits}$.
#Conclusion:** Achieving a perfect sequence of 100 ones via pure random mutations without natural selection (fitness-based retention) requires a huge number of iterations. Introducing a larger population of organisms or increasing the environmental mutation rate accelerates the chance that random flipping aligns all 100 genes to `1`.