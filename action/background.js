const images = ['../background/Dark.jpg', '../background/Eerie.jpg', '../background/Shiny.jpg', '../background/Space.jpg'];
let currentImageIndex = 0;

function changeBackgroundImage() {
    document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    const fileName = images[currentImageIndex].split('/').pop().split('.')[0];
    backgroundButton.textContent = fileName; 
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

const backgroundButton = document.getElementById('backgroundButton');
backgroundButton.addEventListener('click', () => {
    changeBackgroundImage();
});
