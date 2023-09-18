//habilitando a biblioteca readline-sync
import readline from "readline-sync";

//importando a classe livro
import {Livro} from "./classeLivro.js"

// importando funcao auxiliar
import {padrao} from "./funcaoAuxiliar.js"

//classe banco
class banco {
    constructor() {
    this.acervo = [];
    }

    //métodos do menu
    listar() {
        console.clear();
        padrao("titulo","","LISTAGEM DOS LIVROS CADASTRADOS");

        for (const livro of this.acervo){
            console.log(`${livro.getTituloLivro}`.toUpperCase());
            console.log("------------------------------------------------------------------");
            console.log(`Autor principal: ${livro.getAutorLivro}`);
            console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
            console.log(`Edicao:          ${livro.getEdicaoLivro}`);
            console.log(`Paginas:         ${livro.getPaginasLivro}`);
            console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
            console.log(`ISBN:            ${livro.getIsbnLivro}`);
            console.log(`Assuntos:        ${livro.getAssuntosLivro}\n\n`);
        }

        readline.question('ENTER para continuar...', {hideEchoBack: true, mask: ''});
    }

    cadastrar() {
        //variáveis locais
        let loop = true;
        let continuar = '';
        let nao_encontrou = true;

        while(loop) {
            console.clear();
            padrao("titulo", "","CADASTRO DE LIVRO");
            //criando um novo objeto livro
            const livro = new Livro();
            //adicionando valores no novo objeto livro
            while(loop){
                livro.setTituloLivro = readline.question("Digite o titulo do livro: ");
                if(livro.titulo.length !==0 ){
                    break;
                }else{
                    padrao("aviso","","Campo Obrigatorio! Por favor forneça o Titulo do livro");
                }
            }

            livro.setAutorLivro = readline.question("Digite o nome do autor do livro: ");
            livro.setOutrosAutoresLivro = readline.question("Digite o nome dos outros autores (ex: autor1,autor2):").split(',');
            livro.setEdicaoLivro = readline.question("Digite o numero da edicao do livro: ");
            livro.setPaginasLivro = readline.question("Digite o numero de paginas do livro: ");
            livro.setPublicacaoLivro = readline.question("Digite a publicacao do livro (ex: Sao Paulo: Companhia das Letras, 2000): ");

            while(loop){
                nao_encontrou = true;
                livro.setIsbnLivro = readline.question("Digite o ISBN do livro (apenas numeros): ");
                for (const book of this.acervo) {
                    if (book.isbn === livro.getIsbnLivro) {
                        nao_encontrou = false;
                        break;
                    }
                }

                if(livro.getIsbnLivro.length !==0 && nao_encontrou === true){
                    break;
                } else if(nao_encontrou === false) {
                    padrao("aviso","","ISBN ja cadastrado!");
                } else{
                    padrao("aviso","","Campo Obrigatorio! Por favor forneça o ISBN do livro.");
                    }
            }

            while (loop) {
                livro.setAssuntosLivro = readline.question("Digite os assuntos do livro separados por virgula (ex: assunto1,assunto2): ");
                if (livro.getAssuntosLivro.length !== 0) {
                    livro.setAssuntosLivro = livro.assuntos.split(',');
                    break;
                } else {
                    padrao("aviso","","Pelo menos um assunto deve ser fornecido.");
                }
            }

            //condição para cadastrar ou não o livro
            console.log(`\n${livro.getTituloLivro}`.toUpperCase());
            console.log("------------------------------------------------------------------");
            console.log(`Autor principal: ${livro.getAutorLivro}`);
            console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
            console.log(`Edicao:          ${livro.getEdicaoLivro}`);
            console.log(`Paginas:         ${livro.getPaginasLivro}`);
            console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
            console.log(`ISBN:            ${livro.getIsbnLivro}`);
            console.log(`Assuntos:        ${livro.getAssuntosLivro}\n\n`);
            continuar = padrao("pergunta",[1,2], "Deseja cadastrar este livro?\n\n1 - Sim\n2 - Não\n\nEscolha uma opção: ");
            if (continuar == "1") {
                this.acervo.push(livro);
                    padrao("positivo","","Livro cadastrado com sucesso!");
                } else if (continuar == "2") {
                    padrao("aviso","","Cadastro descartado!");
                }

                //condição para continuar ou não cadastrando novos livros
                    continuar = padrao("pergunta",[1,2], "Deseja realizar um novo cadastro?\n\n1 - Sim\n2 - Não\n\nEscolha uma opção: ");
                    if (continuar == '1') {
                        loop = true;
                    } else if (continuar == '2') {
                        loop = false;
                    }
            }
        }

