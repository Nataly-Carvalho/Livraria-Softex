//habilitando a biblioteca readline-sync
const readline = require('readline-sync');


//criando a classe livro
class livro {
    constructor(titulo, autor, outrosAutores, edicao, publicacao, paginas, isbn, assuntos) {
        this.titulo = titulo;
        this.autor = autor;
        this.outrosAutores = outrosAutores;
        this.edicao = edicao;
        this.publicacao = publicacao;
        this.paginas = paginas;
        this.isbn = isbn;
        this.assuntos = assuntos;
    }

    //métodos SET
    set setTituloLivro(titulo) {
        this.titulo = titulo;
    }

    set setAutorLivro(autor) {
        this.autor = autor;
    }

    set setOutrosAutoresLivro(outrosAutores) {
        this.outrosAutores = outrosAutores;
    }

    set setEdicaoLivro(edicao) {
        this.edicao = edicao;
    }

    set setPublicacaoLivro(publicacao) {
        this.publicacao = publicacao;
    }

    set setPaginasLivro(paginas) {
        this.paginas = paginas;
    }

    set setIsbnLivro(isbn) {
        this.isbn = isbn;
    }

    set setAssuntosLivro(assuntos) {
        this.assuntos = assuntos;
    }

    //métodos GET
    get getTituloLivro() {
        return this.titulo;
    }

    get getAutorLivro() {
        return this.autor;
    }

    get getOutrosAutoresLivro() {
        return this.outrosAutores;
    }

    get getEdicaoLivro() {
        return this.edicao;
    }

    get getPublicacaoLivro() {
        return this.publicacao;
    }

    get getPaginasLivro() {
        return this.paginas;
    }

    get getIsbnLivro() {
        return this.isbn;
    }

    get getAssuntosLivro() {
        return this.assuntos;
    }

}

//criando um objeto livro1
const livro1 = new livro("A Economia da Natureza", "Robert E. Ricklefs", "ex: Jane Austen",
 7, "Rio de Janeiro: Guanabara Koogan, 2016", 606, "9788527728768", 
 ["Ecologia", "Diversidade biologica", "Ecossistemas", "Comunidades vegetais"]);

 //imprimindo o objeto livro1
 console.log("\n\n");
console.log(`${livro1.titulo}`.toUpperCase());
console.log("------------------------------------------------------------------");
console.log(`Autor principal: ${livro1.autor}`);
console.log(`Outros autores:  ${livro1.outrosAutores}`);
console.log(`Edicao:          ${livro1.edicao}`);
console.log(`Paginas:         ${livro1.paginas}`);
console.log(`Publicacao:      ${livro1.publicacao}`);
console.log(`ISBN:            ${livro1.isbn}`);
console.log(`assuntos:        ${livro1.assuntos}\n\n`);

//criando um objeto livro2
const livro2 = new livro();

//adicionando valores em livro2
livro2.setTituloLivro = readline.question('Digite o titulo do livro: ');
livro2.setAutorLivro = readline.question('Digite o autor principal do livro: ');
livro2.setOutrosAutoresLivro = readline.question('Digite os demais autores do livro (ex: Roberto Ribeiro, Marcelo Mattar): ');
livro2.setEdicaoLivro = readline.question('Digite numero de edicao do livro: ');
livro2.setPaginasLivro = readline.question('Digite o numero de paginas do livro: ');
livro2.setPublicacaoLivro = readline.question('Digite a publicacao do livro (ex: Recife: Ática, 2012): ');
livro2.setIsbnLivro = readline.question('Digite o ISBN do livro: ');
livro2.setAssuntosLivro = readline.question('Digite os assuntos do livro (ex: Ficcao, Romance): ');

//imprimindo cadastro do livro2
console.log("\n\n");
console.log(`${livro2.titulo}`.toUpperCase());
console.log('---------------------------------------------------');
console.log(`Autor principal: ${livro2.autor}`);
console.log(`Outros autores:  ${livro2.outrosAutores}`);
console.log(`Edicao:          ${livro2.edicao}`);
console.log(`Paginas:         ${livro2.paginas}`);
console.log(`Publicacao:      ${livro2.publicacao}`);
console.log(`ISBN:            ${livro2.isbn}`);
console.log(`assuntos:        ${livro2.assuntos}\n\n`);





