const queryParams = new URLSearchParams(window.location.search);
const firstName = queryParams.get("firstname") || "Not provided";
const lastName = queryParams.get("lastname") || "Not provided";
const displaySection = document.getElementById("display-data");

if (queryParams.has("firstname") || queryParams.has("lastname")) {
    const firstNameElement = document.createElement("p");
    firstNameElement.textContent = `First Name: ${firstName}`;

    const lastNameElement = document.createElement("p");
    lastNameElement.textContent = `Last Name: ${lastName}`;

    displaySection.append(firstNameElement, lastNameElement);
} else {
    displaySection.textContent = "No data received.";
}