    buscar() {
        //variáveis locais
        let loop = true;
        let continuar;
        let nao_encontrou;
        let isbnBusca;

        while(loop) {
            nao_encontrou = true;
            console.clear();
            padrao("titulo","","BUSCAR LIVRO");
            isbnBusca = readline.question("Digite o ISBN do livro (apenas numeros): ");
            for (const livro of this.acervo) {
                if (livro.getIsbnLivro === isbnBusca) {
                    padrao("positivo","","Livro encontrado:");
                    console.log(`${livro.getTituloLivro}`.toUpperCase());
                    console.log("------------------------------------------------------------------");
                    console.log(`Autor principal: ${livro.getAutorLivro}`);
                    console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                    console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                    console.log(`Paginas:         ${livro.getPaginasLivro}`);
                    console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                    console.log(`ISBN:            ${livro.getIsbnLivro}`);
                    console.log(`Assuntos:        ${livro.getAssuntosLivro}\n\n`);
                    nao_encontrou = false;
                }
            }
            if (nao_encontrou) { 
                padrao("aviso","",`Nenhum registro com o ISBN ${isbnBusca} foi encontrado.`);
            }
            continuar = padrao("pergunta",[1,2],"Realizar uma nova busca?\n\n1 - Sim\n2 - Não\n\nEscolha uma opção: ");
            if (continuar == "2") {
                loop = false;
            }
        }
    }

    alterar() {
        //variáveis locais
        let posicao;
        let livro_alterado;
        let op;
        let loop = true;
        let tituloLivro;
        let autorLivro;            
        let outrosAutoresLivro;         
        let edicaoLivro;           
        let publicacaoLivro;      
        let paginasLivro;          
        let isbnLivro;            
        let assuntosLivro;
        let continuar;
        let alterar;
        let nao_encontrou = true;
        let isbnBusca;

        function continuarAlterando () {
            continuar = padrao("pergunta",[1,2], "Deseja continuar alterando este livro?\n\n1 - Sim\n2 - Não\n\nEscolha uma opção: ");
            if (continuar == '1') {
                    alterar = true;
                } else if (continuar == '2') {
                    alterar = false;
                }
        }

        while(loop) {
            //loop = true;
            nao_encontrou = true;
            console.clear();
            padrao("titulo","","ALTERAR CADASTRO");
            isbnBusca = readline.question('Digite o ISBN do livro (apenas numeros): ');
            for (const livro of this.acervo) {
                if (livro.getIsbnLivro === isbnBusca) {
                    //posicao = this.acervo.indexOf(livro);
                    //livro_alterado = this.acervo[posicao];
                    padrao("positivo","","Livro encontrado:");
                    console.log(`${livro.getTituloLivro}`.toUpperCase());
                    console.log("------------------------------------------------------------------");
                    console.log(`Autor principal: ${livro.getAutorLivro}`);
                    console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                    console.log(`Edição:          ${livro.getEdicaoLivro}`);
                    console.log(`Paginas:         ${livro.getPaginasLivro}`);
                    console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                    console.log(`ISBN:            ${livro.getIsbnLivro}`);
                    console.log(`assuntos:        ${livro.getAssuntosLivro}`);

                    do {
                        console.log("\nO que deseja alterar?\n");
                        console.log("1 - Título");
                        console.log("2 - Autor Principal");
                        console.log("3 - Outros autores");
                        console.log("4 - Edição");
                        console.log("5 - Publicacao");
                        console.log("6 - Paginas");
                        console.log("7 - ISBN");
                        console.log("8 - Assuntos");
                        console.log("0 - Sair");
                        op = padrao("pergunta",[0,1,2,3,4,5,6,7,8]);

                            switch (op) {
                                case "1":
                                    while(loop){
                                        tituloLivro = readline.question("\nDigite o título do livro: ");
                                        if(tituloLivro.length !==0 ){
                                            livro.setTituloLivro = tituloLivro;
                                            //this.acervo[posicao] = livro_alterado;
                                            break;
                                        }else{
                                            padrao("erro","","Campo Obrigatorio: O Título do livro deve ser informado!")
                                        }
                                    }
                                    padrao("positivo","","Alteracao realizada com sucesso!");
                                    console.log(`${livro.getTituloLivro}`.toUpperCase());
                                    console.log("------------------------------------------------------------------");
                                    console.log(`Autor principal: ${livro.getAutorLivro}`);
                                    console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                                    console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                                    console.log(`Paginas:         ${livro.getPaginasLivro}`);
                                    console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                                    console.log(`ISBN:            ${livro.getIsbnLivro}`);
                                    console.log(`assuntos:        ${livro.getAssuntosLivro}`);

                                    continuarAlterando();
                                    break;

                                case "2":
                                    autorLivro = readline.question('\nDigite o nome do autor do livro: ');
                                    //livro_alterado.setAutorLivro = autorLivro;
                                    livro.setAutorLivro = autorLivro;
                                    //this.acervo[posicao] = livro_alterado;

                                    padrao("positivo","","Alteracao realizada com sucesso!");
                                    console.log(`${livro.getTituloLivro}`.toUpperCase());
                                    console.log("------------------------------------------------------------------");
                                    console.log(`Autor principal: ${livro.getAutorLivro}`);
                                    console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                                    console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                                    console.log(`Paginas:         ${livro.getPaginasLivro}`);
                                    console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                                    console.log(`ISBN:            ${livro.getIsbnLivro}`);
                                    console.log(`assuntos:        ${livro.getAssuntosLivro}`);
                                    
                                    continuarAlterando();
                                    break;
                                    
                                case 3:
                                    outrosAutoresLivro = readline.question("\nDigite o nome dos outros autores (ex: autor1,autor2): ").split(',');
                                    livro.setOutrosAutoresLivro = outrosAutoresLivro;
                                    //livro_alterado.setOutrosAutoresLivro = outrosAutoresLivro;
                                    //this.acervo[posicao] = livro_alterado;
                                    padrao("positivo","","Alteracao realizada com sucesso!");
                                    console.log(`${livro.getTituloLivro}`.toUpperCase());
                                    console.log("------------------------------------------------------------------");
                                    console.log(`Autor principal: ${livro.getAutorLivro}`);
                                    console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                                    console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                                    console.log(`Paginas:         ${livro.getPaginasLivro}`);
                                    console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                                    console.log(`ISBN:            ${livro.getIsbnLivro}`);
                                    console.log(`Assuntos:        ${livro.getAssuntosLivro}`);
                                
                                    continuarAlterando();
                                    break;

                                case 4:
                                    edicaoLivro = readline.question('\n\nDigite o numero da edicao do livro: ');
                                    livro.setEdicaoLivro = edicaoLivro;
                                    //livro_alterado.setEdicaoLivro = edicaoLivro;
                                    //this.acervo[posicao] = livro_alterado;
                                
                                    padrao("positivo","","Alteracao realizada com sucesso!");
                                    console.log(`${livro.getTituloLivro}`.toUpperCase());
                                    console.log("------------------------------------------------------------------");
                                    console.log(`Autor principal: ${livro.getAutorLivro}`);
                                    console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                                    console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                                    console.log(`Paginas:         ${livro.getPaginasLivro}`);
                                    console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                                    console.log(`ISBN:            ${livro.getIsbnLivro}`);
                                    console.log(`Assuntos:        ${livro.getAssuntosLivro}`);

                                    continuarAlterando();
                                    break;

                                    case 5:
                                        publicacaoLivro = readline.question('\n\nDigite a publicacao do livro (ex: Sao Paulo: Companhia das Letras, 2000): ');
                                        livro_alterado.setPublicacaoLivro = publicacaoLivro;
                                        this.acervo[posicao] = livro_alterado;

                                        console.log('\n\tAlteracao realizada com sucesso!\n');
                                        console.log(`${livro.getTituloLivro}`.toUpperCase());
                                        console.log("------------------------------------------------------------------");
                                        console.log(`Autor principal: ${livro.getAutorLivro}`);
                                        console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                                        console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                                        console.log(`Paginas:         ${livro.getPaginasLivro}`);
                                        console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                                        console.log(`ISBN:            ${livro.getIsbnLivro}`);
                                        console.log(`assuntos:        ${livro.getAssuntosLivro}\n\n`);
                                    
                                    
                                        do {
                                            continuar = readline.question('\nDeseja continuar alterando este livro? <Digite 1 para sim ou 2 para nao>: ');
                                            continuar = continuar.toLowerCase();
                                            if (continuar == '1') {
                                                alterar = true;
                                            } else if (continuar == '2') {
                                                alterar = false;
                                            } else {
                                                console.log('\n\tResposta invalida!');
                                            }
                                        } while (continuar != '1' && continuar != '2');
                                        break;

                                    case 6:
                                        paginasLivro = readline.question('\n\nDigite o numero de paginas do livro: ');
                                        livro_alterado.setPaginasLivro = paginasLivro;
                                        this.acervo[posicao] = livro_alterado;

                                        console.log('\n\tAlteracao realizada com sucesso!\n');
                                        console.log(`${livro.getTituloLivro}`.toUpperCase());
                                        console.log("------------------------------------------------------------------");
                                        console.log(`Autor principal: ${livro.getAutorLivro}`);
                                        console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                                        console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                                        console.log(`Paginas:         ${livro.getPaginasLivro}`);
                                        console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                                        console.log(`ISBN:            ${livro.getIsbnLivro}`);
                                        console.log(`assuntos:        ${livro.getAssuntosLivro}\n\n`);
                                    
                                    
                                        do {
                                            continuar = readline.question('\nDeseja continuar alterando este livro?  <Digite 1 para sim ou 2 para nao>: ');
                                            continuar = continuar.toLowerCase();
                                            if (continuar == '1') {
                                                alterar = true;
                                            } else if (continuar == '2') {
                                                alterar = false;
                                            } else {
                                                console.log('\n\tResposta invalida!');
                                            }
                                        } while (continuar != '1' && continuar != '2');
                                        break;

                                        case 7:
                                            while(loop){
                                                nao_encontrou = true;
                                                isbnLivro = readline.question("\n\nDigite o ISBN do livro (apenas numeros): ");
                                                for (const livro of this.acervo) {
                                                    if (livro.isbn === isbnLivro && livro_alterado === livro) {
                                                        nao_encontrou = true;
                                                    } else if (livro.isbn === isbnLivro && livro_alterado !== livro) {
                                                        nao_encontrou = false;
                                                        break;
                                                    }
                                                }
                                            
                                                if(isbnLivro.length !==0 && nao_encontrou === true){
                                                    livro_alterado.isbn = isbnLivro;
                                                    this.acervo[posicao] = livro_alterado;
                                                    break;
                                                } else if(nao_encontrou == false) {
                                                    console.log("----------------------------------------------------");
                                                    console.log("                ISBN ja cadastrado!");
                                                    console.log("----------------------------------------------------");
                                                }else {
                                                    console.log("----------------------------------------------------");
                                                    console.log("Campo Obrigatorio! Por favor forneça o ISBN do livro.");
                                                    console.log("----------------------------------------------------");
                                                }
                                            }
                                        
                                            console.log('\n\tAlteracao realizada com sucesso!\n');
                                            console.log(`${livro.getTituloLivro}`.toUpperCase());
                                            console.log("------------------------------------------------------------------");
                                            console.log(`Autor principal: ${livro.getAutorLivro}`);
                                            console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                                            console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                                            console.log(`Paginas:         ${livro.getPaginasLivro}`);
                                            console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                                            console.log(`ISBN:            ${livro.getIsbnLivro}`);
                                            console.log(`assuntos:        ${livro.getAssuntosLivro}\n\n`);
                                        
                                        
                                            do {
                                                continuar = readline.question('\nDeseja continuar alterando este livro?  <Digite 1 para sim ou 2 para nao>: ');
                                                continuar = continuar.toLowerCase();
                                                if (continuar == '1') {
                                                    alterar = true;
                                                } else if (continuar == '2') {
                                                    alterar = false;
                                                } else {
                                                    console.log('\n\tResposta invalida!');
                                                }
                                            } while (continuar != '1' && continuar != '2');
                                            break;
                                        case 8:
                                            while (loop) {
                                                assuntosLivro = readline.question("\n\nDigite os assuntos do livro separados por virgula (ex: assunto1,assunto2): ");
                                                if (assuntosLivro.length !== 0) {
                                                    assuntosLivro = assuntosLivro.split(',');
                                                    livro_alterado.assuntos = assuntosLivro;
                                                    this.acervo[posicao] = livro_alterado;
                                                    break;
                                                } else {
                                                    console.log("-----------------------------------------")
                                                    console.log("Pelo menos um assunto deve ser fornecido.");
                                                    console.log("-----------------------------------------")
                                                }
                                            }
                                        
                                            console.log('\n\tAlteracao realizada com sucesso!\n');
                                            console.log(`${livro.getTituloLivro}`.toUpperCase());
                                            console.log("------------------------------------------------------------------");
                                            console.log(`Autor principal: ${livro.getAutorLivro}`);
                                            console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                                            console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                                            console.log(`Paginas:         ${livro.getPaginasLivro}`);
                                            console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                                            console.log(`ISBN:            ${livro.getIsbnLivro}`);
                                            console.log(`assuntos:        ${livro.getAssuntosLivro}\n\n`);
                                        
                                        
                                        
                                            do {
                                                continuar = readline.question('\nDeseja continuar alterando este livro?  <Digite 1 para sim ou 2 para nao>: ');
                                                continuar = continuar.toLowerCase();
                                                if (continuar == '1') {
                                                    alterar = true;
                                                } else if (continuar == '2') {
                                                    alterar = false;
                                                } else {
                                                    console.log('\n\tResposta invalida!');
                                                }
                                            } while (continuar != '1' && continuar != '2');
                                            break;
                                        
                                case 0:
                                    alterar = false;
                                    break;
                            }
                    } while (alterar);
                    nao_encontrou = false;
                    //break;
                }
            }
            if (nao_encontrou) {
                padrao("erro","","Livro nao encontrado!");
            }
            
            continuar = padrao("pergunta",[1,2], "Deseja altear outro cadastro?\n\n1 - Sim\n2 - Não\n\nEscolha uma opção: ");
            if (continuar == '1') {
                loop = true;
            } else if (continuar == '2') {
                loop = false;
            }
        }
    }

