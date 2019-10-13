$(document).ready(function () {
    window.addEventListener("DOMContentLoaded", function (event) {
        console.log("DOM fully loaded and parsed");
    });

    // Initializing the Variables!

    let scoreGem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let scoreG = [];
    let totalScore = 0;
    let winner = 0;
    let loser = 0;
    const sizeScore = 4;
    let scoreMath = 0;
    let count = 0;
    let sizeCoun = 1;
    let gem = 0;
    let audioElement = "";
    let audioWin = "";
    let audioLoss = "";


    // Loading the Magic Number
    let magNum = Math.floor(Math.random() * 120) + 19;
    $('#magicNumber').text(magNum)

    score();

    // function thats populate the array and calls the function egualsFunction() that test if there any eguals number in the array.

    function score() {

        for (let i = 0; i < sizeScore; i++) {
            scoreMath = Math.floor(Math.random() * scoreGem.length + 1);
            scoreG.push(scoreMath);
        }

        egualsFunction();

        console.log(scoreG)

        function egualsFunction() {
            while (count <= scoreG.length - 1) {
                if (scoreG[count] === scoreG[sizeCoun]) {
                    if (scoreG[count] === 12) {
                        scoreG[count] -= 1;
                    } else {
                        scoreG[count] += 1;
                    }
                }
                if (sizeCoun === scoreG.length) {
                    count += 1;
                    sizeCoun = count;
                }
                sizeCoun += 1;
            }
        }

    }
    // Audio elements

    audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "./assets/Sounds Effects/Laser hit.mp3");

    audioWin = document.createElement("audio");
    audioWin.setAttribute("src", "./assets/Sounds Effects/Win Fanfare.mp3");

    audioLoss = document.createElement("audio");
    audioLoss.setAttribute("src", "./assets/Sounds Effects/Egyptian Game Over.mp3");

    // Click Event Listeners

    $('#gem1').click(function (event) {
        gem = 0
        totalScore = finalTotal(totalScore);

    })
    $('#gem2').click(function (event) {
        gem = 1
        totalScore = finalTotal(totalScore);
    })
    $('#gem3').click(function (event) {
        gem = 2
        totalScore = finalTotal(totalScore);
    })
    $('#gem4').click(function (event) {
        gem = 3
        totalScore = finalTotal(totalScore);
    })

    // Increment the value of Gems and tests if theres a win or loss

    function finalTotal() {

        totalScore += scoreG[gem];

        audioElement.play();

        $('#score').text(totalScore);
        if (totalScore === magNum) {
            winner++;
            win();

        } else if (totalScore > magNum) {
            loser++;
            loss();
        }
        return totalScore;
    }

    // Function WIN.. calls Restart function

    function win() {
        audioWin.play();
        $("#youWin").show();
        $("#gemsButton").hide();
        $("#win").text('WINS ........ :  ' + winner);

        $('.btn').click(function (event) {
            restart()
        })

    }
    // Function loss.. calls Restart function

    function loss() {
        audioLoss.play();
        $("#youLose").show();
        $("#gemsButton").hide();
        $("#loss").text('LOSSES ..... :   ' + loser);
        $('.btn').click(function (event) {
            restart()
        })


    }

    // Reset Game and start again

    function restart() {
        $("#youWin").hide();
        $("#youLose").hide();
        $('#score').text("00");
        $("#gemsButton").show();

        magNum = Math.floor(Math.random() * 120) + 19;
        $('#magicNumber').text(magNum)

        scoreG = [];
        totalScore = 0;
        scoreMath = 0;
        count = 0;
        sizeCoun = 1;

        score();

    }

})