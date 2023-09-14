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

    set setTituloLivro(titulo) {
        this.titulo = titulo;
    }
}

//criando um objeto livro1
const livro1 = new livro("A Economia da Natureza", "Robert E. Ricklefs", "ex: Jane Austen",
 7, "Rio de Janeiro: Guanabara Koogan, 2016", 606, "9788527728768", 
 ["Ecologia", "Diversidade biologica", "Ecossistemas", "Comunidades vegetais"]);

 //imprimindo o objeto livro1
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

//adicionando titulo pelo get
livro2.setTituloLivro = readline.question('Digite o título do livro: ');

//imprimindo o título do livro
console.log(`${livro2.titulo}`.toUpperCase());
console.log('---------------------------------------------------');






