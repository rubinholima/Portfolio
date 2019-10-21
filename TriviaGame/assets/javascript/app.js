$(document).ready(function () {
    
    // Function Trivia that calls all the questions and choices
    
    function trivia() {
        let _t = {};
        
        _t.userPick = null;
        
        _t.answers = {
            correct: 0,
            incorrect: 0
        };
        
        
        
        _t.questions = [{
            question: "In Aladdin, what is the name of Jasmine's pet tiger?",
            choices: ["Rajah", "Bo", "Iago", "Jack"],
            correct: 0
        }, {
            question: "In Peter Pan, Captain Hook had a hook on which part of his body?",
            choices: ["Right Foot", "Left Hand", "Left Foot", "Right Hand"],
            correct: 1

        }, {
            question: "In the Lion King, where does Mufasa and his family live?",
            choices: ["Rocky Mountain", "Forest", "Desert", "Pride Rock"],
            correct: 3

        }, {
            question: "In Beauty and the Beast, how many eggs does Gaston eat for    breakfast?",
            choices: ["2 Dozen", "5 Dozen", "5000", "0"],
            correct: 1

        }, {
            question: "In Alice in Wonderland, what is the name of Alice’s kitten?",
            choices: ["Dinah", "Sammie", "Kat", "Luna"],
            correct: 0

        }, {
            question: "After being on earth, where did Hercules first meet his   father Zeus?",
            choices: ["Mount Olympus", "Greece", "In the Temple of Zeus", "Elysian   Fields"],
            correct: 2

        }, {
            question: "During the ballroom scene of Beauty & the Beast, what color is Belle’s Gown?",
            choices: ["Yellow", "Blue", "Gold", "White"],
            correct: 2

        }, {
            question: "What was Dorothy's last name in The Wizard of OZ ?",
            choices: ["Doll", "Guild", "Wolf", "Gale"],
            correct: 3

        }, {
            question: "Which movie is famous for the line 'Say hello to my little friend'?",
            choices: ["Scarface", "The Godfather", "American Gangster", "Bugsy"],
            correct: 0

        }, {
            question: "This actress plays Rosalie Hale in the Twilight Saga",
            choices: ["Nikki Reed", "Anna Kendrick", "Kristen Stewart", "Ashley Greene"],
            correct: 0

        }, {
            question: "What vehicle did the Jawas drive in Star Wars ?",
            choices: ["Sandcrawler", "Landspeeder", "Minicrawler", "Driller Machine"],
            correct: 0

        }, {
            question: "What member of MTV's JackAss cast played Irving in Bad Grandpa?",
            choices: ["Bam Magera", "Steve-O", "Johnny Knoxville", "Spike Jonze"],
            correct: 2

        }, {
            question: "Which one of these Academy Awards did Gone With the Wind not win?",
            choices: ["Best Actor", "Best Actress", "Best Picture", "Best Supporting Actor"],
            correct: 0

        }, {
            question: "What  1987 film was based on a novel called The Short Timers by Gustav Hasford?",
            choices: ["Angel Heart", "Broadcast News", "Fatal Attraction", "Full Metal Jack"],
            correct: 3

        }, {
            question: "Julie Andrews won the Academy Award for  best actress in what film?",
            choices: ["The Sound of Music", "Victor/ Victoria", "Mary Poppins", "Jaws"],
            correct: 2

        }, {
            question: "Julie Andrews won the Academy Award for  best actress in what film?",
            choices: ["The Sound of Music", "Victor/ Victoria", "Mary Poppins", "Jaws"],
            correct: 2

        }, {
            question: "In Bambi, what word does the owl use to describe falling in love?",
            choices: ["Whimsical", "Miserable", "Joyful", "Twitterpatted"],
            correct: 3
        }];
        
        _t.count = 30; // initial value of the timer
        _t.current = Math.floor(Math.random() * _t.questions.length - 1); // choice of th e random question

        
        // Function ask() that populate the choices of the array _t.questions
        _t.ask = function() {
            if (_t.questions[_t.current]) {
                $("#timeRe").html("Time remaining: " + "00:" + _t.count + " Secs");
                $("#question").html(_t.questions[_t.current].question);
                let choicesArr = _t.questions[_t.current].choices;
                
                for (let i = 0; i < choicesArr.length; i++) {
                    let button = $('<button>');
                    button.text(choicesArr[i]);
                    button.attr('data-id', i);
                    button.attr('class', 'btn btn-info')
                    $('#choices').append(button);
                }
               window.triviaCounter = setInterval(_t.timer, 1000);
            } else {
                _t.cleanUp();
                _t.ask();
            }
        };

        // Function timer() counts the timer in decrecent and if the user not choose anything show the right answer
        _t.timer = function() {
            _t.count--;
            arrayCh = _t.questions[_t.current].correct;
            if (_t.count <= 0) {
                _t.cleanUpUnan();
                $('#choices').text("Unanswered, Please Try Again! The correct answer was: " + _t.questions[_t.current].choices[arrayCh]);
                
                setTimeout(function () {
                    _t.nextQ();
                });

            } else {
                $("#timeRe").html("Time remaining: " + "00:" + _t.count + " Secs");
            }
        };

        // Function nextQ() poulate the next question rest the timer and the choice of the array
        _t.nextQ = function() {
            clearInterval(window.triviaCounter);
            _t.current = Math.floor(Math.random() * _t.questions.length - 1);
            _t.count = 30;
            $('#timeRe').html("");
            setTimeout(function () {
                _t.cleanUp();
                _t.ask();
            }, 3000)
        };

        // Function cleanUp() shows the score and clean the window for the next question
        _t.cleanUp = function() {
            $('div[id]').each(function (item) {
                $(this).html('');
            });
            $('.correct').html('Correct Answers: ' + _t.answers.correct); 
            $('.incorrect').html('Incorrect Answers: ' + _t.answers.incorrect);
        };

        // Function cleanUpUnan() Its like the cleanUp function but not show the score used when the user not choose anything
        _t.cleanUpUnan = function() {
            $('div[id]').each(function (item) {
                $(this).html('');
            });
        };

        // Function answer() concatenate the correct or incorrect answer as string and increment the score 
        _t.answer = function(correct) {
            let string = correct ? 'correct' : 'incorrect';
            _t.answers[string]++;
        };
        return _t;
    };

    let toTrivia;

    // start Button where tha magic starts
    $("#start_button").click(function (event) {
        $(this).hide();
        $('.result').remove();
        toTrivia = trivia();
        toTrivia.ask();

    });

    // listener wuth the choices options 

    $('#choices').on('click', 'button', function (e) {
        let userPick = $(this).data("id"),
            _t = toTrivia || trivia(),
            index = _t.questions[_t.current].correct,
            correct = _t.questions[_t.current].choices[index];
            
        if (userPick !== index) {
            $('#choices').text("Wrong Answer! The correct answer was: " + correct);
            _t.answer(false);
        } else {
            $('#choices').text("Correct!!! The correct answer was: " + correct);
            _t.answer(true);
        }
        _t.nextQ();
    });

});