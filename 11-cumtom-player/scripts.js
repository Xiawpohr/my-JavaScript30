const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggleSwitch = player.querySelector('.toggle')
const ranges = player.querySelectorAll('.player__slider')
const skipButtons = player.querySelectorAll('.player__button')

function togglePlay () {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

function toggleIcon () {
  const icon = this.paused ? '►' : '❚❚'
  toggleSwitch.textContent = icon
}

function skip () {
  const timeSkipped = this.dataset.skip
  video.currentTime += parseFloat(timeSkipped)
}

function handleRange () {
  video[this.name] = this.value
}

function handleProgress () {
  const percentage = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percentage}%`
}

function updateProgress (e) {
  const timeUpdated = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = timeUpdated
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', toggleIcon)
video.addEventListener('pause', toggleIcon)
video.addEventListener('timeupdate', handleProgress)
toggleSwitch.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => {
  range.addEventListener('change', handleRange)
  range.addEventListener('mousemove', handleRange)
})

let mouseDown = false
progress.addEventListener('click', updateProgress)
progress.addEventListener('mousemove', (e) => mouseDown && updateProgress(e))
progress.addEventListener('mousedown', () => { mouseDown = true })
progress.addEventListener('mouseup', () => { mouseDown = false })
