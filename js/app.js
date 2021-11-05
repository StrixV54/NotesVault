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
const impBtn = document.querySelector(".imp");
const todoList = document.querySelector(".notes-list");
let idx=null; let listArray=[];
let codeNum=0;
//const deleteAllBtn = document.querySelector(".del-button");


addBtn.onclick = ()=>{
  codeNum=0;
  document.querySelector(".text-preview").style.display="block";
  document.querySelector(".text-blur").style.display="block";
}
ccBtn.onclick = ()=>{
  document.querySelector(".text-preview").style.display="none";
  document.querySelector(".text-blur").style.display="none";
  inputBox.value="";
  if(codeNum==1){
    impBtn.classList.remove("active");
    codeNum=0;
  }
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

function addItem(text,num){
  console.log("Added item");
  let newItem = db.collection("notes").add({
      text: text,
      code: num
  })
}

function setItem(index, text, num){
  let newItem = db.collection("notes").doc(index).set({
    text: text,
    code: num
  })
}


saveBtn.onclick = ()=>{ 
  let userEnteredValue = inputBox.value;
  if(userEnteredValue.trim() != 0){
  //console.log("savebtn "+userEnteredValue); 
  if(idx==null){
  addItem(userEnteredValue, codeNum);}
  else{
    setItem(idx, userEnteredValue, codeNum);
    idx=null;
  }
  getItems();
  //showTasks(); 
  saveBtn.classList.remove("active"); 
  codeNum=0;
  impBtn.classList.remove("active");
  document.querySelector(".text-preview").style.display="none";
  document.querySelector(".text-blur").style.display="none";
  }
}

function showTasks(items){
  let todoItems = []
  console.log("code "+codeNum);
    items.forEach((item) => {
        let todoItem = document.createElement("div");
        todoItem.classList.add("notes-list-item");
        /*if(item.code==1){
            todoItem.style.background="#6fb4798a";
        }*/
        let topBar=document.createElement("div");
        topBar.classList.add("topBar");
        let impMark=document.createElement("div");
        impMark.classList.add("mark");
        if(item.code==1){
            impMark.style.background="#2ebce0ab";
        }
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("icon");
        let checkMark = document.createElement("div");
        checkMark.innerHTML = '<i class="fas fa-pen-square fa-lg"></i>';
        checkMark.addEventListener("click", function(){
            editTask(item.id);
        })
        let delMark = document.createElement("div");
        delMark.innerHTML = '<i class="far fa-times-circle fa-lg" id="exit"></i>';
        delMark.addEventListener("click", function(){
            deleteTask(item.id);
        })
        checkContainer.appendChild(checkMark);
        checkContainer.appendChild(delMark);
        topBar.appendChild(impMark);
        topBar.appendChild(checkContainer);

        let todoText = document.createElement("div");
        todoText.classList.add("small-text-body");
        todoText.innerText = item.text;

        todoItem.appendChild(topBar);
        todoItem.appendChild(todoText);
        todoItems.push(todoItem)
    })
    todoList.replaceChildren(...todoItems);
    inputBox.value = "";
}

// delete task function
function deleteTask(index){
  if(confirm("Delete this note!")==true){
    console.log("deleted");
    db.collection("notes").doc(index).delete();
    getItems();
  }
}

function editTask(index){
  let docRef=db.collection("notes").doc(index);
  inputBox.value="Please Wait...";
  codeNum=0;
  docRef.get().then((doc) => {
        console.log("Document data:", doc.data());
        inputBox.value=doc.data().text;
        codeNum=doc.data().code;
        if(codeNum==1){
          impBtn.classList.add("active");
        }
        console.log("code "+codeNum);
  })
  idx=index;
  document.querySelector(".text-preview").style.display="block";
  document.querySelector(".text-blur").style.display="block";
  saveBtn.classList.add("active");
  console.log("updated item");
}

impBtn.onclick = () =>{
  if(impBtn.className=="imp active"){
    impBtn.classList.remove("active");
    codeNum=0;
  }
  else{
    impBtn.classList.add("active");
    codeNum=1;
  }
  console.log("code "+codeNum);
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
