<table class="shopButton unselectable" onclick="building.purchase('+i+')"><tr><td id="image"><img src="images/'+building.image[i]+'"></td><td id="nameAndCost"><p>'+building.name[i]+'</p><p><span>'building.cost[i]+'</span> cheese</p></td><td id="amount"><span>'+building.amount[i]+'</span></td></tr></table>

var score = 0;
            var panCost = 15;
            var pans = 0;
            var clickingPower = 1;
            var cowCost = 100
            var cows = 0
            var fromagerieCost = 1000
            var fromageries = 0
            var wisconsinCost = 10000
            var wisconsins = 0

            function buyPan(amount){
                if (score >= panCost) {
                    score = score - panCost;
                    pans = pans + 1;
                    panCost = Math.round(panCost * 1.15);

                    document.getElementById("score").innerHTML = score;
                    document.getElementById("panCost").innerHTML = panCost;
                    document.getElementById("pans").innerHTML = pans;
                    updateScorePerSecond();
                }
            }

            function buyCow(amount){
                if (score >= cowCost) {
                    score = score - cowCost;
                    cows = cows + 1;
                    cowCost = Math.round(cowCost * 1.15);

                    document.getElementById("score").innerHTML = score;
                    document.getElementById("cowCost").innerHTML = cowCost;
                    document.getElementById("cows").innerHTML = cows;
                    updateScorePerSecond();
                }
            }

            function buyFromagerie(amount){
                if (score >= fromagerieCost) {
                    score = score - fromagerieCost;
                    fromageries = fromageries + 1;
                    fromagerieCost = Math.round(fromagerieCost * 1.15);

                    document.getElementById("score").innerHTML = score;
                    document.getElementById("fromagerieCost").innerHTML = fromagerieCost;
                    document.getElementById("fromageries").innerHTML = fromageries;
                    updateScorePerSecond();
                }
            }

            function buyWisconsin(amount){
                if (score >= wisconsinCost) {
                    score = score - wisconsinCost;
                    wisconsins = wisconsins + 1;
                    wisconsinCost = Math.round(wisconsinCost * 1.15);

                    document.getElementById("score").innerHTML = score;
                    document.getElementById("wisconsinCost").innerHTML = wisconsinCost;
                    document.getElementById("wisconsins").innerHTML = wisconsins;
                    updateScorePerSecond();
                }
            }


            function addToScore(amount) {
                score = score + amount;
                document.getElementById("score").innerHTML = score;
            }

            function updateScorePerSecond(){
                scorePerSecond = pans + (cows * 10) + (fromageries * 50) + (wisconsins * 500);
                document.getElementById("scorePerSecond").innerHTML = scorePerSecond
            }

            function loadGame() {
                var savedGame = JSON.parse(localStorage.getItem("gameSave"));
                if (typeof savedGame.score !== "undefined") score = savedGame.score;
                if (typeof savedGame.clickingPower !== "undefined") clickingPower = savedGame.clickingPower;
                if (typeof savedGame.panCost !== "undefined") panCost = savedGame.panCost;
                if (typeof savedGame.pans !== "undefined") pans = savedGame.pans;
                if (typeof savedGame.cowCost !== "undefined") cowCost = savedGame.cowCost;
                if (typeof savedGame.cows !== "undefined") cows = savedGame.cows;
                if (typeof savedGame.fromagerieCost !== "undefined") fromagerieCost = savedGame.fromagerieCost;
                if (typeof savedGame.fromageries !== "undefined") fromageries = savedGame.fromageries;
            }

            function saveGame() {
                var gameSave = {
                    score: score,
                    clickingPower: clickingPower,
                    panCost: panCost,
                    pans: pans,
                    cowCost: cowCost,
                    cows: cows,
                    fromagerieCost: fromagerieCost,
                    fromageries: fromageries,
                    wisconsinCost: wisconsinCost,
                    wisconsins: wisconsins
                };
                localStorage.setItem("gameSave",  JSON.stingify(gameSave));
            }

            window.onload = function() {
                loadGame();
                updateScorePerSecond();
                document.getElementById("score").innerHTML = score;
                document.getElementById("panCost").innerHTML = panCost;
                document.getElementById("pans").innerHTML = pans;
                document.getElementById("cowCost").innerHTML = cowCost;
                document.getElementById("cows").innerHTML = cows;
                document.getElementById("fromagerieCost").innerHTML = fromagerieCost;
                document.getElementById("fromageries").innerHTML = fromageries;
                document.getElementById("wisconsinCost").innerHTML = wisconsinCost;
                document.getElementById("wisconsins").innerHTML = wisconsins;
            };

            setInterval(function() {     
                score = score + pans;
                score = score + cows * 10;
                score = score + fromageries * 50;
                score = score + wisconsins * 500
                document.getElementById("score").innerHTML = score;
            }, 1000); // 1000ms = 1 second

            setInterval(function() {
                saveGame();
            }, 30000) // 30000ms = 30 seconds