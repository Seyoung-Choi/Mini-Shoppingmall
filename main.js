//Fetch the items from the JSON file
//JASON.data를 불러온다
function loadItems() {
  return fetch("data/data.json")
    .then((Response) => Response.json())
    .then((json) => json.items); //json.itms만 가져옴
}
function displayItems(items) {
  const container = document.querySelector(".items");
  //map,join(한가지 문자열로 병합해줌)
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}
function createHTMLString(item) {
  return `
    <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
    <span class="item_description">${item.gender},${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

//버튼 이벤트
function setEventListner(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems());
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

//main
//loadItems함수의 item을 가져온다
//error 처리로 catch
loadItems()
  .then((items) => {
    console.log(items);
    displayItems(items); //함수호출
    setEventListner(items);
  })
  .catch(console.log);
