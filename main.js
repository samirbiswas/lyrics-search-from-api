const inputArea = document.getElementById('inputBox');
const searchButton = document.getElementById('searchBtn');
const result = document.getElementById('result');
const parentID =document.getElementById('title2');


searchButton.addEventListener('click',function(){
    
fetch(`https://api.lyrics.ovh/suggest/${inputArea.value}`)
.then(res => res.json())
.then(data =>{
    //console.log(data);
    parentID.innerHTML="";
    for (let i = 0; i < 10; i++) {
        const element = data.data[i];
        const songTitle = element.title;
        const artistName = element.artist.name;
        const p = document.createElement('p');

        p.innerHTML = `<div class="search-result col-md-8 mx-auto py-4">
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${songTitle}</h3>
                        <p class="author lead">Album by <span>${artistName}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="show( '${artistName}','${songTitle}' )" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>
               
            </div>
            

        `
        parentID.appendChild(p);
        
    }
    
})
inputArea.value="";
});


function show(artis,title){
    fetch(`https://api.lyrics.ovh/v1/${artis}/${title}`)
    .then(res => res.json())
    .then(data =>{
        // const l = data.lyrics;
        // console.log(l);
                result.innerHTML=`<button class="btn go-back text-white" onclick="goBack()">&lsaquo; go back</button>
                <h2 class="text-success mb-4">${artis} - ${title}</h2>
                <pre class="lyric text-white">${
                    !data.lyrics ? data.error : data.lyrics}
                    </pre>
                    `
                
    })
    parentID.style.display="none";
}

function goBack(){
    parentID.style.display = "block";
    result.innerHTML="";
}