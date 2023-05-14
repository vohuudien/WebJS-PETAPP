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
const calculateBtn = document.querySelector("#calculateBtn");
// DOM tới các phần tử p (phần tử in ra thông báo lỗi)
const pId = document.querySelector(".id-show");
const pName = document.querySelector(".name-show");
const pAge = document.querySelector(".age-show");
const pType = document.querySelector(".type-show");
const pWeight = document.querySelector(".weight-show");
const pLength = document.querySelector(".length-show");
const pBreed = document.querySelector(".breed-show");

// Các hàm xử lí dữ liệu\
let data = JSON.parse(getFromStorage("data")) ?? [];
// DOM tới Table show dữ liệu trong data
const tbodyTable = document.getElementById("tbody");
const showTable = (dataShow) => {
  //Xóa dữ liệu cũ trên table
  tbodyTable.innerHTML = "";
  //Ẩn hiện button tính điểm BMI
  dataShow.length !== 0
    ? calculateBtn.classList.remove("d-none")
    : calculateBtn.classList.add("d-none");
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
    <td>${
      typeof dataShow[i].BMI === "number" ? dataShow[i].BMI.toFixed(2) : "?"
    }</td>
    <td>${date}/${month}/${year}</td>
    <td>
      <button type="button" class="btn btn-danger btnDelete" onclick="deletePet('${
        dataShow[i].id
      }')">Delete</button>
    </td>
  </tr>`;
  }
};
showTable(data);
// DOM và show dữ liệu Breed 
let breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];
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

//Các hàm hỗ trợ cho sự kiện submit
const validate = (dataCheck) => {
  // Tạo biến isCheck để check toàn bộ form
  let isCheck = true;
  //Check ID
  if (dataCheck.id === "") {
    pId.textContent = "Must not be blank!";
    isCheck = false;
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === dataCheck.id) {
        pId.textContent = "Must be unique!";
        isCheck = false;
      }
    }
  }
  // Check name
  if(dataCheck.name===""){
  pName.textContent="Must not be blank!"
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
    resetPshow();
    resetInput();
  }
  return isCheck;
};
const resetPshow = () => {
  pId.textContent = "";
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

const addPet = () => {
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
  resetPshow();
  const isCheckValidate = validate(dataPet);
  if (!isCheckValidate) return;
  // Đưa data đã check thành công vào dữ liệu tổng
  data.push(dataPet);
  console.log(data);
  saveToStorage("data", JSON.stringify(data));
  // Thông báo thành công
  const toastLiveExample = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
  // Gọi hàm để show ra màn hình
  showTable(data);
};
// Bắt sự kiện Submit add
submitBtn.addEventListener("click", addPet);
// Bắt sự kiện delete
const deletePet = (idDelete) => {
  //Tạo thao tác xác nhận delete
  const confirmWith = confirm("Are you sure");
  if (!confirmWith) return;
  //Bắt đầu xóa trên dữ liệu tổng
  const indexDelete = data.findIndex((pet) => pet.id === idDelete);
  data.splice(indexDelete, 1);
  saveToStorage("data", JSON.stringify(data));
  
  //Show lại dữ liệu tổng
  showTable(data);
};

// Bắt sự kiện Show healthy Pet
let isShowAll = true;
let healthyPetArr = []
const btnHealthy = document.getElementById("healthy-btn");
btnHealthy.addEventListener("click", function () {
  healthyPetArr = data.filter((pet)=> pet.vaccinated&&pet.dewormed&&pet.sterilized)
  isShowAll = !isShowAll;
  if (isShowAll) {
    btnHealthy.textContent = "Show Healthy Pet";
    showTable(data);
  } else {
    btnHealthy.textContent = "Show All Pet";
    showTable(healthyPetArr);
  }
});

// Bắt sự kiện Button tính điểm
const calculateData = (dataCalculate) => {
  for (let i = 0; i < dataCalculate.length; i++) {
    if (typeof dataCalculate[i].BMI === "number") {
      continue;
    }
    dataCalculate[i].BMI = function () {
      if (this.type === "Dog") {
        this.BMI = (this.weight * 703) / this.length ** 2;
      } else if (this.type === "Cat") {
        this.BMI = (this.weight * 886) / this.length ** 2;
      }
      return this.BMI;
    },
    dataCalculate[i].BMI();
  }
};
calculateBtn.addEventListener("click", function () {
  calculateData(data);
  calculateData(healthyPetArr);
  isShowAll ? showTable(data) : showTable(healthyPetArr);
});


//Bắt sự kiện chọn type cho thú cưng
typeInput.addEventListener('change',(event)=>{
  const choseType = event.target.value;
  console.log(choseType);
  showBreed(choseType);
})