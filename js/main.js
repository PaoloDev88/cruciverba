let currentLevel = localStorage.getItem("levelAchieved");
if (!localStorage.getItem("levelAchieved")) {
    localStorage.setItem(`levelAchieved`, '1');
    currentLevel = 1;
}

function setAvailableLevels() {
    if (currentLevel == 2) {
        const levelTwoBlock = document.querySelector('.levelTwoBlocked');
        levelTwoBlock.style.display = 'none';
    }
    if (currentLevel == 3) {
        const levelTwoBlock = document.querySelector('.levelTwoBlocked');
        levelTwoBlock.style.display = 'none';

        const levelThreeBlock = document.querySelector('.levelThreeBlocked');
        levelThreeBlock.style.display = 'none';
    }
}

// simulazione navigazione

const welcomeStartBtn = document.querySelector('.welcomePage .start');
welcomeStartBtn.onclick = ()=> {
    const myWelcomePage = document.querySelector('.welcomePage');
    const myHistoryPage = document.querySelector('.historyPage');
    myWelcomePage.style.display = 'none';
    myHistoryPage.style.display = 'block';
}

const historyPlayBtn = document.querySelector('.historyPage .play');
historyPlayBtn.onclick = ()=> {
    const myHistoryPage = document.querySelector('.historyPage');
    const homePage = document.querySelector('.homePage');
    myHistoryPage.style.display = 'none';
    homePage.style.display = 'block';
    setAvailableLevels();
}

const homeLevelOneBtn = document.querySelector('.homePage .levelOne');
homeLevelOneBtn.onclick = ()=> {
    const homePage = document.querySelector('.homePage');
    const myLevelPage = document.querySelector('.levelPage');
    homePage.style.display = 'none';
    myLevelPage.style.display = 'flex';
    const myMain = document.querySelector('main');
    myMain.style.display = 'block';
    myMain.innerHTML = '';
    runLevel(wordsLevelOne, 9, 1);

    let mySaved = localStorage.getItem("l1a");
    if (mySaved){
        const allInputs = document.querySelectorAll('input');
        allInputs.forEach((input, i) => {
            if (mySaved[i] === '*') {
                input.value = ' ';
            } else {
                input.value = mySaved[i];
            }
        });
    }
}

const homeLevelTwoBtn = document.querySelector('.homePage .levelTwo');
homeLevelTwoBtn.onclick = ()=> {
    if (currentLevel > 1) {
        const homePage = document.querySelector('.homePage');
        const myLevelPage = document.querySelector('.levelPage');
        homePage.style.display = 'none';
        myLevelPage.style.display = 'flex';
        const myMain = document.querySelector('main');
    myMain.style.display = 'block';
        myMain.innerHTML = '';
        runLevel(wordsLevelTwo, 9, 2);

        let mySaved = localStorage.getItem("l2a");
        if (mySaved){
            const allInputs = document.querySelectorAll('input');
            allInputs.forEach((input, i) => {
                if (mySaved[i] === '*') {
                    input.value = ' ';
                } else {
                    input.value = mySaved[i];
                }
            });
        }
    }
}

const homeLevelThreeBtn = document.querySelector('.homePage .levelThree');
homeLevelThreeBtn.onclick = ()=> {
    if (currentLevel > 2) {
        const homePage = document.querySelector('.homePage');
        const myLevelPage = document.querySelector('.levelPage');
        homePage.style.display = 'none';
        myLevelPage.style.display = 'flex';
        const myMain = document.querySelector('main');
    myMain.style.display = 'block';
        myMain.innerHTML = '';
        runLevel(wordsLevelThree, 9, 3);

        let mySaved = localStorage.getItem("l3a");
        if (mySaved){
            const allInputs = document.querySelectorAll('input');
            allInputs.forEach((input, i) => {
                if (mySaved[i] === '*') {
                    input.value = ' ';
                } else {
                    input.value = mySaved[i];
                }
            });
        }
    }
}

// runLevel(wordsLevelOne, 11);

// dichiarazione funzioni

function runLevel(words, cellDimension, levelNumber){
    createPuzzle(words, cellDimension);
    createPositionRef();
    fixOverlappedLetters();
    highlightFocusedWordAndShowClue();
    buttonsFunctionality(words, cellDimension, levelNumber);
}

