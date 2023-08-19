import * as gen from "./gen.js";

function report() {
    console.log(`Website version ${gen.VERSION}.`);
    console.log(`On revision ${gen.COMMIT}.`);
}

report()

const searchInput = document.getElementById("search");
const list = document.getElementById("list");

searchInput.addEventListener("input", (e) => {
    const input = e.target.value.trim().toLowerCase();

    // First: delete all results
    list.replaceChildren();
    
    for (const [key, value] of Object.entries(gen.POSTS)) {
	if (key.toLowerCase().includes(input)) {
	    let resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            // grabbing the name of the current point of the loop and adding the
	    // name as the list item's text
            const anchor = document.createElement('a');

            anchor.href = `./${value}`;
            anchor.innerText = key;
            
            resultItem.appendChild(anchor);
            
            // appending the result item to the list
            list.appendChild(resultItem);
	}
    }
});

searchInput.addEventListener("blur", (e) => {
    const input = e.target.value.trim().toLowerCase();
    if (input.length == 0) {
        list.replaceChildren();
    }
});
