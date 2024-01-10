let cheese = document.querySelector(".cheeseCost");
let cheeseAmount = parseFloat(cheese.innerHTML);

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
    {
        name: 'wisconsin',
        cost: document.querySelector(".wisconsinCost"),
        trueCost: parseFloat(document.querySelector(".wisconsinCost").innerHTML),
        cps: document.querySelector(".wisconsinCPS"),
        trueCPS: parseFloat(document.querySelector(".wisconsinCPS").innerHTML),
        amount: document.querySelector(".wisconsinAmount"),
        costMultiplier: 1.25,
    },
]

const timeout = (div) => [
    setTimeout(() => {
        div.remove()
    }, 800)
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

function save() {
    localStorage.clear()

    buildings.map((building) => {

        const obj = JSON.stringify({
            trueAmount: parseFloat(building.amount.innerHTML),
            trueCost: building.trueCost,
            trueCPS: building.trueCPS
        })

        localStorage.setItem(building.name, obj)
    })

    localStorage.setItem('cpc', JSON.stringify(cpc))
    localStorage.setItem('cps', JSON.stringify(cps))
    localStorage.setItem('cheese', JSON.stringify(cheeseAmount))
}

function load() {
    buildings.map((building) => {
        const savedValues = JSON.parse(localStorage.getItem(building.name))

        building.trueCost = savedValues.trueCost
        building.trueCPS = savedValues.trueCPS

        building.amount.innerHTML = savedValues.trueAmount
        building.cost.innerHTML = Math.round(building.trueCost)
        building.cps.innerHTML = building.trueCPS
    })

    cpc = JSON.parse(localStorage.getItem('cpc'))
    cps = JSON.parse(localStorage.getItem('cps'))
    cheeseAmount = JSON.parse(localStorage.getItem('cheese'))

    cheese.innerHTML = Math.round(cheeseAmount)
}

setInterval(() => {
    cheeseAmount += cps / 10
    cheese.innerHTML = Math.round(cheeseAmount)
    cpsStat.innerHTML = Math.round(cps)
}, 100)