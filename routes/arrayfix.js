let arr = JSON.parse(stringArray);
	
	
																
if (Array.isArray(arr)) {
    arr.forEach(element => {
        console.log(element);
    });
} else {
    console.log("arr is not an array.");
    console.log(arr)
}