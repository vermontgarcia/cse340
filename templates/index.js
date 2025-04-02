// Navigation Templates

const formattedNumber = (number) =>
  new Intl.NumberFormat('en-US').format(number);

const navItemTemplate = (item) => `
  <li>
    <a
      href="/inv/type/${item.clas_id}"
      title="See our inventory of ${item.clas_name} vehicles"
      >${item.clas_name}</a
    >
  </li>
`;

const navTemplate = (data) => `
  <ul>
    <li><a href="/" title="Home page">Home</a></li>
    ${data.rows.map(navItemTemplate).join('')}
  </ul>
`;

// Grid Inventory by Cassification Templates

const gridItemTemplate = (vehicle) => `
  <li>
    <a
      href="../../inv/detail/${vehicle.inv_id}"
      title="View ${vehicle.inv_make} ${vehicle.inv_model} details"
      ><img
        src="${vehicle.inv_thumbnail}"
        alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors"
    /></a>
    <hr />
    <div class="name-price">
      <h2>
        <a
          href="../../inv/detail/${vehicle.inv_id}"
          title="View ${vehicle.inv_make} ${vehicle.inv_model} details"
          >${vehicle.inv_make} ${vehicle.inv_model}</a
        >
      </h2>
      <span>$ ${formattedNumber(vehicle.inv_price)}</span>
    </div>
  </li>
`;

const gridTemplate = (rows) => `
  <ul id="inv-display">
    ${rows.map(gridItemTemplate).join('')}
  </ul>
`;

// Grid Inventory Details Templates

const gridInventoryDetailsTemplate = ({
  inv_year: year,
  inv_make: make,
  inv_model: model,
  inv_image: image,
  inv_price: price,
  inv_description: description,
  inv_color: color,
  inv_miles: miles,
}) => `
  <div>
    <div class="inventory-details-wrapper">
      <img
        src="${image}"
        alt="Image of ${year} ${make} ${model}"
        width="100"
        height="100"
      />
      <div>
        <h2>${make} ${model} Details</h2>
        <ul>
          <li>
            <strong>
              Price: $ ${formattedNumber(price)}
            </strong>
          </li>
          <li>
            <strong>Description:</strong>
            <p>${description}</p>
          </li>
          <li>
            <strong>Color:</strong>
            <p>${color}</p>
          </li>
          <li>
            <strong>Miles:</strong>
            <p>${formattedNumber(miles)}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
`;

// No vehicles template

const noVehiclesTemplate = `
  <p class="notice">
    Sorry, no matching vehicles could be found in this category.
  </p>
`;

// Error Templates

const gridErrorTemplate = ({
  title,
  statusCode,
  message,
  imageUrl,
  imageName,
}) => `
  <div class="error-page">
    <h1>${title}</h1>
    <div>
      <p class="code">${statusCode}</p>
      <p>${message}</p>
      <img src="${imageUrl}" alt="${imageName}" width="100", height="100">
    </div>
  </div>
`;

const loginGridTemplate = () => `
  <form class="form" action="">
    <fieldset>
      <label
        >Email<span class="required">*</span>
        <input type="email" name="acc_email" id="email" required autocomplete />
      </label>
      <label
        >Password<span class="required">*</span>
        <input
          type="password"
          name="acc_password"
          id="password"
          required
          autocomplete
        />
      </label>
    </fieldset>
    <fieldset class="submit-btn-container">
      <input type="submit" role="button" value="Login" />
    </fieldset>
    <div>
      <p>No account? <a href="/account/signup">Sign Up</a></p>
    </div>
  </form>
`;

const signupGridTemplate = () => `
  <form class="form" action="/account/signup" method="post">
    <fieldset>
      <label
        >First Name<span class="required">*</span>
        <input
          type="text"
          name="acc_firstname"
          id="firstname"
          required
          autocomplete
        />
      </label>
      <label
        >Last Name<span class="required">*</span>
        <input
          type="text"
          name="acc_lastname"
          id="lastname"
          required
          autocomplete
        />
      </label>
      <label
        >Email<span class="required">*</span>
        <input type="email" name="acc_email" id="email" required autocomplete />
      </label>
      <label
        >Password<span class="required">*</span>
        <input
          type="password"
          name="acc_password"
          id="password"
          required
          autocomplete
          title="Password must be at least 12 characters long and include at least one uppercase letter, one number, and one special character."
        />
        <span>
          Passwords must be at least 12 characters and contain at least 1 number,
          1 capital letter and 1 special character
        </span>
      </label>
    </fieldset>
    <fieldset class="submit-btn-container">
      <input type="submit" role="button" value="Signup" />
    </fieldset>
    <div>
      <p>Have account? <a href="/account/login">Login</a></p>
    </div>
  </form>
`;

module.exports = {
  navItemTemplate,
  navTemplate,
  gridTemplate,
  gridInventoryDetailsTemplate,
  noVehiclesTemplate,
  gridErrorTemplate,
  loginGridTemplate,
  signupGridTemplate,
};