function getRandomCode() {
    const numbers = '0123456789';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    code += numbers[Math.floor(Math.random() * 10)];
    code += letters[Math.floor(Math.random() * 26)];
    code += letters[Math.floor(Math.random() * 26)];
    code += numbers[Math.floor(Math.random() * 10)];
    code += numbers[Math.floor(Math.random() * 10)];
    return code;
}

function buttonsFunctionality(words, cellDimension, levelNumber){
    const replyButton = document.querySelector('.reply');
    const saveButton = document.querySelector('.save');
    const checkButton = document.querySelector('.check');
    const plusButton = document.querySelector('.plus');
    const minusButton = document.querySelector('.minus');
    const listButton = document.querySelector('.list');

    const myClueList = document.querySelector('.clueList');
    const myMain = document.querySelector('main');
    const myHeader = document.querySelector('header');
    const allInputs = document.querySelectorAll('input');

    replyButton.onclick = ()=> {
        const myLevelPage = document.querySelector('.levelPage');
        myLevelPage.style.display = 'none'
        const homePage = document.querySelector('.homePage');
        homePage.style.display = 'block';
        setAvailableLevels();
    }

    saveButton.onclick = ()=> {
        let levelAnswers = '';
        allInputs.forEach((input) => {
            if (input.value === '') {
                levelAnswers += '*';
            } else {
                levelAnswers += input.value.toUpperCase();
            }
        });
        localStorage.setItem(`l${levelNumber}a`, levelAnswers);
        if (currentLevel <= levelNumber) {
            localStorage.setItem(`levelAchieved`, currentLevel);
        }

        const loseText = document.createElement('div');
        loseText.classList.add('clue');
        loseText.style.display = 'block';
        loseText.innerText = `Progressi salvati!`
        const mylevelPage = document.querySelector('.levelPage');
        mylevelPage.append(loseText);
        loseText.onclick = ()=> {
            loseText.remove();
        }
    }

    // mostro la ista degli indizi
    listButton.onclick = ()=> {
        myClueList.style.display = 'block';
        myMain.style.display = 'none';
        myHeader.style.display = 'none';
    }

    // controllo se le parole inserite sono corrette
    checkButton.onclick = ()=> {
        // creo una stringa concatenando tutte le soluzioni
        let solution = '';
        words.forEach((word) => {
            solution += word.solution;
        });

        // creo una stringa concatenando tutti i valori negli input
        let playerAnswers = '';
        allInputs.forEach((input) => {
            if (input.value === '') {
                playerAnswers += '*';
            } else {
                playerAnswers += input.value.toUpperCase();
            }
        });

        // controllo se le due stringhe sono uguali e stampo un messaggio
        if (solution === playerAnswers) {
            if (levelNumber === 1 || levelNumber === 2) {
                const loseText = document.createElement('div');
                loseText.classList.add('clue');
                loseText.style.display = 'block';
                loseText.innerText = `Complimenti! Hai sboccato il livello ${levelNumber + 1}!`
                const mylevelPage = document.querySelector('.levelPage');
                mylevelPage.append(loseText);
                loseText.onclick = ()=> {
                    loseText.remove();
                }
                if (currentLevel == levelNumber) {
                    currentLevel = levelNumber + 1;
                }
                localStorage.setItem(`levelAchieved`, currentLevel);
            } else {
                myMain.style.display = 'none';
                const winText = document.createElement('div');
                winText.classList.add('winText');
                const youWin = document.createElement('span');
                const sendEmail = document.createElement('p');
                const getPrize = document.createElement('span');
                const myCode = document.createElement('div');
                myCode.classList.add('code');
                youWin.innerText = `Hai vinto!!!`
                sendEmail.innerHTML = `Fai uno screenshot di
                questa schermata e 
                invialo a:
                <br><strong>info@agebeo.it</strong><br>
                insieme alle tue credenziali. 
                Sarai contattato dall' ass. AGEBEO per invitarti in trasmissione e ricevere`
                getPrize.innerText = `il premio corrispondente!`
                myCode.innerText = getRandomCode()
                const mylevelPage = document.querySelector('.levelPage');
                mylevelPage.append(winText);
                winText.append(youWin);
                winText.append(sendEmail);
                winText.append(getPrize);
                winText.append(myCode);
                winText.onclick = ()=> {
                    winText.remove();
                }
                localStorage.setItem(`levelAchieved`, currentLevel);
            }
        } else {
            const loseText = document.createElement('div');
            loseText.classList.add('clue');
            loseText.style.display = 'block';
            loseText.innerText = 'Ricontrolla le tue risposte e riprova!'
            const mylevelPage = document.querySelector('.levelPage');
            mylevelPage.append(loseText);
            loseText.onclick = ()=> {
                loseText.remove();
            }
        }
    }

    // zoom +
    plusButton.onclick = ()=> {
        // aumento la dimensione delle celle delle lettere
        cellDimension += 4;
        
        // cambio le dimensioni del main
        myMain.style.width = 34 * cellDimension + 'px';
        myMain.style.height = 34 * cellDimension + 'px';

        // cambio le dimensioni delle lettere
        const allLetters = document.querySelectorAll('.letter');
        allLetters.forEach((letter)=> {
            letter.style.width = cellDimension + 'px';
            letter.style.height = cellDimension + 'px';
        });

        // cambio le dimensioni dei numeri
        const allNumbers = document.querySelectorAll('.number');
        allNumbers.forEach((number)=> {
            number.style.fontSize = 0.2 * cellDimension + 'px';
            number.style.top = 0.1 * cellDimension + 'px';
            number.style.left = 0.1 * cellDimension + 'px';
        });

        // cambio le dimensioni degli input
        allInputs.forEach((input)=> {
            input.style.height = 0.8 * cellDimension + 'px';
            input.style.width = 0.8 * cellDimension + 'px';
            input.style.fontSize = 0.6 * cellDimension + 'px';
        });
        
        // riposiziono le parole in base alla nuova cellDimension
        const allWords = document.querySelectorAll('.word');
        allWords.forEach((word, i)=> {
            word.style.top = `${words[i].fromTop * cellDimension}px`;
            word.style.left = `${words[i].fromLeft * cellDimension}px`;
        });
    }

    // zoom -
    minusButton.onclick = ()=> {
        if (cellDimension > 11) {
            // dimuisco la dimensione delle celle delle lettere
            cellDimension -= 4;

            // cambio le dimensioni del main
            myMain.style.width = 34 * cellDimension + 'px';
            myMain.style.height = 34 * cellDimension + 'px';

            // cambio le dimensioni delle lettere
            const allLetters = document.querySelectorAll('.letter');
            allLetters.forEach((letter)=> {
                letter.style.width = cellDimension + 'px';
                letter.style.height = cellDimension + 'px';
            });

            // cambio le dimensioni dei numeri
            const allNumbers = document.querySelectorAll('.number');
            allNumbers.forEach((number)=> {
                number.style.fontSize = 0.2 * cellDimension + 'px';
                number.style.top = 0.1 * cellDimension + 'px';
                number.style.left = 0.1 * cellDimension + 'px';
            });

            // cambio le dimensioni degli input
            allInputs.forEach((input)=> {
                input.style.height = 0.8 * cellDimension + 'px';
                input.style.width = 0.8 * cellDimension + 'px';
                input.style.fontSize = 0.6 * cellDimension + 'px';
            });
            
            // riposiziono le parole in base alla nuova cellDimension
            const allWords = document.querySelectorAll('.word');
            allWords.forEach((word, i)=> {
                word.style.top = `${words[i].fromTop * cellDimension}px`;
                word.style.left = `${words[i].fromLeft * cellDimension}px`;
            });
        }
    }
}

