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

const buildings = [
    {
        name: 'pan',
        cost: document.querySelector(".panCost"),
        trueCost: parseFloat(document.querySelector(".panCost").innerHTML),
        cps: document.querySelector(".panCPS"),
        trueCPS: parseFloat(document.querySelector(".panCPS").innerHTML),
        amount: document.querySelector(".panAmount"),
        costMultiplier: 1.25,
    },
    {
        name: 'cow',
        cost: document.querySelector(".cowCost"),
        trueCost: parseFloat(document.querySelector(".cowCost").innerHTML),
        cps: document.querySelector(".cowCPS"),
        trueCPS: parseFloat(document.querySelector(".cowCPS").innerHTML),
        amount: document.querySelector(".cowAmount"),
        costMultiplier: 1.25,
    },
    {
        name: 'fromagerie',
        cost: document.querySelector(".fromagerieCost"),
        trueCost: parseFloat(document.querySelector(".fromagerieCost").innerHTML),
        cps: document.querySelector(".fromagerieCPS"),
        trueCPS: parseFloat(document.querySelector(".fromagerieCPS").innerHTML),
        amount: document.querySelector(".fromagerieAmount"),
        costMultiplier: 1.25,
    },
]

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

function buyBuilding(building) {
    const mb = buildings.find((u) => {
        if (u.name === building) return u
    })

    if (cheeseAmount >= mb.trueCost) {
        cheese.innerHTML = Math.round(cheeseAmount -= mb.trueCost);

        mb.amount.innerHTML ++

        mb.trueCPS = parseFloat((mb.trueCPS).toFixed(2))
        mb.cps.innerHTML = mb.trueCPS
        cps += mb.trueCPS

        mb.trueCost *= mb.costMultiplier;
        mb.cost.innerHTML = Math.round(mb.trueCost)
    }
}

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