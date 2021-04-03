// console.log("Welcome to Note Making");
display(); //For reloading solution

// To display the notes
function display() {
  let noteField = localStorage.getItem("data"); //getting the localStrorage items (strings)
  if (noteField == null) {
    noteArray = [];
    //noteArray = null;
  } else {
    noteArray = JSON.parse(noteField); //convert string to array using JSON.parse
  }

  let htmlDisplay = "";
  //Template literals used; element being the data in the array, index being its index no.
  //<h4 class="head-note-section">Note ${index + 1}</h4>
  //including title and note as a single object

  noteArray.forEach(function (element, index) {
    htmlDisplay =
      htmlDisplay +
      `<div class="saved-note-section">
          <div class="inside-save-section">
          <h4 class="head-note-section">${element.title}</h4>
          <p class="para-note-section">${element.note}</p>
          <h6 class="date-section">${element.idate}</h6>
          </div>    
          <button class="delete-button" onclick="deleteNote(${index})">Delete</button>
          </div> `;
  });

  let notesDisplay = document.querySelector(".saved-notes");
  if (noteArray.length != 0) {
    notesDisplay.innerHTML = htmlDisplay;
    //console.log("Displaying saved notes");
  } else {
    notesDisplay.innerHTML = `No notes : Add something`;
    //console.log("Displayed 0 notes");
  }
}

//To add a note
let addNote = document.querySelector(".add-button");
addNote.addEventListener("click", function (e) {
  //console.log("Let's add note");
  
  let textField = document.querySelector(".textArea"); //select the textarea
  let textTitle = document.querySelector(".addTitle");

  let noteField = localStorage.getItem("data");
  if (noteField == null) {
    noteArray = [];
  } else {
    noteArray = JSON.parse(noteField);
  }

  //including title and note as a single object
  let notesObject = {
    title: textTitle.value,
    note: textField.value,
    idate: new Date().toUTCString()
  };

  if(notesObject.title==='' || notesObject.note===""){
    console.log("Add a note")
  }else{
    noteArray.push(notesObject);
  }

  localStorage.setItem("data", JSON.stringify(noteArray));
  textField.value = "";
  textTitle.value="";
  //console.log("Note Added to local storage");
  //console.log(noteArray);
  display(); //Display the note

});

//To delete the note
function deleteNote(index) {
  //console.log("Deleting : ", index);
  let noteField = localStorage.getItem("data");
  if (noteField == null) {
    noteArray = [];
  } else {
    noteArray = JSON.parse(noteField);
  }

  noteArray.splice(index, 1); //Splice function to remove elements in array
  localStorage.setItem("data", JSON.stringify(noteArray));
  //console.log("Deleted");
  display();
}

//To search a note using keywords
let searchNote = document.querySelector(".search");
searchNote.addEventListener("input", function () {
  //search the note using input
  let searchText = searchNote.value;
  console.log("Inputing :", searchText);

  if (searchText.value == null) {
    //It will display all the notes even if the input is null
    display();
  }
  let searchButton = document.querySelector(".search-button"); //Using search button
  searchButton.addEventListener("click", function () {
    let textInSection = document.getElementsByClassName("saved-note-section");
    Array.from(textInSection).forEach(function (element) {
      let text = element.getElementsByTagName("p")[0].innerText; //selecting all the 1st paragraph elements
      let titleText=element.getElementsByTagName("h4")[0].innerText;
      if (text.includes(searchText) || titleText.includes(searchText)) {
        element.style.display = "block";
      } else {
        element.style.display = "none"; //vanishes
      }
    });
  });
});
