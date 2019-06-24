import img from '../assets/images/dvd'

const area = document.querySelector('#images')
const image = document.createElement('img')
image.src = img
image.width = 128
image.height = 128
image.style = 'padding: 10px;'
area.appendChild(image)