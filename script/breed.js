"use strict";
// DOM
const nameInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tbodyTable = document.getElementById("tbody");
const pName = document.querySelector(".name-show");
const pType = document.querySelector(".type-show");
// Đặt biến
let breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

// Hàm render table ra giao diện
const renderBreedTable = (arrBreed) => {
  tbodyTable.innerHTML = "";
  arrBreed.forEach((breed, index) => {
    tbodyTable.innerHTML += `
    <tr>
    <td>${index + 1}</td>
    <td>${breed.name}</td>
    <td>${breed.type}</td>
    <td>
    <button type="button" class="btn btn-danger btnDelete" onclick="deleteBreed('${index}')">Delete</button>
    </td>
    </tr>
    `;
  });
};
renderBreedTable(breedArr);

// Các hàm bổ trợ 
const validation = (breed) => {
  resetPshow();
  let isCheck = true;
  //Check name
  if (breed.name === "") {
    pName.textContent = "Must not be blank!";
    isCheck = false;
  }
  if (breed.type === "Select Type") {
    pType.textContent = "Please select Type!";
    isCheck = false;
  }
  if (isCheck) resetInput();
  return isCheck;
};
const resetPshow = () => {
  pName.textContent = "";
  pType.textContent = "";
};
const resetInput = () => {
  document.getElementById("myForm").reset();
};
// Bắt sự kiện submit add Breed
const addBreed = () => {
  const breed = {
    name: nameInput.value,
    type: typeInput.value,
  };
  const isCheckValidate = validation(breed);
  if (!isCheckValidate) return;
  breedArr.push(breed);
  saveToStorage("breedArr", JSON.stringify(breedArr));
  renderBreedTable(breedArr);
};
btnSubmit.addEventListener("click", addBreed);
// Bắt sự kiện delete breed
const deleteBreed = (index) => {
  const confirmWith = confirm("Are you sure");
  if (!confirmWith) return;
  breedArr.splice(index, 1);
  saveToStorage("breedArr", JSON.stringify(breedArr));
  renderBreedTable(breedArr);
};
