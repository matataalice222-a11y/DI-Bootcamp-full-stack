// 1. Create a variable called sentence
let sentence = "The movie is not that bad, I like it";

// 2. Find the first appearance of the substring "not"
let wordNot = sentence.indexOf("not");

// 3. Find the first appearance of the substring "bad"
let wordBad = sentence.indexOf("bad");

// 4 & 5. Check if both words exist and if "bad" comes after "not"
if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
    // Replace the substring from wordNot up to the end of wordBad (+ 3 for length of "bad") with "good"
    let updatedSentence = 
        sentence.slice(0, wordNot) + 
        "good" + 
        sentence.slice(wordBad + 3);
        
    console.log(updatedSentence);
} else {
    console.log(sentence);
}