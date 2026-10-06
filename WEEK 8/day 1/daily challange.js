import React from "react";

function FormComponent({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <br />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <br />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />
      <br />

      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === "male"}
          onChange={handleChange}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === "female"}
          onChange={handleChange}
        />
        Female
      </label>
      <br />

      <select
        name="destination"
        value={formData.destination}
        onChange={handleChange}
      >
        <option value="">-- Choose Destination --</option>
        <option value="Japan">Japan</option>
        <option value="Brazil">Brazil</option>
        <option value="Kenya">Kenya</option>
      </select>
      <br />

      <label>
        <input
          type="checkbox"
          name="lactoseFree"
          checked={formData.lactoseFree === "on"}
          onChange={handleChange}
        />
        Lactose Free
      </label>
      <br />

      <button type="submit">Submit</button>

      <h3>Entered Information:</h3>
      <p>First Name: {formData.firstName}</p>
      <p>Last Name: {formData.lastName}</p>
      <p>Age: {formData.age}</p>
      <p>Gender: {formData.gender}</p>
      <p>Destination: {formData.destination}</p>
      <p>Lactose Free: {formData.lactoseFree}</p>
    </form>
  );
}

export default FormComponent;
