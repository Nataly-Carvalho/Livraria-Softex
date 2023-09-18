//criando a classe livro
class Livro {
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

//exportando a classe livro
export {Livro};