import img from '../assets/images/dvd'



const area = document.querySelector('#images')
const image = document.createElement('img')
image.src = img
image.width = 128
image.height = 128
    //image.style = 'padding: 10px;'
image.style = styled.button;
image.alt = 'linux image logo'
area.appendChild(image)

// click iamges
image.onclick = (e) => {
    import ('../components/myTextComponent').then(m => {
        let myDiv = document.createElement('div');
        myDiv.innerHTML = `
            <h3>myText Components Title</h3>
            <div>${m.loadText(img)}</div>
        `;
        area.appendChild(myDiv);
    });
}