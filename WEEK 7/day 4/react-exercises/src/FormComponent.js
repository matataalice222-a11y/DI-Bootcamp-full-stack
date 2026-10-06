function FormComponent({ formData, handleChange }) {
  const dietaryRestrictions = [
    ['lactoseFree', 'Lactose free'],
    ['vegan', 'Vegan'],
    ['kosher', 'Kosher'],
  ]

  return (
    <section className="exercise-section travel-form-section" aria-labelledby="travel-form-title">
      <div className="section-heading">
        <span>09</span>
        <h2 id="travel-form-title">Travel form</h2>
      </div>

      <div className="travel-form-layout">
        <form action="/" className="travel-form" method="get">
          <label className="travel-form-field">
            First name
            <input
              autoComplete="given-name"
              name="firstName"
              onChange={handleChange}
              required
              type="text"
              value={formData.firstName}
            />
          </label>

          <label className="travel-form-field">
            Last name
            <input
              autoComplete="family-name"
              name="lastName"
              onChange={handleChange}
              required
              type="text"
              value={formData.lastName}
            />
          </label>

          <label className="travel-form-field">
            Age
            <input
              max="120"
              min="1"
              name="age"
              onChange={handleChange}
              required
              type="number"
              value={formData.age}
            />
          </label>

          <fieldset className="travel-form-options">
            <legend>Gender</legend>
            {[
              ['male', 'Male'],
              ['female', 'Female'],
            ].map(([value, label]) => (
              <label className="travel-form-option" key={value}>
                <input
                  checked={formData.gender === value}
                  name="gender"
                  onChange={handleChange}
                  required
                  type="radio"
                  value={value}
                />
                {label}
              </label>
            ))}
          </fieldset>

          <label className="travel-form-field">
            Destination
            <select
              name="destination"
              onChange={handleChange}
              required
              value={formData.destination}
            >
              <option disabled value="">Choose a destination</option>
              <option value="Japan">Japan</option>
              <option value="Thailand">Thailand</option>
              <option value="Brazil">Brazil</option>
            </select>
          </label>

          <fieldset className="travel-form-options">
            <legend>Dietary restrictions</legend>
            {dietaryRestrictions.map(([name, label]) => (
              <label className="travel-form-option" key={name}>
                <input
                  checked={formData[name]}
                  name={name}
                  onChange={handleChange}
                  type="checkbox"
                />
                {label}
              </label>
            ))}
          </fieldset>

          <button className="demo-button travel-form-submit" type="submit">
            Submit
          </button>
        </form>

        <aside className="travel-form-output" aria-live="polite">
          <h3>Entered information</h3>
          <dl>
            <div>
              <dt>First name</dt>
              <dd>{formData.firstName || '—'}</dd>
            </div>
            <div>
              <dt>Last name</dt>
              <dd>{formData.lastName || '—'}</dd>
            </div>
            <div>
              <dt>Age</dt>
              <dd>{formData.age || '—'}</dd>
            </div>
            <div>
              <dt>Gender</dt>
              <dd>{formData.gender || '—'}</dd>
            </div>
            <div>
              <dt>Destination</dt>
              <dd>{formData.destination || '—'}</dd>
            </div>
            <div>
              <dt>Dietary restrictions</dt>
              <dd>
                {dietaryRestrictions
                  .filter(([name]) => formData[name])
                  .map(([, label]) => label)
                  .join(', ') || 'None'}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}

export default FormComponent
