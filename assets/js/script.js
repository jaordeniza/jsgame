let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);

const deck = document.getElementById("card-deck");

let moves = 0;
let counter = document.querySelector(".moves");

// variable for matched cards in deck
let matchedCard = document.getElementsByClassName("match");

// close icon in modal
let closeIcon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1")

// array for opened cards
let openedCards = [];

// random cards on deck using math.random
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
};

// shuffles cards when page is refreshed / loads
document.body.onload = startGame();

// function to start a new play 
function startGame(interval){
    // shuffle deck
    cards = shuffle(cards);

    // remove all exisiting classes from each card
    for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    //reset timer
    second = 0;
    timer = document.querySelector(".timer");
    timer.innerHTML = " in 0secs";
    clearInterval(interval);
}

// toggles open and show class to display cards
let displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

// add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    let len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

// when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

// when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}

// disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

// enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

// count number of moves function
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        startTimer();
    }
}

// function for timer
timer = document.querySelector(".timer");
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = "in " + second + "secs";
        second++;

        // game over time limit
        if(second == 45){
            modal.classList.add("show");
            document.querySelector(".popup h2").innerHTML = "Sorry You Lose!";
            document.querySelector(".content-1").style.display = "none";
            document.querySelector(".content-2").innerHTML = "Game Over. Time Limit has passed.";
            clearInterval(interval);
            closeModal();
        }
    },1000);
    return interval;
}

// when all cards match, show modal, moves and time
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        //showing number of moves, total time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();
    };
}

// modal close icon
function closeModal(){
    closeIcon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}

// Play again function
function playAgain(){
    modal.classList.remove("show");
    startGame();
}

// loop to add event listeners to each card
for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};