function createPositionRef(){
    // assegno a ciascun input un attributo data che ne definisce la posizione (così posso selezionare in un solo colpo le lettere che si svrappongono a causa di un incrocio di parole)
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach((input) => {
        const inputPosition = input.getBoundingClientRect().x.toFixed(1) + input.getBoundingClientRect(1).y.toFixed();

        input.setAttribute('data-position', `${inputPosition}`);
    });
}

function fixOverlappedLetters(){
    // sovrascrivo se la lettera è già presente a causa di un incrocio di parole
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach((input) => {
        input.onkeyup = (event)=> {
            // sovrascrivo la lettera
            const overlappedInputs = document.querySelectorAll(`[data-position="${input.getAttribute('data-position')}"]`);
            overlappedInputs.forEach((item) => {
                item.value = input.value;
            });
            // sposto il focus all'input successivo
            if(event.target.value.length === 1){
                if (event.target.parentNode.nextSibling !== null){
                    const next = event.target.parentNode.nextSibling.firstElementChild.focus();
                }
            }
            // if (input.value.length > 1) {
            //     input.value = input.value.substring(1)
            // }
        }
    });
}

function highlightFocusedWordAndShowClue(){
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach((input) => {
        const myClue = document.querySelector(`[data-id="${input.getAttribute('data-id')}"].clue`);
        // onfocus cambio il background-color dalla .word
        input.onfocus = function() {
            // nescondo le istruzioni di gioco
            const myInstructions = document.querySelector('.instructions');
            myInstructions.style.display = 'none';

            // cambio il background-color dalla .word
            input.parentNode.parentNode.style.backgroundColor = '#c7ecff';
            input.parentNode.parentNode.style.zIndex = '100';
            // seleziono gli eventuali caratteri già presenti
            // this.select();
            this.setSelectionRange(0, this.value.length);
            // mostro l'indizio della parola
            myClue.style.display = 'block';
        }
        // a fine focus ripristino il background-color dalla .word
        input.onblur = function() {
            const otherWords = document.querySelectorAll('.word');
            otherWords.forEach((word) => {
                word.style.backgroundColor = 'white';
                word.style.zIndex = '1';
            });
            // nascondo l'indizio della parola
            myClue.style.display = 'none';
        }
    });
}

