
// Exercise 1: Checking the BMI
const person1 = {
    fullName: "John Doe",
    mass: 80,
    height: 1.8,
    calcBMI: function () {
        return this.mass / (this.height * this.height);
    }
};

const person2 = {
    fullName: "Jane Smith",
    mass: 65,
    height: 1.6,
    calcBMI: function () {
        return this.mass / (this.height * this.height);
    }
};

function compareBMI(p1, p2) {
    const bmi1 = p1.calcBMI();
    const bmi2 = p2.calcBMI();

    if (bmi1 > bmi2) {
        console.log(`${p1.fullName} has the largest BMI (${bmi1.toFixed(2)})`);
    } else if (bmi2 > bmi1) {
        console.log(`${p2.fullName} has the largest BMI (${bmi2.toFixed(2)})`);
    } else {
        console.log(`${p1.fullName} and ${p2.fullName} have the same BMI (${bmi1.toFixed(2)})`);
    }
}

compareBMI(person1, person2);

// Exercise 2: Grade Average (with Bonus)
function calculateAverage(gradesList) {
    let sum = 0;
    for (let grade of gradesList) {
        sum += grade;
    }
    const average = sum / gradesList.length;
    console.log(`Average grade: ${average.toFixed(2)}`);
    return average;
}

function findAvg(gradesList) {
    const average = calculateAverage(gradesList);

    if (average > 65) {
        console.log("You passed!");
    } else {
        console.log("You failed and must repeat the course.");
    }
}

findAvg([80, 75, 90, 60]);
findAvg([50, 60, 55, 62]);
````

