let arr = [1, 2, 3, 4, 5];

async function test(index) {
	let id = arr[index];

	if (id) {
		console.log(id);
		return test(index + 1);
	} else {
		return "end of arr";
	}
}

async function letsGo() {
	let result = await test(0);
	console.log("result:", result);
}

letsGo();
