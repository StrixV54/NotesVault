const inputBox = document.querySelector(".text-body");
const addBtn = document.querySelector(".notes-add-button");
const ccBtn = document.querySelector(".cancel-btn");
const saveBtn = document.querySelector(".save-btn");
const todoList = document.querySelector(".notes-list");
let idx=null;
//const deleteAllBtn = document.querySelector(".del-button");

addBtn.onclick = ()=>{
  document.querySelector(".text-preview").style.display="block";
  document.querySelector(".text-blur").style.display="block";
}
ccBtn.onclick = ()=>{
  document.querySelector(".text-preview").style.display="none";
  document.querySelector(".text-blur").style.display="none";
}

inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; 
  console.log("Hello");
  if(userEnteredValue.trim() != 0){ 
    saveBtn.classList.add("active"); 
  }else{
    saveBtn.classList.remove("active"); 
  }
}

showTasks(); 

saveBtn.onclick = ()=>{ 
  let userEnteredValue = inputBox.value;
  if(userEnteredValue.trim() != 0){
  //console.log("savebtn "+userEnteredValue); 
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  if(getLocalStorageData == null){ 
    listArray = []; 
  }else{
    listArray = JSON.parse(getLocalStorageData);  
  }
  if(idx!=null){
    listArray.splice(idx, 1); 
    localStorage.setItem("New Todo", JSON.stringify(listArray));
  }
  listArray.push(userEnteredValue); 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
  saveBtn.classList.remove("active"); 
  document.querySelector(".text-preview").style.display="none";
  document.querySelector(".text-blur").style.display="none";
  }
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  /*
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active"); 
  }else{
    deleteAllBtn.classList.remove("active"); 
  }*/
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<div class="notes-list-item"><span class="icon"><i class="fas fa-pen-square fa-lg" onclick="editTask(${index})"></i><span class="exit" ondblclick="deleteTask(${index})"><i class="far fa-times-circle fa-lg"></i></span></span>${element}</div></div>`;
    //newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; 
  inputBox.value = ""; 
}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
}
function editTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  let texx=listArray[index];
  console.log(texx);
  //listArray.splice(index, 1); 
  //localStorage.setItem("New Todo", JSON.stringify(listArray));
  document.querySelector(".text-preview").style.display="block";
  document.querySelector(".text-blur").style.display="block";
  inputBox.value=texx;
  idx=index;
}
/*
deleteAllBtn.onclick = ()=>{
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  if(getLocalStorageData == null){ 
    listArray = []; 
  }else{
    listArray = JSON.parse(getLocalStorageData); 
    listArray = []; 
  }
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); 
}*/
const btn_toggle = document.querySelector(".theme-toggle");
const theme = document.querySelector("#theme-link");
      btn_toggle.addEventListener("click", function() {
        if (theme.getAttribute("href") == "./css/light-style.css") {
          theme.href = "./css/dark-style.css";
        } else {
          theme.href = "./css/light-style.css";
        }
      });
