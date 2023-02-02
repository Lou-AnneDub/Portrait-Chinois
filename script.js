document.addEventListener("DOMContentLoaded", function () {
    //appel de la fonction pour faire apparaitre le texte
    ajouteAnalogies(analogies);

    //appel de la fonction pour faire apparaitre les boutons du menu
    bouton(analogies);

    //Pied de page visible ou non
    var piedDePage = document.querySelector("footer")
    piedDePage.style.overflow = "hidden";

    var hauteur = piedDePage.clientHeight;
    piedDePage.style.height = "3em";

    document.querySelector("footer h1").addEventListener("click", function(event){
      if(piedDePage.style.height == "3em"){
        var animationPiedDePage = piedDePage.animate([{"height": hauteur + "px"}], {"duration":500});
        animationPiedDePage.addEventListener("finish",function(){
          piedDePage.style.height = hauteur + "px";
        })
      } else {
        var animationPiedDePage = piedDePage.animate([{"height": "3em"}], {"duration":500});
        animationPiedDePage.addEventListener("finish",function(){
          piedDePage.style.height == "3em"
        })
        setTimeout(function(){
          piedDePage.style.height = "3em"
        }, 490)
      }
    });

    //Formulaire
    var envoyer = document.getElementById('envoyer')
    envoyer.addEventListener('click', function(){

      var lien = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=lou-anne.dubille&courriel=" + document.getElementById('mail').value+ "&message=Si j'étais " + document.getElementById('analogie').value + ", je serais " + document.getElementById('reponse').value + " parce que " + document.getElementById('explain').value + ". Image " + document.getElementById('image').value + ". Bouton " + document.getElementById('bouton').value;

      fetch(lien).then(function(response){
        response.json().then(function(api){
          alert(api.message);
        })
      })
      analogies.push(    {
        "bouton": document.getElementById('bouton').value,
        "thème": document.getElementById('analogie').value,
        "reponse": document.getElementById('reponse').value,
        "explain": document.getElementById('explain').value,
        "image": document.getElementById('image').value,
        "numéro": "a" + analogies.length+1,
      })
      ajouteAnalogies(analogies);
      bouton(analogies);
      const formulaire = document.querySelectorAll('form input, form textarea');
      formulaire.forEach(function (entree) {
        entree.value = "";
      })
    })
});

//Faire apparaitre le texte
function ajouteAnalogies(data) {
    var nbAnalogies = 0;
    var text = ""
    data.forEach(function (f) {
        nbAnalogies += 1;
         text += " <section class='analogie' id='" + f.numéro + "'><h2>Si j'étais " + f.thème + ", je serais...</h2><h1>" + f.reponse + "</h1><p>" + f.explain + "</p><div class='image'><img src='" + f.image + "' alt=''></div></section>";
    });
    var blocAnalogie = document.querySelector(".analogies");
    blocAnalogie.innerHTML = text
}

//Faire apparaitre bouton menu
function bouton(data) {
  var nbBouton = 0;
  var text = ""
  data.forEach(function (f) {
      nbBouton += 1;
       text += "<a href='#"+ f.numéro + "' class='scroll-container'> " + f.bouton + "</a>";
  });
  var blocBouton = document.querySelector(".menu");
  blocBouton.innerHTML = text
}
