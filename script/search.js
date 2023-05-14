"use strict";
// DOM tới các phần tử trong form
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");
// DOM tới các phần tử p (phần tử in ra thông báo lỗi)
const pName = document.querySelector(".name-show");
const pAge = document.querySelector(".age-show");
const pType = document.querySelector(".type-show");
const pWeight = document.querySelector(".weight-show");
const pLength = document.querySelector(".length-show");

const formEl = document.getElementById("container-form");
const tbodyTable = document.getElementById("tbody");

let data = JSON.parse(getFromStorage("data")) ?? [];
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
  </tr>`;
  }
};
showTable(data);
const showBreed = (type) => {
  const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];
  breedInput.innerHTML = "<option>Select Breed</option>";
  let choseTypeBreed = [];
  if(type === "All" || type ==="Select Type"){
    breedArr.forEach((pet) => {
      if (!choseTypeBreed.includes(pet.name)) {
        choseTypeBreed.push(pet.name);
      }
    });
    choseTypeBreed.forEach((object) => {
      breedInput.innerHTML += `<option>${object}</option>`;
    });
  }else {
    choseTypeBreed = breedArr.filter((breed) => {
      return breed.type === type;
    });
    choseTypeBreed.forEach((object) => {
      breedInput.innerHTML += `<option>${object.name}</option>`;
    });
  }
   
};
showBreed("All");
// Lắng nghe sự kiện onchange của select type
typeInput.addEventListener("change", function () {
  showBreed(typeInput.value);
});
const findInfo = () => {
  const pet = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  console.log(pet);
  let dataChose = [...data];
  if (pet.id !== "")
    dataChose = dataChose.filter((object) =>
      object.id.toLowerCase().includes(pet.id.toLowerCase())
    );
  if (pet.name !== "")
    dataChose = dataChose.filter((object) =>
      object.name.toLowerCase().includes(pet.name.toLowerCase())
    );

  if (pet.type !== "Select Type")
    dataChose = dataChose.filter((object) => object.type === pet.type);

  if (pet.breed !== "Select Breed")
    dataChose = dataChose.filter((object) => object.breed === pet.breed);
  if (pet.vaccinated)
    dataChose = dataChose.filter(
      (object) => object.vaccinated === pet.vaccinated
    );
  if (pet.dewormed)
    dataChose = dataChose.filter((object) => object.dewormed === pet.dewormed);

  if (pet.sterilized)
    dataChose = dataChose.filter(
      (object) => object.sterilized === pet.sterilized
    );

  showTable(dataChose)
};
findBtn.addEventListener("click", findInfo);
