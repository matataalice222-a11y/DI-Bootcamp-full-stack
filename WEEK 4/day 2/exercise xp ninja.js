// Exercise 1: Bird class
class Bird {
  constructor() {
    console.log("I'm a bird.");
  }
}

class Flamingo extends Bird {
  constructor() {
    console.log("I'm pink.");
    super();
  }
}

const pet = new Flamingo();

// The output is:
// I'm pink.
// I'm a bird.
//
// In a derived constructor, super() must be called before accessing this.
// Logging text before super() is allowed because it does not access this.
