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
    for(let object of json) { //Build HTML Structure and fill it with data from JSON File
        const list = document.createElement("li")
        list.classList.add("log")
        const date = document.createElement("p")
        const dateText = document.createTextNode(object.update.date)
        date.appendChild(dateText)
        list.appendChild(date)
        const changes = document.createElement("ul")
        for(let change of object.update.changes) { //Check each update entry in JSON and put it into the list
            const entry = document.createElement("li");
            const entryText = document.createTextNode(change) 
            entry.appendChild(entryText)
            changes.appendChild(entry)
        }
        list.appendChild(changes)

        logs.appendChild(list)
    }
}
