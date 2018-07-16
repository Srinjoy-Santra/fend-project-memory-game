/*
 * Create a list that holds all of your cards
 */

let cards = document.getElementsByClassName('card');
/*cards = [...cards];*/
//console.log(cards);

let deck = document.querySelector('.deck');
var cardsOpened = [];

let moves = document.querySelector('.moves');
let count=0;

let timer = document.querySelector('.timer>span');
var interval;
var seconds = 0;
let session = false;

const refresh = document.querySelector('.restart');
let stars = document.getElementsByClassName('fa-star');
console.log(stars);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function beginPlay(){
     for(var y=0; y<cards.length; y++)
         cards[y].classList.remove("show", "open","match");
    cards = shuffle(cards);
    
    /*console.log(shuffledCards);*/
    for(var y=0; y<cards.length; y++)
        {
            
            console.log(cards[y]);
            deck.appendChild(cards[y]);
            
        }
    count = 0;
    moves.innerHTML=count;
    clearInterval(interval);
    clearTimeout(interval)
    seconds = 0;
    timer.innerHTML= seconds;
    session = false;
    for(var t=0; t<stars.length; t++)
        stars[t].setAttribute("style","visibility: visible;");
       
}
function reset(){
    console.log('restarted');
    beginPlay();
}
refresh.addEventListener('click',beginPlay);  
document.body.onload = beginPlay();





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)*/
 
var displayCard = function(){
    movesRating();
    if(!session)
        runTimer();
    if(cardsOpened.length === 1 && cardsOpened[0] === this && cardsOpened[0].classList.find("open","show"))
        return;
    this.classList.toggle("open");
    this.classList.toggle("show");
    /*this.classList.toggle("disabled");*/
}
function matched(){
    cardsOpened[0].classList.add("match");
    cardsOpened[1].classList.add("match");
    cardsOpened[0].classList.remove("show", "open");
    cardsOpened[1].classList.remove("show", "open");
    
    console.log(cards.classList);
    var allMatched=true;
    for (var i=0;i<cards.length;i++)
    {
        allMatched = cards[i].classList.contains("match");
        if(!allMatched)
            return;
    }
    
    if(allMatched)
    {
        clearInterval(interval);
        clearTimeout(interval)
        //seconds = 0;
        //timer.innerHTML= seconds;
        session = false;
    }
            
}

function flipCard(cardsOpened){
        console.log('We will rock you!'+cardsOpened);
        
        /*cardsOpened[0].classList.remove("show", "open", "unmatched");
        cardsOpened[1].classList.remove("show", "open", "unmatched");*/
        //enable();
        
    }

function unmatched(){
    /*cardsOpened[0].classList.add("unmatched");
    cardsOpened[1].classList.add("unmatched");*/
    console.log(cardsOpened);
    cardsOpened[0].classList.remove("show", "open");
    cardsOpened[1].classList.remove("show", "open");
    //setTimeout(flipCard(cardsOpened),15000);
}

function openCards(){
    if(cardsOpened.length === 2)
        {
            unmatched();
            cardsOpened=[];
        }
    var icon = this.querySelector('i').classList;
    console.log(icon[1]);
    cardsOpened.push(this);
    /*console.log(cardsOpened);*/
    if(cardsOpened.length === 2)
        {
            var fstr = cardsOpened[0].querySelector('i').classList;
            var lstr = cardsOpened[1].querySelector('i').classList;
            
            if(fstr[1] === lstr[1])
                {
                    console.log('Cards Matched!!');
                    matched();
                    cardsOpened=[];
                }
            else
                {
                     
                }
                
            
        }
}

function movesRating()
{

    count = count + 1;
    moves.innerHTML=count;
    if(count > 28)
        {
            stars[1].setAttribute("style","visibility: hidden;");
            stars[2].setAttribute("style","visibility: hidden;");
        }
    else if(count > 16)
        stars[2].setAttribute("style","visibility: hidden;");
           
}



function runTimer()
{
    session = true;
    interval = setInterval(function(){
        seconds += 1;
        timer.innerHTML=seconds;
    },1000);
}
 for(var i=0;i<cards.length;i++)
    {
        /*console.log(cards[i]);*/
        /*cards[i].addEventListener("dbclick",displayCard);
        cards[i].addEventListener("dbclick",openCards);*/
        cards[i].addEventListener("click",displayCard);
        cards[i].addEventListener("click",openCards);
    }
    
/*let cardIndices= [
                    [0,0],[0,1],[0,2],[0,3],
                    [1,0],[1,1],[1,2],[1,3],
                    [2,0],[2,1],[2,2],[2,3],
                    [3,0],[3,1],[3,2],[3,3]
                 ];

let listOfIcons = [
                    "fa fa-diamond",
                    "fa fa-paper-plane-o",
                    "fa fa-anchor",
                    "fa fa-bolt",
                    "fa fa-cube",
                    "fa fa-leaf",
                    "fa fa-bicycle",
                    "fa fa-diamond",
                    "fa fa-bomb",
                    ];*/