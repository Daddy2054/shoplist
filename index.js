import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
  databaseURL: "https://shoplist-bd25a-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList');

onValue(shoppingListInDB, (snapshot) => {
  clearList();
  if (snapshot.exists()) {
    // console.log(snapshot.val());
    let listArray = Object.entries(snapshot.val());
    // const data = snapshot.val();
    for (let i = 0; i < listArray.length; i++) {
      let currentItem = listArray[i];
      let currentItemID = currentItem[0]
      let currentItemValue = currentItem[1]
      // console.log(currentItem);
      addToList(currentItem);
      // addToList(listArray[i]);
    }
  } else {
    listEl.innerHTML = "No items here... yet"
  }
  // console.log(listArray);
})

const inpEl = document.getElementById('input-field');
const addBtn = document.getElementById('add-button');
const listEl = document.getElementById('shopping-list');

addBtn.addEventListener('click', () => {
  if (inpEl.value.trim() !== '') {
    const inputText = inpEl.value;
    push(shoppingListInDB, inputText);
    clearInput();
    // console.log(`${inputText} added to database`)
    // addToList(inputText);
  }
})

function clearInput() {
  inpEl.value = '';
}
function clearList() {
  listEl.innerHTML = '';
}

function addToList(item) {
  // listEl.innerHTML += `<li>${item}</li>`
  let itemID = item[0]
  let itemValue = item[1]
  let newEl = document.createElement('li');
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    // console.log(itemID)
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemInDB);
  })
  listEl.append(newEl);
}
