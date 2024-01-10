let cheese = document.querySelector(".cheeseCost");
let cheeseAmount = parseFloat(cheese.innerHTML);

let panCost = document.querySelector(".panCost");
let truePanCost = parseFloat(panCost.innerHTML);
let panAmount = document.querySelector(".panAmount");
let panCPS = document.querySelector(".panCPS");
let truePanCPS = parseFloat(panCPS.innerHTML);

let cowCost = document.querySelector(".cowCost");
let trueCowCost = parseFloat(cowCost.innerHTML);
let cowAmount = document.querySelector(".cowAmount");
let cowCPS = document.querySelector(".cowCPS");
let trueCowCPS = parseFloat(cowCPS.innerHTML);

let fromagerieCost = document.querySelector(".fromagerieCost");
let trueFromagerieCost = parseFloat(fromagerieCost.innerHTML);
let fromagerieAmount = document.querySelector(".fromagerieAmount");
let fromagerieCPS = document.querySelector(".fromagerieCPS");
let trueFromagerieCPS = parseFloat(fromagerieCPS.innerHTML);

let cheeseImageContainer = document.querySelector(".cheeseImageContainer")

let cpsStat = document.querySelector(".cpsStat")

let cpc = 1;

let cps = 0;

function incrementCheese(event) {
    cheese.innerHTML =  Math.round(cheeseAmount += cpc);

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(cpc)}`
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
    cheeseImageContainer.appendChild(div)

    div.classList.add('fadeUp')
    
    timeout(div)
}

const timeout = (div) => [
    setTimeout(() => {
        div.remove()
    }, 800)
]

function buyPan() {
    if (cheeseAmount >= truePanCost) {
        cheeseAmount -= truePanCost
        cheese.innerHTML = Math.round(cheeseAmount)

        panAmount.innerHTML ++

        truePanCPS = parseFloat((truePanCPS).toFixed(2))
        panCPS.innerHTML = truePanCPS
        cps += truePanCPS

        truePanCost *= 1.25
        panCost.innerHTML = Math.round(truePanCost)
    }
}

function buyCow() {
    if (cheeseAmount >= trueCowCost) {
        cheeseAmount -= trueCowCost
        cheese.innerHTML = Math.round(cheeseAmount)

        cowAmount.innerHTML ++

        trueCowCPS = parseFloat((trueCowCPS).toFixed(2))
        cowCPS.innerHTML = trueCowCPS
        cps += trueCowCPS

        trueCowCost *= 1.25
        cowCost.innerHTML = Math.round(trueCowCost)
    }
}

function buyFromagerie() {
    if (cheeseAmount >= trueFromagerieCost) {
        cheeseAmount -= trueFromagerieCost
        cheese.innerHTML = Math.round(cheeseAmount)

        fromagerieAmount.innerHTML ++

        trueFromagerieCPS = parseFloat((trueFromagerieCPS).toFixed(2))
        fromagerieCPS.innerHTML = trueFromagerieCPS
        cps += trueFromagerieCPS

        trueFromagerieCost *= 1.25
        fromagerieCost.innerHTML = Math.round(trueFromagerieCost)
    }
}

setInterval(() => {
    cheeseAmount += cps / 10
    cheese.innerHTML = Math.round(cheeseAmount)
    cpsStat.innerHTML = Math.round(cps)
}, 100)