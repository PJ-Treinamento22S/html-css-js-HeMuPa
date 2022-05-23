function deletarPiu(id){
    console.log(id)
    document.getElementById(`${id}`).classList.add("hidden")
}

function Favoritar(){
    document.querySelector(".Estrela").src = "estrelaAmarela.jpg"
    document.querySelector(".BotaoFavoritar").style.opacity = "0.8"
}

function DarLike(){
    document.querySelector(".Coracao").src = "CoracaoVermelho.png"
    document.querySelector(".BotaoLike").style.opacity = "0.8"
}

const PiusFeed = document.querySelector(".PiusFeed");
const BotaoPost  = document.querySelector(".BotaoPiuar")
console.log(BotaoPost)
async function getData(){
    const rawData = await fetch("https://arcane-sierra-77337.herokuapp.com/data")
    const data = await rawData.json();
    return data;
}

async function getPost(){
    const data = await getData();
    data.forEach(post => {
        const html =
        `<div class="CaixaPiuFeed" id = "${post.id}"> 

            <div class="ImagemEUser">
                <img src="${post.user.photo}" onerror = "src = 'ImagemPerfil.svg'" height="75px" width="78px" class="ImagemUser">
                <p class="User"> <strong>${post.user.first_name} ${post.user.last_name}</strong> </p> <span class="Arroba">@${post.user.username} </span> </p>
            </div>
            <p class="TextoPiu">${post.text}</p>
            <div class="IconesInteracao">
                <div class="BotaoLike">
                    <button onclick="DarLike()"><img src="heart.svg" height="32px" width="32px" class="Coracao"></button>
                </div>
                <div class="BotaoFavoritar">
                    <button onclick="deletarPiu('${post.id}')"> <img src="Lixeira.png" height="32px" width="32px" class="Estrela"> </button>
                </div>
            </div>
        </div>`
        PiusFeed.insertAdjacentHTML("beforeend",html)
    });
}
document.addEventListener("DOMContentLoaded", getPost)

function PostaNoFeed(){
    const text = document.querySelector("#PostPiu").value
    const html =
        `<div class="CaixaPiuFeed">
            <div class="ImagemEUser">
                <img src="ImagemPerfil.svg" height="75px" width="78px" class="ImagemUser">
                <p class="User"> <strong>Pejoteiro</strong> </p> <span class="Arroba">@pejoteiro123</span> </p>
            </div>
            <p class="TextoPiu">${text}</p>
            <div class="IconesInteracao">
                <div class="BotaoLike">
                    <button onclick="DarLike()"><img src="heart.svg" height="32px" width="32px" class="Coracao"></button>
                </div>
                <div class="BotaoFavoritar">
                    <button onclick="Favoritar()"><img src="star.svg" height="32px" width="32px" class="Estrela"></button>
                </div>
            </div>
        </div>`
        
        if(text.split("").length === 0){
            document.querySelector(".warnings").textContent = "Digite algo para postar!"
            document.querySelector(".warnings").style.color = "red"
            document.querySelector(".warnings").style.fontWeight = "bold"
            
        }
        else if(text.split("").length > 140){
            document.querySelector(".warnings").textContent = "Digite no maximo 140 caracteres!"
            document.querySelector(".warnings").style.color = "red"
            document.querySelector(".warnings").style.fontWeight = "bold"
        }
        else{
            document.querySelector(".warnings").textContent = ""
            document.querySelector(".warnings").style.color = "white"
            PiusFeed.insertAdjacentHTML("afterbegin",html)
        }
};

const characterCounter = () => {
    const text = document.querySelector("#PostPiu").value.split("").length;
    const counter = document.querySelector("#caracteres");
    counter.innerHTML = `${text}`

    if(text > 140){

        counter.style.color = "red"
        counter.style.fontWeight = "bold"
        document.querySelector("#PostPiu").style.backgroundColor = "red"
    }
    else{
        counter.style.color = "black"
        counter.style.fontWeight = "normal"
        document.querySelector("#PostPiu").style.backgroundColor = "white"
    }

}

