
const recommendations = {
  "Bedroom": ["Laminate Door", "WPVC", "Tough PVC", "Lamination Door"],
  "Bathroom": ["WPVC", "Tough PVC", "Laminate Door", "Lamination Door"],
  "Main door": ["Laminate Door", "Lamination Door", "WPVC", "Tough PVC"],
  "For terrace": ["Laminate Door", "WPVC", "Lamination Door", "Tough PVC"]
};

const prices = {
  "WPVC": 200,
  "Tough PVC": 120,
  "Laminate Door": 250,
  "Lamination Door": 130
};

const descriptions = {
  "WPVC": "Confirm site and installation suitability with the shop.",
  "Tough PVC": "Uses fixed sheet sizes. Final billing depends on the sheet required.",
  "Laminate Door": "Explore available laminate finishes and designs.",
  "Lamination Door": "Explore available laminated finishes and designs."
};

const materials = document.getElementById("materials");
const title = document.getElementById("materialTitle");
const section = materials.closest(".section");

let selectedCategory = null;

function showMaterials(category) {
  selectedCategory = category;
  section.hidden = false;

  document.querySelectorAll(".category").forEach(button => {
    button.classList.toggle("active", button.dataset.category === category);
  });

  title.textContent = "Recommended for " + category;

  materials.innerHTML = recommendations[category].map((name, i) => `
    <button type="button" class="material material-button" data-material="${name}">
      <span class="rank">${i + 1}</span>
      <span><b>${name}</b><small>View material and price details</small></span>
      <span>›</span>
    </button>
  `).join("");

  materials.querySelectorAll("[data-material]").forEach(button => {
    button.addEventListener("click", () => showDetails(button.dataset.material));
  });

  section.scrollIntoView({behavior:"smooth", block:"start"});
}

function showDetails(name) {
  materials.innerHTML = `
    <div class="material-detail">
      <button type="button" id="backMaterials">← Back to materials</button>
      <p class="eyebrow">MATERIAL DETAILS</p>
      <h3>${name}</h3>
      <h2>₹${prices[name].toLocaleString("en-IN")} <small>per sq. ft.</small></h2>
      <p>${descriptions[name]}</p>
      <div class="catalogue-placeholder">
        <b>Door designs will appear here</b>
        <p>Product photos and original design numbers will be added when the shop catalogue is uploaded.</p>
      </div>
    </div>
  `;

  document.getElementById("backMaterials").addEventListener("click", () => {
    showMaterials(selectedCategory);
  });
}

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    showMaterials(button.dataset.category);
  });
});

document.getElementById("calculate").addEventListener("click", () => {
  const width = Number(document.getElementById("width").value);
  const height = Number(document.getElementById("height").value);
  const result = document.getElementById("result");

  if (width <= 0 || height <= 0) {
    result.textContent = "Please enter valid measurements in inches.";
    return;
  }

  result.textContent =
    `Estimated area: ${(width * height / 144).toFixed(2)} sq. ft.`;
});

document.getElementById("ownerBtn").addEventListener("click", () => {
  document.getElementById("ownerDialog").showModal();
});

document.getElementById("enquiryBtn").addEventListener("click", () => {
  document.getElementById("enquiryDialog").showModal();
});

section.hidden = true;
