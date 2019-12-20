  /*
   * Create a cardList that holds all of your cards in seperated items
   */

  let cardList = document.getElementsByClassName("card");
  let cardlistArray = [...cardList];
  let deckul = document.getElementById("deckid");//ul element of all cards
  let starsul = document.getElementById("starsul");//list of stars
  let resetB = document.getElementById("resetGame");//restart button
  let movesCounter = 0;
  function initializeAndrandomizeCards() {
    //to random all elements of array and store it in cardlistArray
    cardlistArray = shuffle(cardlistArray);
    // remove all innerhtml from deckul and then append all elements of the shuffled array for each item
    for (var i = 0; i < cardlistArray.length; i++) {
      deckul.innerHTML = "";
      [].forEach.call(cardlistArray, function(item) {
        deckul.appendChild(item);
      });
      // remove all exisiting classes from each card
      cardlistArray[i].classList.remove("show", "open", "match");
    }
  }
  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  //will display number of moves in related section
  function displayMovesCounter() {
    if (movesCounter >= 0) {
      let movesn = document.querySelector('.moves');
      movesn.textContent = movesCounter;
    }
  }
//this method will return new innerhtml for deckul
  function starsRating() {
    if (matchedCards.length >= 0 && matchedCards.length <= 4) {
      starsul.innerHTML = "";
      //this will loop 2 times to create another innerhtml for deckul
      for (var i = 0; i <= 2; i++) {
        var child = document.createElement('li');
        child.innerHTML = '<i class="fa fa-star"></i>';
        starsul.appendChild(child);
      }
      return starsul;
    }
    if (matchedCards.length > 4 && matchedCards.length <= 10) {
      starsul.innerHTML = "";
      for (var i = 0; i <= 1; i++) {
        var child = document.createElement('li');
        child.innerHTML = '<i class="fa fa-star"></i>';
        starsul.appendChild(child);
      }

    }
    if (matchedCards.length > 10 && matchedCards.length <= 16) {
      starsul.innerHTML = "";
      for (var i = 0; i === 0; i++) {
        var child = document.createElement('li');
        child.innerHTML = '<i class="fa fa-star"></i>';
        starsul.appendChild(child);
      }
      return starsul;
    }
  }

  resetB.addEventListener('click', function(e) {
    //to refresh the current page and make everything back to start phase
    location.reload();
    console.log("is clicked");
  });
  //All variables below needed to set timer
  var s = 0,
    m = 0;
//  h = 0; //for later use
  let timer = document.getElementById("timer")
  var interval;
  //*.End of variables
  function startGameTimer() {
    interval = setInterval(function() {
      timer.innerHTML = m + " minutes " + s + " seconds ";
      s++;
      if (s == 60) {
        m++;
        s = 0;
      }
      if (m == 60) {
      //  h++; //for later use
        m = 0;
      }
    }, 1000);
  }
  /*
   * All functions needed to start when the page is loaded and game is start
   */
    initializeAndrandomizeCards();
    startGameTimer();

  /*
   * All needed variables for responsiding to clicks and other events to respond.
   */
  let cards = document.querySelectorAll('.card');
  let opensCards = []; //this as temporary array for two cards to compare
  let matchedCards = []; //this array to store only matched cards
  var secondCardClicked = null; // store the value of secondCardClicked temporary as null before begin
  /*
   * add the event listener for each to all cards. If a card is clicked:
   */
  cards.forEach(function(cardind) {
    cardind.addEventListener('click', function(e) {
      //to say is not opened before or shown before
      if (!cardind.classList.contains("open") && !cardind.classList.contains("show")) {
        movesCounter = movesCounter + 1;
        cardind.classList.add("open");
        cardind.classList.add("show");
        opensCards.push(cardind.innerHTML); //add its li  to the list of opens cards
        displayMovesCounter();//to display the moves in realtime
        starsRating();//to display the rating in realtime

        console.log("cluc");

        if (secondCardClicked) {
          console.log(secondCardClicked, cardind);
  //now check if the open cards is matched or not, only if the opencards has two items
          compareTwoCards(cardind);
        } else {
          secondCardClicked = cardind;
        }
      }
    });
  });

  function compareTwoCards(cardind) {
    if (opensCards.length === 2) {

      if (opensCards[0] === opensCards[1]) {
        cardind.classList.add("match");
        secondCardClicked.classList.add("match");
        console.log("matched");
        opensCards = [];
        matchedCards.push(cardind, secondCardClicked);
        secondCardClicked = null;
        displayMovesCounter();
        starsRating();
        if (matchedCards.length === 16) {
          CongraluationPopUp();
        }

      } else {
        cardind.classList.remove("match");
        secondCardClicked.classList.remove("match");
        // hide it after 10000 milliseconds
        setTimeout(() => cardind.classList.remove("open", "show"), 400);
        setTimeout(() => secondCardClicked.classList.remove("open", "show"), 400);
        setTimeout(() => secondCardClicked = null, 400);
        starsRating();
        opensCards = [];
        console.log("not matched");
        console.log(movesCounter);
      }

    }
  }

////function at the end of game

  function CongraluationPopUp() {
    var modal = document.getElementById("myModal")
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var movesCounterN = document.querySelector('.moves').innerHTML;
    var finalCalculatedTime = timer.innerHTML;
    starsRating();//to display starsRating
    clearInterval(interval); //clear the interval to beginning
    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = movesCounterN;
    document.getElementById("totalTime").innerHTML = finalCalculatedTime;
    // When the user clicks on the button,  open congratulations modal
    modal.style.display = "block";
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

  }
  /*
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */
