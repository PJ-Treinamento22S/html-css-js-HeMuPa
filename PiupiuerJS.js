function deletarPiu(id){
    document.getElementById(`${id}`).classList.add("hidden")
}


function DarLike(id){
    const idElemento = document.getElementById(`${id}`)
    const contador  = idElemento.querySelector(".contador").innerHTML

    if(idElemento.querySelector(".Coracao").src === "file:///C:/Users/User/Documents/html-css-js-HeMuPa/Imagens/CoracaoVermelho.png"){
        idElemento.querySelector(".Coracao").src = "Imagens/heart.svg"
        idElemento.querySelector(".BotaoLike").style.opacity = "0.5"
        idElemento.querySelector(".contador").innerHTML = parseInt(contador) - 1
    }
    else{
        idElemento.querySelector(".Coracao").src = "Imagens/CoracaoVermelho.png"
        idElemento.querySelector(".BotaoLike").style.opacity = "0.8"
        idElemento.querySelector(".contador").innerHTML = parseInt(contador) + 1
    }
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
                <img src="${post.user.photo}" onerror = "src = 'Imagens/ImagemPerfil.svg'" height="75px" width="78px" class="ImagemUser">
                <p class="User"> <strong>${post.user.first_name} ${post.user.last_name}</strong> </p> <span class="Arroba">@${post.user.username} </span> </p>
            </div>
            <p class="TextoPiu">${post.text}</p>
            <div class="IconesInteracao">
                <div class="BotaoLike">
                    <p class = "contador">0</p>
                    <button onclick="DarLike('${post.id}')" class="botaoLike"><img src="Imagens/heart.svg" height="32px" width="32px" class="Coracao"></button>
                </div>
                <div class="BotaoDeletar">
                    <button onclick="deletarPiu('${post.id}')"> <img src="Imagens/Lixeira.png" height="32px" width="32px" class="Lixeira"> </button>
                </div>
            </div>
        </div>`
        PiusFeed.insertAdjacentHTML("beforeend",html)
    });
}
document.addEventListener("DOMContentLoaded", getPost)

function PostaNoFeed(){
    var uniq = 'id' + (new Date()).getTime();
    const text = document.querySelector("#PostPiu").value
    const html =
        `<div class="CaixaPiuFeed" id = "${uniq}">
            <div class="ImagemEUser">
                <img src="Imagens/ImagemPerfil.svg" height="75px" width="78px" class="ImagemUser">
                <p class="User"> <strong>Pejoteiro</strong> </p> <span class="Arroba">@pejoteiro123</span> </p>
            </div>
            <p class="TextoPiu">${text}</p>
            <div class="IconesInteracao">
                <div class="BotaoLike">
                <p class = "contador">0</p>
                    <button onclick="DarLike('${uniq}')"><img src="Imagens/heart.svg" height="32px" width="32px" class="Coracao"></button>
                </div>
                <div class="BotaoDeletar">
                    <button onclick="deletarPiu('${uniq}')"> <img src="Imagens/Lixeira.png" height="32px" width="32px" class="Lixeira"> </button>
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

function TextoBusca(){
    const html =  
    `
    <input placeholder="Digite sua pesquisa" onkeyup ="Pesquisa()" class = "TextoPesquisa">
    </input>
    `
    document.querySelector(".BarraPesquisa").innerHTML = html

}

function Pesquisa(){
    const Pius = document.querySelector(".PiusFeed").getElementsByClassName("CaixaPiuFeed")
    const textoPesquisa = document.getElementsByClassName("TextoPesquisa")[0].value
    console.log(textoPesquisa)
    for(let i=0; i<Pius.length; i++){
        const username = Pius[i].getElementsByClassName("Arroba")[0].innerHTML
        const name = Pius[i].getElementsByClassName("User")[0].getElementsByTagName("strong")[0].innerHTML
        if(filtraPesquisa(textoPesquisa,username) || filtraPesquisa(textoPesquisa,name)){
            Pius[i].style.display = "flex"
        }
        else{
            Pius[i].style.display = "none"
        }
    }
}

function filtraPesquisa(textoDigitado, textoFeed){
    return textoFeed.toLowerCase().includes(textoDigitado.toLowerCase())
}