const colors = ["#FA9898","#A5FA98","#98EAFA","#CB98FA","#F8FA99"] // Hex Colors
const hueAngles = ["299","51","129","210","0"] // Hue rotation values to get above colors
const colorButtons = document.querySelectorAll("#color_menu .menu_buttons")
let currentColor = 0;

const recolorButton = document.getElementById("recolorize");
const arrow = document.querySelector("#recolorize #arrow")

//Color change
for(let [i,button] of colorButtons.entries()) {
    button.style.backgroundColor = colors[i]
    button.addEventListener("click", function() {
        currentColor = i;
    })
}

//Attach event listener, this allows me to toggle it whenever i want. also is less obstructive than onclick.
const colorMenu = document.getElementById("color_menu")
recolorButton.addEventListener("click", () => {
    recolorButton.classList.toggle("recolor_enabled")
    recolorButton.parentElement.classList.toggle("recolor_enabled")
    Recolor(['Notes','Pictures'])  
    //Now lets call the function to toggle the arrow.
    toggleArrow(true)
})

function toggleArrow(ignoreToggle) { //Putting this into a function allows me to toggle it whenever i need it.
    if(!ignoreToggle) {
        recolorButton.classList.toggle("recolor_enabled")
    }
    if(recolorButton.classList.contains("recolor_enabled")) {
        arrow.innerText = " >";
        console.log("1")
    } 
    else {
        arrow.innerText = "";
        console.log("2")
    }
}