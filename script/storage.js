'use strict';
function saveToStorage (key, value){
  localStorage.setItem(key,value);
}

function getFromStorage (key){
return localStorage.getItem(key);
}

// Phần đóng mở sidebar 
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});





