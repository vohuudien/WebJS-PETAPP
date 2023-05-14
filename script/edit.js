"use strict";
// DOM tới các phần tử trong form
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const submitBtn = document.getElementById("submit-btn");
// DOM tới các phần tử p (phần tử in ra thông báo lỗi)
const pName = document.querySelector(".name-show");
const pAge = document.querySelector(".age-show");
const pType = document.querySelector(".type-show");
const pWeight = document.querySelector(".weight-show");
const pLength = document.querySelector(".length-show");
const pBreed = document.querySelector(".breed-show");

const formEl = document.getElementById("container-form");
const tbodyTable = document.getElementById("tbody");

let data = JSON.parse(getFromStorage("data")) ?? [];

console.log(typeInput.value);

const showTable = (dataShow) => {
  //Xóa dữ liệu cũ trên table
  tbodyTable.innerHTML = "";

  //Chạy lại toàn bộ dữ liệu trong danh sách
  for (let i = 0; i < dataShow.length; i++) {
    //Xử lí ngày
    const now = dataShow[i].date;
    let date;
    let month;
    let year;
    if (typeof now !== "string") {
      date = now.getDate();
      month = now.getMonth() + 1;
      year = now.getFullYear();
    } else {
      let day = new Date(now);
      date = day.getUTCDate();
      month = day.getUTCMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1 để được tháng đúng
      year = day.getUTCFullYear();
    }

    //----------------
    tbodyTable.innerHTML += `<tr >
    <th scope="row">${dataShow[i].id}</th>
    <td>${dataShow[i].name}</td>
    <td>${dataShow[i].age}</td>
    <td>${dataShow[i].type}</td>
    <td>${dataShow[i].weight}</td>
    <td>${dataShow[i].length}</td>
    <td>${dataShow[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${dataShow[i].color}"></i>
    </td>
    <td>${
      dataShow[i].vaccinated
        ? `<i class="bi bi-check-circle-fill"></i>`
        : `<i class="bi bi-x-circle-fill"></i>`
    }</td>
    <td>${
      dataShow[i].dewormed
        ? `<i class="bi bi-check-circle-fill"></i>`
        : `<i class="bi bi-x-circle-fill"></i>`
    }</td>
    <td>${
      dataShow[i].sterilized
        ? `<i class="bi bi-check-circle-fill"></i>`
        : `<i class="bi bi-x-circle-fill"></i>`
    }</td>
    <td>${date}/${month}/${year}</td>
    <td>
      <button type="button" class="btn btn-warning btnEdit" onclick="editPet('${
        dataShow[i].id
      }')">Edit</button>
    </td>
  </tr>`;
  }
};
showTable(data);
//Lắng nghe sự kiện click edit
const editPet = (id) => {
  const dataPetEdit = data.filter((pet) => pet.id === id).shift();
  formEl.classList.remove("hide");
  idInput.value = dataPetEdit.id;
  nameInput.value = dataPetEdit.name;
  ageInput.value = dataPetEdit.age;
  typeInput.value = dataPetEdit.type;
  colorInput.value = dataPetEdit.color;
  weightInput.value = dataPetEdit.weight;
  lengthInput.value = dataPetEdit.length;
  breedInput.innerHTML = `<option>${dataPetEdit.breed}</option>`;
  dewormedInput.checked = dataPetEdit.dewormed;
  vaccinatedInput.checked = dataPetEdit.vaccinated;
  sterilizedInput.checked = dataPetEdit.sterilized;
  showBreed(dataPetEdit.type, "new");
};
const showBreed = (type, stringNew) => {
  const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];
  let choseTypeBreed = [];
  if (!stringNew) breedInput.innerHTML = "<option>Select Breed</option>";
  else if (stringNew === "new") breedInput.innerHTML = "";
  if (type === "Select Type") {
    breedArr.forEach((pet) => {
      if (!choseTypeBreed.includes(pet.name)) {
        choseTypeBreed.push(pet.name);
      }
    });

    choseTypeBreed.forEach((object) => {
      breedInput.innerHTML += `<option>${object}</option>`;
    });
  } else {
    choseTypeBreed = breedArr.filter((breed) => {
      return breed.type === type;
    });

    choseTypeBreed.forEach((object) => {
      breedInput.innerHTML += `<option>${object.name}</option>`;
    });
  }
};
// Lắng nghe sự kiện onchange của select type
typeInput.addEventListener("change", function () {
  showBreed(typeInput.value);
});

//Lắng nghe sự kiện submit
const resetPshow = () => {
  pName.textContent = "";
  pType.textContent = "";
  pWeight.textContent = "";
  pLength.textContent = "";
  pAge.textContent = "";
  pBreed.textContent = "";
};
const resetInput = () => {
  document.getElementById("myForm").reset();
};
const validate = (dataCheck) => {
  resetPshow();
  // Tạo biến isCheck để check toàn bộ form
  let isCheck = true;
  // Check name
  if (dataCheck.name === "") {
    pName.textContent = "Must not be blank!";
    isCheck = false;
  }
  //Check age
  if (dataCheck.age === 0) {
    pAge.textContent = "Must not be blank!";
    isCheck = false;
  } else if (dataCheck.age > 15 || dataCheck.age < 1) {
    pAge.textContent = "Must be between 1 and 15!";
    isCheck = false;
  }
  //Check type
  if (dataCheck.type === "Select Type") {
    pType.textContent = "Please select Type!";
    isCheck = false;
  }
  //Check weight
  if (dataCheck.weight === 0) {
    pWeight.textContent = "Must not be blank!";
    isCheck = false;
  } else if (dataCheck.weight > 15 || dataCheck.weight < 1) {
    pWeight.textContent = "Must be between 1 and 15!";
    isCheck = false;
  }
  //Check length
  if (dataCheck.length === 0) {
    pLength.textContent = "Must not be blank";
    isCheck = false;
  } else if (dataCheck.length > 100 || dataCheck.length < 1) {
    pLength.textContent = "Must be between 1 and 100!";
    isCheck = false;
  }
  //Check Breed
  if (dataCheck.breed === "Select Breed") {
    pBreed.textContent = "Please select Breed after selecting Type!";
    isCheck = false;
  }
  //check tổng
  if (isCheck) {
    resetInput();
  }
  return isCheck;
};
const edit = () => {
  const dataPet = {
    id: idInput.value,
    name: nameInput.value,
    age: +ageInput.value,
    type: typeInput.value,
    weight: +weightInput.value,
    length: +lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  const isCheckValidate = validate(dataPet);
  if (!isCheckValidate) return;
  data.splice(
    data.findIndex((pet) => pet.id === dataPet.id),
    1,
    dataPet
  );
  saveToStorage("data", JSON.stringify(data));
  // Thông báo thành công
  const toastLiveExample = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
  // Gọi hàm để show ra màn hình
  showTable(data);
};
submitBtn.addEventListener("click", edit);
