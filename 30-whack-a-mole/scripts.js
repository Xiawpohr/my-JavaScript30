const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lasthole
let timeup = false
let score = 0

function randomtime(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]

  if (hole === lasthole) return randomHole(holes)
  lasthole = hole
  return hole
}

function peep() {
  const time = randomtime(200, 1000)
  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if (!timeup) peep()
  }, time)
}

function startGame() {
  score = 0
  scoreBoard.textContent = score
  timeup = false
  peep()
  setTimeout(() => { timeup = true }, 10000)
}

function bonk(e) {
  if (!e.isTrusted) return
  score++
  scoreBoard.textContent = score
  this.classList.remove('up')
}

moles.forEach(mole => mole.addEventListener('click', bonk))
