const form = document.querySelector("#form");
const email = form.querySelector("#email");
const cpf = form.querySelector("#cpf");
const birthday = form.querySelector("#birthday");
const password = form.querySelector("#password");
const terms = form.querySelector("#terms");

form.onsubmit = function(event) {
	event.preventDefault();
	let valid = true;

	if (!validateEmail(email.value)) {
		email.classList.add("invalid");
		valid = false;
	} else email.classList.remove("invalid");

	if (!validateCPF(cpf.value)) {
		cpf.classList.add("invalid");
		valid = false;
	} else cpf.classList.remove("invalid");

	if (!validateBirthday(birthday.value)) {
		birthday.classList.add("invalid");
		valid = false;
	} else birthday.classList.remove("invalid");

	if (!validatePassword(password.value)) {
		password.classList.add("invalid");
		valid = false;
	} else password.classList.remove("invalid");

	if (!terms.checked) {
		terms.parentElement.classList.add("invalid");
		valid = false;
	} else terms.parentElement.classList.remove("invalid");

	if (valid) form.classList.add("success");
};

const validateEmail = function(email) {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return regex.test(email.toLowerCase());
};

const validateCPF = function(cpf) {
	cpf = cpf.replace(/[^\d]+/g, "");
	if (cpf == "") return false;
	// Elimina CPFs invalidos conhecidos
	if (
		cpf.length != 11 ||
		cpf == "00000000000" ||
		cpf == "11111111111" ||
		cpf == "22222222222" ||
		cpf == "33333333333" ||
		cpf == "44444444444" ||
		cpf == "55555555555" ||
		cpf == "66666666666" ||
		cpf == "77777777777" ||
		cpf == "88888888888" ||
		cpf == "99999999999"
	)
		return false;
	// Valida 1o digito
	add = 0;
	for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11) rev = 0;
	if (rev != parseInt(cpf.charAt(9))) return false;
	// Valida 2o digito
	add = 0;
	for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11) rev = 0;
	if (rev != parseInt(cpf.charAt(10))) return false;
	return true;
};

const validateBirthday = function(birthday) {
	const dayMonthYear = birthday.split("/");
	const birthdate = new Date(
		dayMonthYear[2],
		dayMonthYear[1] - 1,
		dayMonthYear[0]
	);
	return birthdate.getFullYear() <= new Date().getFullYear();
};

const validatePassword = function(password) {
	return password.length >= 8;
};
