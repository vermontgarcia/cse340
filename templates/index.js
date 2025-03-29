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

module.exports = {
  navItemTemplate,
  navTemplate,
  gridTemplate,
  gridInventoryDetailsTemplate,
};
