const word = document.getElementById("word");
const search = document.getElementById("search");
const display = document.getElementById("display");
const cardResult = document.getElementById("cardResult");
const searchedWord = document.getElementById("searchedWord");
const partOfSpeechDiv = document.getElementById("partOfSpeechDiv");
const partOfSpeechHeader = document.getElementById("partOfSpeechHeader");
const partOfSpeechPara = document.getElementById("partOfSpeechPara");
const meaningHeader = document.getElementById("meaningHeader");
const meaningText = document.getElementById("meaningText");
const audioDiv = document.getElementById("audio");

search.addEventListener("click", async () => {
  try {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.value.toLowerCase()}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data);
  } catch (error) {
    alert("Mind checking your spelling? 🤔");
  }
});

const displayData = (data) => {
  //console.log(data);

  searchedWord.innerHTML = data[0].word;

  const partOfSpeech = data[0].meanings[0].partOfSpeech;
  const meanings = data[0].meanings[0].definitions;

  partOfSpeechHeader.innerHTML = "Part of Speech";
  partOfSpeechPara.innerHTML = partOfSpeech;

  let meaningList = ``;
  meanings.forEach((meaning, ind) => {
    meaningList += `<li>${meaning.definition} </li><br>`;
  });

  meaningHeader.innerHTML = "Meanings";
  meaningText.innerHTML = meaningList;

  let aud = `<audio src="${data[0].phonetics[0].audio}" controls style="width:100%">`;
  audioDiv.className = "block";
  audioDiv.innerHTML = aud;

  cardResult.style.display = "block";
};
