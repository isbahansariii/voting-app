let nameInp = document.querySelector("#name");
let submitBtn = document.querySelector("#submit");
let list = document.querySelector("#list");
let listEl = document.querySelectorAll(".list-el");
let add = document.querySelector("#add");
let home = document.querySelector("#home");
let container = document.querySelector("#container");

let votes = [];
let listElArr = [];
let absentElement = true;
let addCheck = true;

listEl.forEach((el, idx) => {
  listElArr[idx] = el.innerText;
  votes[idx] = 0;
});

let createElement = (input) => {
  let newEl = document.createElement("li");
  newEl.innerText = input;
  list.prepend(newEl);

  let newPara = document.createElement("p");
  newPara.innerText = "0";
  newEl.append(newPara);

  //updating(adding) class of list
  newEl.classList.add("list-el");

  //updating(adding) class of paragraph
  newPara.classList.add("vote");

  // update vote array
  votes.unshift(0);

  //update List Vote
  updateListVotes();
};

let update = (input) => {
  // upadting array
  listElArr = listElArr.concat(input);
  createElement(input);
};

let check = (input) => {
  listElArr.forEach((val) => {
    if (val === input) {
      alert("Already Added");
      absentElement = false;
    }
  });
  if (absentElement) {
    update(input);
  }
};

let getInput = () => {
  let input = nameInp.value;
  check(input);
  nameInp.value = "";
  return input;
};

let updateList = () => {
  getInput();
};

// for casting of vote
let updateListVotes = () => {
  let listElPara = document.querySelectorAll(".vote");

  listElPara.forEach((el, idx) => {
    el.parentNode.addEventListener("click", () => {
      el.innerText = votes[idx]++;
    });
  });
};

//First time use
updateListVotes();

//styling purpose
let hideSubmitBtn = () => {
  submitBtn.classList.add("hide");
  submitBtn.classList.remove("animateX");
};

let showSubmitBtn = () => {
  submitBtn.classList.remove("hide");
  submitBtn.classList.add("animateX");
};

let showHideInput = () => {
  if (addCheck) {
    nameInp.classList.remove("hide");
    nameInp.classList.add("animate");
    addCheck = false;
  } else {
    nameInp.classList.add("hide");
    nameInp.classList.remove("animate");
    hideSubmitBtn();
    addCheck = true;
  }
};

let hideInput = () => {
  nameInp.classList.add("hide");
  container.classList.add("animate");
  setTimeout(() => {
    container.classList.remove("animate");
  }, 1000);
  hideSubmitBtn();
  addCheck = true;
};

nameInp.addEventListener("focusin", showSubmitBtn);
submitBtn.addEventListener("click", hideSubmitBtn);
add.addEventListener("click", showHideInput);
home.addEventListener("click", hideInput);
submitBtn.addEventListener("click", updateList);
