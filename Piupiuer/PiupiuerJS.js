
$('textarea').keyup(function() {
    
    var characterCount = $(this).val().length,
    var caracteres = $('#caracteres'),
        maximo = $('#maximo'),
        contador = $('#contador');
        textarea = $('#PostPiu')
      
    caracteres.text(characterCount);
  
    
    if (characterCount >= 140) {
      maximo.css('color', '#8f0001');
      caracteres.css('color', '#8f0001');
      contador.css('font-weight','bold');
      textarea.style.backgroundColor = "red";
      
    } else {
      maximo.css('color','#666');
      contador.css('font-weight','normal');
    }
    if (characterCount < 140) {
        caracteres.css('color', '#666');
        textarea.css('background', 'white')
    }
    
  });

  function PostPiu(user,username,photo,text){
    //criacao
    
    const CaixaPiuFeed = document.createElement("div");
    const ImagemEUser  = document.createElement("div");
    const TextoPiu = document.createElement("p");
    const ImagemUser = document.createElement("img");
    const User = document.createElement("p");
    const Arroba = document.createElement("span");
    //atribuicao

    User.innerText = user;
    Arroba.innerText = "@" + username;
    ImagemUser =  photo;
    TextoPiu.innerText = text;

    
    //estilizacao
    User.classList.add('User');
    Arroba.classList.add('Arroba');
    ImagemUser.classList.add('ImagemUser');
    TextoPiu.classList.add('TextoPiu');
    
    //PAI
    const PAI = document.querySelector("CorpoCentral");
    
    //Hierarquias
    PAI.appendChild(CaixaPiuFeed);
    CaixaPiuFeed.appendChild(ImagemEUser);
    ImagemEUser.appendChild(ImagemUser);
    ImagemEUser.appendChild(User);
    ImagemEUser.appendChild(Arroba);
    CaixaPiuFeed.appendChild(TextoPiu);
  }

async function getData(){
  const response = await fetch("https://arcane-sierra-77337.herokuapp.com/data");
  const data = await response.json();
  console.log(data)
}

getData()

    

    