    remover() {
        //variáveis locais
        let posicao;
        let nao_encontrou;
        let remover;
        let loop = true;
        let continuar;
        let isbnBusca;

        while(loop) {
            nao_encontrou = true;
            console.clear();
            padrao("titulo","","REMOVENDO CADASTRO DE LIVRO");
            isbnBusca = readline.question("Digite o ISBN do livro (apenas numeros): ");
            for (const livro of this.acervo) {
                if (livro.isbn === isbnBusca) {
                    posicao = this.acervo.indexOf(livro);
                    padrao("positivo","","Livro encontrado:");
                    console.log(`${livro.getTituloLivro}`.toUpperCase());
                    console.log("------------------------------------------------------------------");
                    console.log(`Autor principal: ${livro.getAutorLivro}`);
                    console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                    console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                    console.log(`Paginas:         ${livro.getPaginasLivro}`);
                    console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                    console.log(`ISBN:            ${livro.getIsbnLivro}`);
                    console.log(`Assuntos:        ${livro.getAssuntosLivro}\n\n`);
                    nao_encontrou = false;

                    remover = padrao("pergunta",[1,2],"Deseja remover o livro?\n\n1 - Sim\n2 - Não\n\nEscolha uma opção: ");
                    if (remover == "1") {
                        this.acervo.splice(posicao, 1);
                        padrao("positivo","","Remoção concluida!");
                    } else if (remover == "2") {
                        padrao("positivo","","Remoção cancelada!");
                    }
                }
            }
            if (nao_encontrou) { 
                padrao("aviso","",`Nenhum registro com o ISBN ${isbnBusca} foi encontrado.`);
            }
            //condição para continuar ou não removendo livros
            continuar = padrao("pergunta",[1,2],"Realizar uma nova remoção?\n\n1 - Sim\n2 - Não\n\nEscolha uma opção: ");
            if (continuar == "2") {
                loop = false;
            }
        }
    }
}
//exportando a classe banco
export {banco};
