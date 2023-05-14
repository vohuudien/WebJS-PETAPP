"use strict";

const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");

let data = JSON.parse(getFromStorage("data")) ?? [];
// Hàm bắt sự kiện export để lưu file JSON về máy
function saveStaticDataToFile() {
  var blob = new Blob([...getFromStorage("data")], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "data.json");
}
exportBtn.addEventListener("click", saveStaticDataToFile);

// Hàm bắt sự kiện import file JSON để cập nhật dữ liệu
function getFileContents() {
  const file = document.getElementById("input-file").files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function () {
      const dataUpdate = JSON.parse(reader.result);
      //Xét dữ liệu bổ xung có trùng với dữ liệu hiện tại
      dataUpdate.forEach((object) => {
        const index = data.findIndex((pet) => pet.id === object.id);
        if (index !== -1) {
          data.splice(index, 1, object);
          console.log(data);
        } else {
          data.push(object);
          console.log(data);
        }
      });
      saveToStorage("data", JSON.stringify(data));
      // Thông báo thành công
      const toastLiveExample = document.getElementById("liveToast");
      const toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
    };

    reader.onerror = function (evt) {
      console.log("thất bại");
    };
  }
}

importBtn.addEventListener("click", getFileContents);
