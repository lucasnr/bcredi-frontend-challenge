// Máscaras de campos
Vue.component('vue-the-mask',VueTheMask);

// Mensagem de formulário enviado
Vue.component('msg', {
	template: '<div class="success">Parabéns! Cadastro realizado com sucesso!</div>'
});

// Mensagens de erro dos campos
Vue.component('feedback', {
	template: '<div class="invalid-feedback">{{ msg }}</div>',
	props: {
		msg: {
			type: String
		}
	}
});

// Banner lateral do site
Vue.component('banner', {
	template: '#capa'
})

const app = new Vue({
	el: '#app',
	data: {
		bgImage: 'background-image: url(_assets/img/rawpixel-411166-unsplash.png)',
		nome: '',
		email: '',
		cpf: '',
		nasc: '',
		senha: '',
		politica: false,
		escondeSenha: true,
		erro: true,
		success: false,
		mensagens: {
			nome: 'Insira seu nome completo',
			email: 'Insira um e-mail válido',
			cpf: 'Insira um CPF válido',
			nasc: 'Insira uma data válida',
			senha: 'Pelo menos 8 caracteres e não só números',
			politica: 'É necessário estar de acordo com itens acima'
		},
		erros: {
			nome: false,
			email: false,
			cpf: false,
			nasc: false,
			politica: false
		},
		enviar: false
	},
	computed: {
		mobile: function() { // se a tela for menor que 992px
			return this.screenWidth < 992
		},
		tipoSenha: function() { // troca tipo do campo de senha para texto e vice-versa
			return this.escondeSenha ? 'password' : 'text';
		},
		validaNome: function() { // valida o campo Nome
			return(
				this.nome.length < 8 ||
				this.nome.includes(' ') === false
			)
		},
		validaEmail: function() { // valida o campo E-mail
			return(
				this.email.length < 6 ||
				this.validEmail(this.email) === false
			)
		},
		validaCPF: function() { // valida o campo CPF
			return (
				this.cpf.length != 11 ||
				this.isNumeric( this.cpf ) === false
			)
		},
		validaData: function() { // valida o campo Data
			return (
				this.nasc.length != 8 ||
				this.isNumeric( this.nasc ) === false
			)
		},
		validaSenha: function() { // valida o campo Senha
			return (
				this.senha.length < 8 ||
				this.isNumeric( this.senha ) === true
			)
		},
		validaPolitica: function() { // valida o campo Politica
			return (
				this.politica === false
			)
		},
	},
	methods: {
		isNumeric(n) { // Verifica se é número
  		return !isNaN(parseFloat(n)) && isFinite(n);
		},
		checkForm() { // Checa se está preenchido corretamente e faz o "envio" do formulário
			this.enviar = true;
			this.verificaErros();
			if( this.erro === false ) {
				this.success = true;
				this.resetForm();
				document.body.scrollTop = 0;
	 			document.documentElement.scrollTop = 0;
			}
		},
		resetForm() { // Limpa os campos do formulário
			this.nome = '';
			this.email = '';
			this.cpf = '';
			this.nasc = '';
			this.senha = '';
			this.politica = '';
			this.escondeSenha = true;
			this.erro = false;
			this.enviar = false;
		},
		validEmail:function(email) { // Verifica se o conteúdo está no formato de e-mail válido
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
		verificaErros: function() { // Verifica se os campos estão preenchidos corretamente
			if(
				this.validaNome === true ||
				this.validaEmail === true ||
				this.validaCPF === true ||
				this.validaData === true ||
				this.validaPolitica === true
			) {
				this.erro = true;
			} else {
				this.erro = false;
			}
		}
	},
	mounted(){ // Evento para captar a largura da janela
	    screen.addEventListener("resize", ()=> this.screenWidth = screen.width);
	}
});
