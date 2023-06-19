fetch("changes.json")
    .then((response) => {
        if(!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((json) => initialize(json))
    .catch((err) => console.error(`Fetch problem: ${err.message}`))

function initialize(json) {
    const logs = document.getElementById("logs")
    for(let object of json) { //Iterate over each Object inside the JSON file.
       const element = buildUpdateLog(object)
       logs.appendChild(element) //Append the built element to DOM
    }
}

function buildUpdateLog(object) {
    const list = document.createElement("li") //Create the Update log 
    list.classList.add("log")

    const date = document.createElement("p") //Create the date header and append text to it
    const dateText = document.createTextNode(object.update.date)
    date.appendChild(dateText)
  
    const changes = document.createElement("ul")
    for(let change of object.update.changes) { //Check each update entry in our Object and put it into the list of changes.
        const entry = document.createElement("li");
        const entryText = document.createTextNode(change) 
        entry.appendChild(entryText)
        changes.appendChild(entry)
    }
    list.appendChild(date) //Append everything to our Update log.
    list.appendChild(changes)
    return list
}