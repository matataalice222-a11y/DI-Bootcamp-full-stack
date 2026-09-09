const form = document.getElementById("user-form");
const output = document.getElementById("output");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
        name: document.getElementById("name").value.trim(),
        lastname: document.getElementById("lastname").value.trim()
    };

    output.textContent = JSON.stringify(data);
});
