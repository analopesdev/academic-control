const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')
  
for(let card of cards){
  card.addEventListener('click' , () => {
    const videoId = card.getAttribute('id')
    window.location.href = `/video?id=${videoId}`
  })
}

document.querySelector('.far fa-times-circle, .modal-overlay').addEventListener('click', () =>{
  modalOverlay.classList.remove('active')
  modalOverlay.querySelector('iframe').src = ""
})




