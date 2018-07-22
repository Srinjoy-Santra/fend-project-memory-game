
//Restart the game
const refresh = document.querySelector('.restart');
//holds all cards
let cards = document.getElementsByClassName('card');
//deck of all cards
let deck = document.querySelector('.deck');
//cards selected at a given time
let cardsOpened;
//counting number of moves
let moves = document.querySelector('.moves');
let count;
//counting the time elapsed in a play
let timer = document.querySelector('.timer>span');
let session;
let interval;
let seconds;

//counting the number of stars
let stars = document.getElementsByClassName('fa-star');
let starCount;
//setting the modal values
let stary = document.querySelector('.stary');
let timey = document.querySelector('.timey');


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Start the game */
function beginPlay(){
     for(let y=0; y<cards.length; y++)
         cards[y].classList.remove("show", "open","match","shake","wobble","animated");
    cards = shuffle(cards);
    cardsOpened = [];
    for(let y=0; y<cards.length; y++)
        {
            
            console.log(cards[y]);
            deck.appendChild(cards[y]);
            
        }
    count = 0;
    starCount = 0;
    moves.textContent=count;
    clearInterval(interval);
    clearTimeout(interval)
    seconds = 0;
    timer.textContent= seconds;
    session = false;
    for(let t=0; t<stars.length; t++)
        stars[t].setAttribute("style","visibility: visible;");
       
}

refresh.addEventListener('click',beginPlay);  
document.body.onload = beginPlay();

/* Display the selected card */
let displayCard = function(){
    movesRating();
    if(!session)
        runTimer();
    if(cardsOpened.length === 1 && cardsOpened[0] === this && cardsOpened[0].classList.contains("open","show"))
        return;
    /*this.classList.toggle("open");
    this.classList.toggle("show");*/
    this.classList.add("show","open","disable");
    //openCards();
}

/* Carry card match operation */
function matched(){
    cardsOpened[0].classList.add("match","wobble","animated");
    cardsOpened[1].classList.add("match","wobble","animated");
    cardsOpened[0].classList.remove("show", "open");
    cardsOpened[1].classList.remove("show", "open");
    
    console.log(cards.classList);
    let allMatched=true;
    for (let i=0;i<cards.length;i++)
    {
        allMatched = cards[i].classList.contains("match");
        if(!allMatched)
            return; 
    }
    
    if(allMatched)
    {
        
        modal.setAttribute("style","display: block;");
        timey.textContent = seconds;
        stary.textContent = starCount;
        clearInterval(interval);
        clearTimeout(interval);
        session = false;
    }
            
}

/* Carry card unmatch operation */
function unmatched(){
    console.log(cardsOpened);
    
    cardsOpened[0].classList.add("shake","animated");
    cardsOpened[1].classList.add("shake","animated");
    setTimeout(closeAfter, 1500,cardsOpened);
    
}

/* Close cards after a moment */
function closeAfter(closeCards){
        console.log(closeCards);
        closeCards[0].classList.remove("show", "open","shake","animated","disable");
        closeCards[1].classList.remove("show", "open","shake","animated","disable");
}

/* Respond to selected cards */
function openCards(){
    /*if(cardsOpened.length === 2)
        {
               
                    unmatched();
                    cardsOpened=[];
        }*/
    let icon = this.querySelector('i').classList;
    console.log(icon[1]);
    cardsOpened.push(this);
    if(cardsOpened.length === 2)
        {
            let fstr = cardsOpened[0].querySelector('i').classList;
            let lstr = cardsOpened[1].querySelector('i').classList;
            
            if(fstr[1] === lstr[1])
                {
                    console.log('Cards Matched!!');
                    matched();
                    cardsOpened=[];
                }
            else
                {
                    
                    
                    unmatched();
                    cardsOpened=[];
                    
                }
                
            
        }
}

/* Update the moves and the star ratings */
function movesRating()
{

    count = count + 1;
    moves.innerHTML=count;
    if(count > 28)
        {
            starCount = 1;
            stars[1].setAttribute("style","visibility: hidden;");
            stars[2].setAttribute("style","visibility: hidden;");
        }
    else if(count > 16)
        starCount = 2;
        stars[2].setAttribute("style","visibility: hidden;");
           
}

/* Compute time elapsed */
function runTimer()
{
    session = true;
    interval = setInterval(function(){
        seconds += 1;
        timer.innerHTML=seconds;
    },1000);
}
 for(let i=0;i<cards.length;i++)
    {
        cards[i].addEventListener("click",displayCard);
        cards[i].addEventListener("click",openCards);
    }
 

// Get the modal
let modal = document.getElementById('myModal');

// Get the button that opens the modal
let replay = document.getElementById("replay");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

replay.onclick = function()
{
    modal.style.display = "none";
    beginPlay();
}