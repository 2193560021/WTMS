window.addEventListener("scroll",function(){
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

const navigation = document.querySelector('.nav2');
document.querySelector('.toggle').onclick = function(){
    this.classList.toggle('active');
    navigation.classList.toggle('active');
}


document.getElementById("input_searchmovie").onkeyup = function (event){
    if(event.keyCode ==13){
        $("#login").trigger("click");
    }
}