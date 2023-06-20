let identifier = 0;

function attachListener(item) {
    const button = item.children[1].children[1].children; //text formatting buttons array
    const pin = item.children[0]; //the red pin image
    const container = document.getElementById("container");

    //Drag n' drop
    if (!item.classList.contains("String")) { //Make sure the element isnt a string
        let mousePressed = false;
        pin.addEventListener("mousedown", function() {
            mousePressed = true;
            pin.style.cursor = "grabbing";
            document.addEventListener("mousemove", function(e) {
                if (mousePressed == true) {
                    let newX = e.pageX,
                        newY = e.pageY;
                    item.style.transform = `translate(${newX - 110}px,${newY}px)`;
                }
            });
        });

        document.addEventListener("mouseup", function() { //Stop the grabbing when mouse button is up
            mousePressed = false;
            pin.style.cursor = "grab";
        })
    }

    //Connect String function
    item.addEventListener("click", function() {
        if (item.classList.contains("Attachable") && !item.classList.contains("Attached")) {
            let tempNode = document.querySelector(".String").cloneNode(true)
            if (!container.classList.contains("Attaching")) {
                tempNode.style.visibility = "visible";
                document.addEventListener("mousemove", function(e) {
                    if (container.classList.contains("Attaching")) {
                        makeLine(item, tempNode, e.pageX - 85, e.pageY - 5)
                    }
                })
                tempNode.id = `${identifier}a`;
                item.id = `${identifier}b`;

                //Remove function, yes i did reuse the same piece of code :-)
                tempNode.addEventListener("click", function() {
                    if (tempNode.classList.contains("Removable")) {
                        tempNode.parentElement.classList.remove("Attached")
                        tempNode.remove();
            
                        //Cancel after removing one element
                        const allElements = document.querySelectorAll("*")
                        allElements.forEach(element => {
                            element.classList.remove("Removable");
                            element.classList.remove("tshow");
                        });
                    }
                })

                item.appendChild(tempNode)
                item.classList.toggle("Attached")
                container.classList.toggle("Attaching")
            } else {
                let tempNode = document.getElementById(`${identifier}a`)
                let firstitem = document.getElementById(`${identifier}b`)     
                document.addEventListener("mousemove", function() {                   
                    let rect = item.getBoundingClientRect();
                    makeLine(firstitem, tempNode, rect.left + 10, rect.top)
                    if(item.classList.contains("rem")){
                        tempNode.remove()
                    }
                })
                container.classList.toggle("Attaching")
                ConnectString(['Notes', 'Pictures'])
                identifier++
            }
        }
    })

    //Remove function
    item.addEventListener("click", function() {
        if (item.classList.contains("Removable")) {
            item.classList.add("rem")
            item.remove();

            //Cancel after removing one element
            const allElements = document.querySelectorAll("*")
            allElements.forEach(element => {
                element.classList.remove("Removable");
                element.classList.remove("tshow");
            });
        }
    })

    //Recolor function
    item.addEventListener("click", function() {
        if(item.classList.contains("Paintable")) {
            const recolor = item.children[2]
            recolor.style.backdropFilter = `hue-rotate(${hueAngles[currentColor]}deg)`
        }
    })

    //Element specfic functions
    if (item.classList.contains("Notes")) {
        preventFocusLoss(button);
        textFormat(button, item);
    } else if (item.classList.contains("Pictures")) {
        imageLoad(item);
    }
}

function makeLine(item, tempNode, x2, y2) { //Connects a div between 2 elements like a line 
    let rect = item.getBoundingClientRect();
    let x1 = rect.left;
    let y1 = rect.top;

    let hypotenuse = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)); //Distance
    let angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI); //Angle

    tempNode.style.width = `${hypotenuse}px`;
    tempNode.style.transform = `rotate(${angle + 180}deg)`
}

function preventFocusLoss(item) {
    //Prevent Focus loss on button press
    for (let button of item) {
        button.addEventListener("mousedown", function(e) {
            e.preventDefault();
        })
    }
}

function textFormat(textFormattingButtons, item) {
    const text = item.children[1].children[0] //Notes -> text_area -> text_format
    for (let button of textFormattingButtons) { //Iterate over each button, read its title and give it CSS Class with the same name as the title
        const buttonIcon = button.children[0]
        const buttonTitle = buttonIcon.getAttribute("title")
        button.addEventListener("click", function() {
            buttonIcon.classList.toggle("toggled_text_button");
            buttonIcon.classList.toggle(buttonTitle.toLowerCase())
            text.classList.toggle(buttonTitle.toLowerCase())   
        })
    }
}