let currentID = 0;

function imageLoad(item) {
    //Image load and preview
    const img = item.querySelector("#image")
    const fileLoad = item.querySelector(".img_input")
    const label = item.querySelector("label")
        //Give a unique id to the label and input
    label.setAttribute("for", currentID)
    fileLoad.id = currentID++
        //Listen for changes in inputs value (files)
        fileLoad.addEventListener("change", function() {
            if (this.files && this.files[0]) {
                img.onload = () => {
                    URL.revokeObjectURL(img.src); //No longer needed, free memory
                }
                img.src = URL.createObjectURL(this.files[0])
                img.style.display = "block"
                label.style.display = "none"
                item.querySelector("#img_area").style.backgroundColor = "#000"
            }
        })
}