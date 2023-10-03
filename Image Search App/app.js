const key = '_24M7SfpByesqMj7pIAMfzbdNC19sjikwMDNaLjJoNo'
const formEl = document.querySelector('form')
const inputEl = document.getElementById('search')
const resultEl = document.querySelector('.results')
const showMorebtn = document.getElementById('show-btn')

let inputData = ''
let page = 1

async function searchImages(){

    
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`
    const resp = await fetch(url);
    const data = await resp.json();
    const results = data.results;
    results.map((result)=>{
        const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('card');
    const img = document.createElement('img')
    img.src = result.urls.small;
    img.alt = result.alt_description;
    

    const imgLink = document.createElement('a')
    imgLink.href = result.links.html;
    imgLink.target = '_blank'
    imgLink.textContent = result.alt_description
    imgWrapper.appendChild(img);
    imgWrapper.appendChild(imgLink);
    resultEl.appendChild(imgWrapper)

    page++;
    
    if(page === 1){
        resultEl.innerHTML = '';
    }
    

    })

    

    if(page > 1){
        showMorebtn.style.display = 'block';
    }
    
    
}

formEl.addEventListener('submit', (e)=>{
    e.preventDefault();
    page = 1;
    searchImages()
})

showMorebtn.addEventListener('click', () => {
    searchImages()
})

