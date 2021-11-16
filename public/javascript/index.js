const charactersAPI = new APIHandler("http://localhost:8000");
// let name = document.querySelector(".name");
// let occupation = document.querySelector(".occupation");
// let name = document.querySelector(".cartoon");
// let name = document.querySelector(".weapon");

let divAllMinions = document.querySelector(".characters-container");

window.addEventListener("load", () => {
  document.getElementById("fetch-all").addEventListener("click", function (event) {
    loadDatafromAPI();
  });

  document.getElementById("fetch-one").addEventListener("click", function (event) {
    event.preventDefault();
    let inputId = document.querySelector(".operation input").value;

    charactersAPI.getOneRegister(inputId).then((minion) => {
      let cardMinion = "";
      cardMinion = `
            <div class="character-info">
              <div class="name"> Character Name: ${minion.data.name}}</div>
              <div class="occupation">Character ocupattion: ${minion.data.occupation}}</div>
              <div class="cartoon"> Is cartoon: ${minion.data.cartoon}}</div>
              <div class="weapon">Character weapon${minion.data.weapon}}</div>
            </div>`;

      divAllMinions.innerHTML = cardMinion;
    });
  });

  document.getElementById("delete-one").addEventListener("click", function (event) {
    event.preventDefault();
    let inputId = document.querySelector(".operation.delete input").value;

    charactersAPI.deleteOneRegister(inputId).then((res) => {
      document.querySelector("#delete-one").style.background = "green";
      console.log("Elemento borrado", res);
    });
  });

  document.getElementById("edit-character-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let editCharacterInputs = document.querySelectorAll("#edit-character-form input");

    let name = editCharacterInputs[1].value;
    let occupation = editCharacterInputs[2].value;
    let weapon = editCharacterInputs[3].value;
    let cartoon = editCharacterInputs[4].checked;
    let id = editCharacterInputs[0].value;
    console.log(id, name, occupation, weapon, cartoon);

    charactersAPI
      .updateOneRegister(id, { name, occupation, weapon, cartoon })
      .then((res) => {
        document.querySelector("#edit-character-form button").style.background = "green";
      })
      .catch((err) => {
        document.querySelector("#edit-character-form button").style.background = "red";
      });
  });

  document.getElementById("new-character-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let newCharacterInputs = document.querySelectorAll("#new-character-form input");

    let name = newCharacterInputs[0].value;
    let occupation = newCharacterInputs[1].value;
    let weapon = newCharacterInputs[2].value;
    let cartoon = newCharacterInputs[3].checked;

    charactersAPI
      .createOneRegister({ name, occupation, weapon, cartoon })
      .then((res) => {
        console.log(res);
        document.querySelector("#new-character-form button").style.background = "green";
        document.querySelector("#new-character-form").reset();
      })
      .catch((err) => {
        document.querySelector("#new-character-form button").style.background = "red";
      });
  });
});

function loadDatafromAPI() {
  charactersAPI.getFullList().then((res) => {
    let charList = "";
    res.data.forEach((minion) => {
      charList += `
            <div class="character-info">
              <div class="name"> Character Name: ${minion.name}}</div>
              <div class="occupation">Character ocupattion: ${minion.occupation}}</div>
              <div class="cartoon"> Is cartoon: ${minion.cartoon}}</div>
              <div class="weapon">Character weapon${minion.weapon}}</div>
            </div>`;
    });

    divAllMinions.innerHTML = charList;
  });
}
