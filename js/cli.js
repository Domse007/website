const filetree = [
    {
	name: "/",
	type: "dir",
	children: [
	    {
		name: "home/",
		type: "dir",
		children: [
		    {
			name: "domse007/",
			type: "dir",
			children: [
			    {
				name: "about.org",
				type: "file",
				content: "Hi, It's me."
			    },
			    {
				name: "help.org",
				type: "file",
				content: "See /usr/bin/ for the available commands."
			    }
			]
		    }
		]
	    },
	    {
		name: "usr/",
		type: "dir",
		children: [
		    {
			name: "echo",
			type: "bin",
			command: (args) => println(args.join(" ")),
		    }
		]
	    }
	]
    }
];

let cwd = [ 0, 0, 0 ];
let path = [ 0, 1 ];

const println = (arg) => {
    let stdout = document.getElementById("stdout");
    stdout.innerHTML += `<div class="output">${arg}</div>`;
};

export const runCommand = (input) => {
    let elements = input.split(" ");
    if (elements[0] != null) {
	let args = elements.slice(1);
	let bins = filetree[path.0].children[path.1];
	console.log(`Bins: ${bins}`);
	for (const bin of bins) {
	    if (bin.name == elements[0] && bin.type == "bin") {
		bin.command(args);
		break;
	    }
	}
    }
};

() => {
    let element = document.getElementById("cmd-input-field");
    element.addEventListener("keydown", function (e) {
	console.log("Pressed enter.");
	if (e.code === "Enter") {
            runCommand(e);
	}
    });
}();
