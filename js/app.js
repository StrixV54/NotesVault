const firebaseConfig = {
  apiKey: "AIzaSyBCtBiPl10c0eUD-26fT2_b2-nA1tjA7ic",
  authDomain: "notes-vault-f00b8.firebaseapp.com",
  databaseURL: "https://notes-vault-f00b8-default-rtdb.firebaseio.com",
  projectId: "notes-vault-f00b8",
  storageBucket: "notes-vault-f00b8.appspot.com",
  messagingSenderId: "1003306272358",
  appId: "1:1003306272358:web:ba9173fb1b241c1e7ecfa7"
};

const app = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

const inputBox = document.querySelector(".text-body");
const addBtn = document.querySelector(".notes-add-button");
const ccBtn = document.querySelector(".cancel-btn");
const saveBtn = document.querySelector(".save-btn");
const todoList = document.querySelector(".notes-list");
let idx=null; let listArray=[];
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

getItems();

function getItems(){
  db.collection("notes").onSnapshot((snapshot) => {
      let items = [];
      snapshot.docs.forEach((doc) => {
          items.push({
              id: doc.id, 
              ...doc.data()
          })
      })
      //generateItems(items);
      //todoList.innerHTML="";
      showTasks(items); 
      console.log(items);
  })
}

function addItem(text){
  console.log("Added item");
  let newItem = db.collection("notes").add({
      text: text
  })
}

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

  addItem(userEnteredValue);
  getItems();
  //showTasks(); 
  saveBtn.classList.remove("active"); 
  document.querySelector(".text-preview").style.display="none";
  document.querySelector(".text-blur").style.display="none";
  }
}

function showTasks(items){
  let todoItems = []
    items.forEach((item) => {
        let todoItem = document.createElement("div");
        todoItem.classList.add("notes-list-item");
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("icon");
        let checkMark = document.createElement("div");
        checkMark.innerHTML = '<i class="fas fa-pen-square fa-lg"></i>';
        checkMark.addEventListener("click", function(){
            editTask(item.id);
        })
        let checkMark1 = document.createElement("i");
        checkMark1.innerHTML = '<i class="far fa-times-circle fa-lg" id="exit"></i>';
        checkMark1.addEventListener("click", function(){
            deleteTask(item.id);
        })
        checkContainer.appendChild(checkMark);
        checkContainer.appendChild(checkMark1);

        let todoText = document.createElement("div");
        todoText.classList.add("small-text-body");
        todoText.innerText = item.text;

        todoItem.appendChild(checkContainer);
        todoItem.appendChild(todoText);
        todoItems.push(todoItem)
    })
    todoList.replaceChildren(...todoItems);
    inputBox.value = "";
}

// delete task function
function deleteTask(index){
  console.log("deleted");
  db.collection("notes").doc(index).delete();
  getItems();
}

function editTask(index){
  /*let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  let texx=listArray[index];
  console.log(texx);
  document.querySelector(".text-preview").style.display="block";
  document.querySelector(".text-blur").style.display="block";
  inputBox.value=texx;
  idx=index;*/
  document.querySelector(".text-preview").style.display="block";
  document.querySelector(".text-blur").style.display="block";
  inputBox.value=db.collection("notes").doc(index).text;
  console.log("updated item");
  let newItem = db.collection("notes").doc(index).set({
      text: text
  })
}

const btn_toggle = document.querySelector(".theme-toggle");
const theme = document.querySelector("#theme-link");
      btn_toggle.addEventListener("click", function() {
        if (theme.getAttribute("href") == "./css/light-style.css") {
          theme.href = "./css/dark-style.css";
        } else {
          theme.href = "./css/light-style.css";
        }
      });
