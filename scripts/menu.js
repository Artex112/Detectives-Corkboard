const contextMenu = document.getElementById("wrapper")
const tIcon = document.getElementsByClassName("trash_icon")[0]
const pIcon = document.getElementsByClassName("pin_icon")[0]
const container = document.getElementById("container");

document.addEventListener("contextmenu", e => { //open menu on right click
    e.preventDefault(); //prevent default context menu

    let x = e.offsetX,
        y = e.offsetY - 20;
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.visibility = "visible";
})

document.addEventListener("click", () => contextMenu.style.visibility = "hidden") //close menu on left click

function setVisibility(selector,state) {
    const floatingWindow = document.querySelector(selector)
    floatingWindow.style.visibility = state
}

function appendItem(item, attachListeners) {
    const board = document.getElementById("container")
    let tempNode = document.querySelector(item).cloneNode(true)
    tempNode.style.transform = `translate(200px,200px)`;
    tempNode.style.visibility = "visible"
    if (attachListeners) {
        attachListener(tempNode)
    }
    board.appendChild(tempNode)
}

function RemoveItem(classes) {
    for (cls of classes) { //Iterate over all classes in array
        const items = document.getElementsByClassName(cls)
        for (item of items) { //Iterate over all elements in the class
            item.classList.toggle("Removable")
        }
    }
    if(pIcon.classList.contains("Attachable")) {
        ConnectString(['Notes','Pictures'])
    }
    tIcon.classList.toggle("Removable")
    tIcon.classList.toggle("tshow")
}

function ConnectString(classes) {
    for (cls of classes) { //Iterate over all classes in array
        const items = document.getElementsByClassName(cls)
        for (item of items) { //Iterate over all elements in the class
            item.classList.toggle("Attachable")
        }
    }
    if(tIcon.classList.contains("Removable")) {
        RemoveItem(['Notes','Pictures','String'])
    }
    pIcon.classList.toggle("Attachable")
    pIcon.classList.toggle("pshow")
    container.classList.remove("Attaching")

}

function moveIcon(e) {
    if (tIcon.classList.contains("Removable")) {
        let newX = e.pageX + 10,
            newY = e.pageY + 10;
        tIcon.style.transform = `translate(${newX}px,${newY}px)`
    } else if (pIcon.classList.contains("Attachable")) {
        let newX = e.pageX + 10,
            newY = e.pageY + 10;
        pIcon.style.transform = `translate(${newX}px,${newY}px)`
    }
}

//Move the little trashbin icon
window.addEventListener("click", function(e) { moveIcon(e) })
window.addEventListener("mousemove", function(e) { moveIcon(e) })