function createPuzzle(words, cellDimension){
    const myClueList = document.querySelector('.clueList');
    if (myClueList){
        myClueList.innerHTML = '';
    }
    const prevClue = document.querySelectorAll('.clue');
    if (prevClue) {
        prevClue.forEach((clue) => {
            clue.remove();
        });;
    }
    words.forEach((word) => {
        const myMain = document.querySelector('main');
        myMain.style.width = 34 * cellDimension + 'px';
        myMain.style.height = 34 * cellDimension + 'px';
        // creo un div per la parola
        const divWord = document.createElement('div');
        divWord.classList.add('word', word.type);
        divWord.id = `${word.type}` + `${word.id}`;
        myMain.append(divWord);

        for (let i=0; i<word.solution.length; i++){
            // creo un div per ciascuna lettera
            const divLetter = document.createElement('div');
            divLetter.classList.add('letter', word.type);
            divLetter.style.width = cellDimension + 'px';
            divLetter.style.height = cellDimension + 'px';

            // creo un input per ciascuna lettera
            const myInput = document.createElement('input');
            myInput.style.height = 0.8 * cellDimension + 'px';
            myInput.style.width = 0.8 * cellDimension + 'px';
            myInput.style.fontSize = 0.6 * cellDimension + 'px';
            myInput.type = 'text';
            myInput.maxLength = '1';
            myInput.setAttribute('data-id', `${word.id}${word.type}`)
            // myInput.value = word.solution[i];

            divLetter.append(myInput);
            divWord.append(divLetter);

            // aggiungo l'id della parola sulla prima lettera
            if (i === 0){
                divLetter.style.position = 'relative';
                const wordNumber = document.createElement('div');
                wordNumber.style.fontSize = 0.2 * cellDimension + 'px';
                wordNumber.style.top = 0.1 * cellDimension + 'px';
                wordNumber.style.left = 0.1 * cellDimension + 'px';
                wordNumber.classList.add('number');
                wordNumber.innerText = word.id;
                divLetter.append(wordNumber);
            }
        }

        // posiziono la parola sulla base dei dati contenuti nell'oggetto di partenza
        divWord.style.position = 'absolute';
        divWord.style.top = `${word.fromTop * cellDimension}px`;
        divWord.style.left = `${word.fromLeft * cellDimension}px`;

        // creo l'indizio per la parola
        const divClue = document.createElement('div');
        divClue.classList.add('clue');
        divClue.innerText = `${word.id}` + '. ' + `${word.clue}`;

        const mylevelPage = document.querySelector('.levelPage');
        mylevelPage.append(divClue);
        divClue.setAttribute('data-id', `${word.id}${word.type}`);

        // creo la lista degli indizi
        // const myClueList = document.querySelector('.clueList')
        const clueLi = document.createElement('div');
        clueLi.classList.add('clueLi');
        clueLi.setAttribute('data-id', `${word.id}${word.type}`);
        clueLi.innerText = word.id + '. ' + word.clue;

        myClueList.append(clueLi);
        mylevelPage.append(myClueList);

        const myHeader = document.querySelector('header');
        clueLi.onclick = ()=> {
            myClueList.style.display = 'none';
            myMain.style.display = 'flex';
            myHeader.style.display = 'flex';
            const selectedInput = document.querySelector(`input[data-id="${clueLi.getAttribute('data-id')}"]`);
            selectedInput.focus();
        }

        // visualizzo le istruzioni di gioco
        const myInstructions = document.querySelector('.instructions');
        myInstructions.style.display = 'block';
    });
}