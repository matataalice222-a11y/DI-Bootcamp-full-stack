function createContactForm(method, title) {
    const form = document.createElement("form");
    form.method = method;
    form.action = "";

    const heading = document.createElement("h2");
    heading.textContent = title;

    const nameLabel = document.createElement("label");
    nameLabel.htmlFor = `${method}-name`;
    nameLabel.textContent = "Name:";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = `${method}-name`;
    nameInput.name = "name";
    nameInput.required = true;

    const messageLabel = document.createElement("label");
    messageLabel.htmlFor = `${method}-message`;
    messageLabel.textContent = "Message:";

    const messageInput = document.createElement("textarea");
    messageInput.id = `${method}-message`;
    messageInput.name = "message";
    messageInput.required = true;

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Send";

    form.append(heading, nameLabel, nameInput, messageLabel, messageInput, submitButton);
    return form;
}

const marioGame = {
    detail: "An amazing game",
    characters: {
        mario: {
            description: "small and jumpy",
            height: 10,
            weight: 3,
            speed: 5
        },
        bowser: {
            description: "big and jumpy",
            height: 16,
            weight: 6,
            speed: 4
        }
    }
};

const jsonString = JSON.stringify(marioGame);
const prettyJson = JSON.stringify(marioGame, null, 2);
const parsedGame = JSON.parse(jsonString);

console.log(jsonString);
console.log(prettyJson);
console.log(parsedGame);

if (typeof document !== "undefined") {
    document.body.append(
        createContactForm("get", "GET form"),
        createContactForm("post", "POST form")
    );
}