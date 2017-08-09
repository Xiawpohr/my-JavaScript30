const buttons = document.querySelectorAll('.timer__button')
const timeLeft = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
let countdown

function timer(seconds) {
  clearInterval(countdown)

  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  displayEndTime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }

    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const display = `${mins}:${secs < 10 ? '0': ''}${secs}`
  timeLeft.textContent = display
  document.title = display
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hours = end.getHours()
  const mins = end.getMinutes()
  endTime.textContent = `Be Back At ${hours}:${mins}`
}

function setTimer() {
  timer(parseInt(this.dataset.time))
}

function setTimerFromForm(e) {
  e.preventDefault()
  const seconds = parseInt(this.minutes.value) * 60
  timer(seconds)
  this.reset()
}

buttons.forEach(button => button.addEventListener('click', setTimer))
customForm.addEventListener('submit', setTimerFromForm)
