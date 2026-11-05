
const recommendations = {
  "Bedroom": ["Laminate Door", "WPVC", "Tough PVC", "Lamination Door"],
  "Bathroom": ["WPVC", "Tough PVC", "Laminate Door", "Lamination Door"],
  "Main door": ["Laminate Door", "Lamination Door", "WPVC", "Tough PVC"],
  "For terrace": ["Laminate Door", "WPVC", "Lamination Door", "Tough PVC"]
};

const notes = {
  "Laminate Door": "Shop-recommended option",
  "WPVC": "Confirm site and moisture suitability",
  "Tough PVC": "Practical option; sheet-size rules apply",
  "Lamination Door": "Compare finish and installation requirements"
};

const materials = document.getElementById("materials");
const materialTitle = document.getElementById("materialTitle");

function showMaterials(category) {
  materialTitle.textContent = "Recommended for " + category;

  materials.innerHTML = recommendations[category].map((name, i) => `
    <article class="material">
      <span class="rank">${i + 1}</span>
      <div>
        <b>${name}</b>
        <small>${notes[name]}</small>
      </div>
    </article>
  `).join("");
}

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(item =>
      item.classList.remove("active")
    );

    button.classList.add("active");
    showMaterials(button.dataset.category);
  });
});

document.getElementById("calculate").addEventListener("click", () => {
  const width = Number(document.getElementById("width").value);
  const height = Number(document.getElementById("height").value);
  const result = document.getElementById("result");

  if (width <= 0 || height <= 0) {
    result.textContent = "Please enter valid width and height.";
    return;
  }

  result.textContent =
    "Estimated area: " +
    (width * height / 144).toFixed(2) +
    " sq. ft.";
});

document.getElementById("ownerBtn").addEventListener("click", () => {
  document.getElementById("ownerDialog").showModal();
});

document.getElementById("enquiryBtn").addEventListener("click", () => {
  document.getElementById("enquiryDialog").showModal();
});

showMaterials("Bedroom");
