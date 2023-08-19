import * as gen from "./gen.js";

function report() {
    console.log(`Website version ${gen.VERSION}.`);
    console.log(`On revision ${gen.COMMIT}.`);
}

report()

const searchInput = document.getElementById("search");
const list = document.getElementById("list");

let LAST_INPUT = null;

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
            const text = document.createTextNode(key);
            // appending the text to the result item
            resultItem.appendChild(text);
	    
	    // // adding link to item
	    // resultItem.setAttribute("href", "http://www.digitec.ch/");
	    resultItem.href = "http://www.github.com/";
	    
            // appending the result item to the list
            list.appendChild(resultItem);
	}
    }
    
    
    // const posts = gen.POSTS.filter((post) => post.toLowerCase().includes(value));

    // setList(posts);
});

const setList = (posts) => {
    for (const post of posts) {
        // creating a li element for each result item
        const resultItem = document.createElement('div');

        // adding a class to each item of the results
        resultItem.classList.add('result-item');

        // grabbing the name of the current point of the loop and adding the name as the list item's text
        const text = document.createTextNode(post);

        // appending the text to the result item
        resultItem.appendChild(text);

        // appending the result item to the list
        list.appendChild(resultItem);
    }
}

searchInput.addEventListener("blur", (_e) => list.replaceChildren());

// Maybe improvable?
document.getElementById("search-div-wrapper").style.height = document.getElementById("search").style.height + 20;
