let cheese = document.querySelector(".cheeseCost");
let cheeseAmount = parseFloat(cheese.innerHTML);

let cheeseImageContainer = document.querySelector(".cheeseImageContainer")

let cpsStat = document.querySelector(".cpsStat")

let cps = 0;

let cpc;

if (cps > 2) {
    cpc = cps * 0.5;
} else {
    cpc = 1;
}

const bgm = new Audio('../audio/code.mp3')
bgm.volume = 0.1

const upgradeSound = new Audio('../audio/upgrade.mp3')

const upgradeInterval = [50, 100, 150, 200, 300, 400, 500, 1000]
const buildings = [
    {
        name: 'pan',
        cost: document.querySelector(".panCost"),
        trueCost: parseFloat(document.querySelector(".panCost").innerHTML),
        cps: document.querySelector(".panCPS"),
        trueCPS: parseFloat(document.querySelector(".panCPS").innerHTML),
        amount: document.querySelector(".panAmount"),
        upgrades: [
            {
                name: 'Hotter pans',
                description: 'Make your pans hotter to cheddar double the cheese!',
                multiplier: 2,
            },
            {
                name: 'Even hotter pans',
                description: 'Make your pans EVEN hotter to cheddar double the cheese!',
                multiplier: 2,
            },
            {
                name: 'Burning pans',
                description: 'Get super heat-resiliant metal to cheddar DOUBLE the cheese!',
                multiplier: 2,
            },
        ],
        costMultiplier: 1.25,
    },
    {
        name: 'cow',
        cost: document.querySelector(".cowCost"),
        trueCost: parseFloat(document.querySelector(".cowCost").innerHTML),
        cps: document.querySelector(".cowCPS"),
        trueCPS: parseFloat(document.querySelector(".cowCPS").innerHTML),
        amount: document.querySelector(".cowAmount"),
        upgrades: [
            {
                name: 'Grassier grass',
                description: 'Give your cows grassier grass to double cheese production',
                multiplier: 2,
            },
            {
                name: 'Super! grass',
                description: 'Give your cows the brand new Super! grass that, "helps your cattle produce DOUBLE the cheese!"',
                multiplier: 2,
            },
            {
                name: 'Nuclear grass',
                description: 'I do not think your cows should be eating this. double cheese production',
                multiplier: 2,
            },
        ],
        costMultiplier: 1.25,
    },
    {
        name: 'fromagerie',
        cost: document.querySelector(".fromagerieCost"),
        trueCost: parseFloat(document.querySelector(".fromagerieCost").innerHTML),
        cps: document.querySelector(".fromagerieCPS"),
        trueCPS: parseFloat(document.querySelector(".fromagerieCPS").innerHTML),
        amount: document.querySelector(".fromagerieAmount"),
        upgrades: [
            {
                name: 'Bilboard ads',
                description: 'Spread word of your fromageries on the highways! Certaintly doubles cheese!',
                multiplier: 2,
            },
            {
                name: 'Airplane banner advertising',
                description: 'Spread word of your fromageries in the SKY! 2 times cheese production',
                multiplier: 2,
            },
            {
                name: 'Super Bowl ads',
                description: 'The ultimate flex. Spread word of your fromageries in the Super Bowl! doubles cheese production ',
                multiplier: 2,
            },
        ],
        costMultiplier: 1.25,
    },
    {
        name: 'wisconsin',
        cost: document.querySelector(".wisconsinCost"),
        trueCost: parseFloat(document.querySelector(".wisconsinCost").innerHTML),
        cps: document.querySelector(".wisconsinCPS"),
        trueCPS: parseFloat(document.querySelector(".wisconsinCPS").innerHTML),
        amount: document.querySelector(".wisconsinAmount"),
        upgrades: [
            {
                name: 'Larger population',
                description: 'Get more people to come to Wisconsin and produce doulble the cheese',
                multiplier: 2,
            },
            {
                name: 'Even larger population',
                description: 'More people want to come to Wisconsin after seeing your cheese. 2 times cheese production',
                multiplier: 2,
            },
            {
                name: 'Secede from the nation',
                description: 'Who needs america? Secede fromm the nation to start your own COUNTRY! double cheese production',
                multiplier: 2,
            },
        ],
        costMultiplier: 1.25,
    },
]

const timeout = (div) => [
    setTimeout(() => {
        div.remove()
    }, 800)
]

function incrementCheese(event) {
    if (cps > 2) {
        cpc = cps * 0.3;
    } else {
        cpc = 1;
    }

    const clickSound = new Audio('../audio/click.mp3')
    clickSound.play()
    cheese.innerHTML =  Math.round(cheeseAmount += cpc);

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(cpc)}`
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none; z-index: 15;`
    cheeseImageContainer.appendChild(div)

    div.classList.add('fadeUp')
    
    timeout(div)
}

function buyBuilding(building) {
    const mb = buildings.find((u) => {
        if (u.name === building) return u
    })

    if (cheeseAmount >= mb.trueCost) {
        const buildingSound = new Audio('../audio/building.mp3')
        buildingSound.play()
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

function mute() {
    if (bgm.volume > 0) {
        bgm.volume = 0
    }
    else {
        bgm.volume = 0.1
    }
}

setInterval(() => {
    bgm.play()
    cheeseAmount += cps / 10
    cheese.innerHTML = Math.round(cheeseAmount)
    cpsStat.innerHTML = Math.round(cps)
}, 100)

setInterval(() => {
    save()
}, 300000)

function reset() {
    localStorage.clear()
    localStorage.save()
    localStorage.load()
}
