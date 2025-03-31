const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

var nameInput = document.getElementById("name");
nameInput.addEventListener("input", function(event) {
var inputVal = nameInput.value;
var regex = /[^A-Za-z]/gi;
if (regex.test(inputVal)) {
	nameInput.value = inputVal.replace(regex, "");
}
});