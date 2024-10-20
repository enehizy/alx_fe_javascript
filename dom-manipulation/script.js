const quotes = [];
let hardCodedQoutes= [{ text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Inspiration" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
  { text: "Do not watch the clock; do what it does. Keep going.", category: "Productivity" },
  { text: "Believe you can and you're halfway there.", category: "Confidence" },
  { text: "The purpose of our lives is to be happy.", category: "Life" },
  { text: "It does not matter how slowly you go as long as you do not stop.", category: "Perseverance" },
  { text: "You miss 100% of the shots you don’t take.", category: "Risk" },
  { text: "The best way to predict your future is to create it.", category: "Motivation" },
  { text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", category: "Courage" },
  { text: "Strive not to be a success, but rather to be of value.", category: "Success" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Motivation" },
  { text: "Happiness is not something ready made. It comes from your own actions.", category: "Happiness" },
  { text: "The journey of a thousand miles begins with one step.", category: "Perseverance" },
  { text: "What we think, we become.", category: "Mindset" },
  { text: "Difficulties in life are intended to make us better, not bitter.", category: "Growth" },
  { text: "The harder the conflict, the greater the triumph.", category: "Success" },
  { text: "Act as if what you do makes a difference. It does.", category: "Impact" }]  
function  createAddQuoteForm(qoute){
    quotes.push(qoute);
    
}
  
function showRandomQuote(){
    const getRandomQoute=Math.round(Math.random() * (quotes.length -1));
    return quotes[getRandomQoute];
}
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}
function getQuotes(){
  let savedQuotes = localStorage.getItem('quotes');
  if(savedQuotes){
   
        savedQuotes = JSON.parse(savedQuotes);
        quotes.push(...savedQuotes,...hardCodedQoutes)
        return quotes;
        
  }
  else{
    quotes.push(...hardCodedQoutes)
    saveQuotes();
    return quotes;
    
  }
}
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    displayQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}
function exportToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url); 
}

function addQuote(){
   const text =document.getElementById("newQuoteText");
   const category =document.getElementById("newQuoteCategory");
  if(!(text.value === "" && category.value == "")){
    const newQoute ={
        text:text.value,
        category:category.value
       }
      createAddQuoteForm(newQoute)
      saveQuotes(quotes)
      let p = document.createElement("p");
      p.textContent =text;
      quoteDisplay.appendChild()
      let quoteDisplay =document.getElementById("quoteDisplay");
      text.value=" ";
      category.value =" "
     
     
     
  }else{
    alert("text or category field cannot be empty")
  
  }
  
}
function displayRandomQuote(){
 
  let quoteDisplay =document.getElementById("quoteDisplay");
  
  const newQoute =showRandomQuote();
 
   quoteDisplay.innerHTML = `<div><p>${newQoute.text} <p><h5>${newQoute.category}<h5></div>`;
}


function populateCategories(){
  const dropdown =document.getElementById("categoryFilter");
  
  quotes.forEach((qoute)=>{
    const option = document.createElement("option");
    option.innerText = qoute.category;
    dropdown.appendChild(option)
  })
  saveQuotes()
}
function filterQuotes(){
const dropdown =document.getElementById("categoryFilter");
const selectedValue = dropdown.value; 
alert("qoutes to filter")
quotes.filter((qoute)=>{
 return qoute.category === selectedValue
})
console.log(quotes)
}
document.addEventListener('DOMContentLoaded',function(){
  getQuotes();
  populateCategories();
  let newQouteButton =document.getElementById("newQuote");
  newQouteButton.addEventListener("click",displayRandomQuote)
  
})