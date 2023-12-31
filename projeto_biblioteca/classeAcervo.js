//habilitando a biblioteca readline-sync
import readline from "readline-sync";

//importando a classe livro
import {Livro} from "./classeLivro.js"

//classe banco
class banco {
    constructor() {
    this.acervo = [];
    }

    //métodos do menu
    listar() {
        console.clear();
        console.log("\n__________LISTAGEM DOS LIVROS CADASTRADOS__________\n");

        for (const livro of this.acervo){
            console.log(`${livro.getTituloLivro}`.toUpperCase());
            console.log("------------------------------------------------------------------");
            console.log(`Autor principal: ${livro.getAutorLivro}`);
            console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
            console.log(`Edicao:          ${livro.getEdicaoLivro}`);
            console.log(`Paginas:         ${livro.getPaginasLivro}`);
            console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
            console.log(`ISBN:            ${livro.getIsbnLivro}`);
            console.log(`assuntos:        ${livro.getAssuntosLivro}\n\n`);
        }

        readline.keyInPause();
    }


    cadastrar() {
        //variáveis locais
        let loop = true;
        let continuar = '';
        let nao_encontrou = true;

        while(loop) {
            console.clear();
            console.log("\n__________CADASTRO DE LIVRO__________\n");
        
            //criando um novo objeto livro
            const livro = new Livro();

           //adicionando valores no novo objeto livro
           while(loop){
            livro.setTituloLivro = readline.question("Digite o titulo do livro: ");
            if(livro.titulo.length !==0 ){
                break;
            }else{
                    console.log("------------------------------------------------------")
                    console.log("Campo Obrigatorio! Por favor forneça o Titulo do livro")
                    console.log("------------------------------------------------------\n")
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
                    console.log("----------------------------------------------------");
                    console.log("                ISBN ja cadastrado!");
                    console.log("----------------------------------------------------\n");
                  } else{
                      console.log("----------------------------------------------------");
                      console.log("Campo Obrigatorio! Por favor forneça o ISBN do livro.");
                      console.log("----------------------------------------------------\n");
                    }
            }

            while (loop) {
                livro.setAssuntosLivro = readline.question("Digite os assuntos do livro separados por virgula (ex: assunto1,assunto2): ");
                if (livro.getAssuntosLivro.length !== 0) {
                    livro.setAssuntosLivro = livro.assuntos.split(',');
                    break;
                } else {
                    console.log("-----------------------------------------");
                    console.log("Pelo menos um assunto deve ser fornecido.");
                    console.log("-----------------------------------------\n");
                  }
            }

            //condição para cadastrar ou não o livro
            do {
                console.log(`\n\n${livro.getTituloLivro}`.toUpperCase());
                console.log("------------------------------------------------------------------");
                console.log(`Autor principal: ${livro.getAutorLivro}`);
                console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                console.log(`Paginas:         ${livro.getPaginasLivro}`);
                console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                console.log(`ISBN:            ${livro.getIsbnLivro}`);
                console.log(`assuntos:        ${livro.getAssuntosLivro}\n\n`);

                continuar = readline.question('\nDeseja cadastrar este livro? <sim / nao> : ');
                continuar = continuar.toLowerCase();
                if (continuar == 'sim') {
                    this.acervo.push(livro);
                    console.log("\n\tLivro cadastrado com sucesso!\n");
                } else if (continuar == 'nao') {
                    console.log("\n\tCadastrado descartado!\n");
                  } else {
                    console.log('\n\tResposta invalida!');
                    }
            } while (continuar != 'sim' && continuar != 'nao');

            //condição para continuar ou não cadastrando novos livros
            do {
                continuar = readline.question('\nDeseja realizar um novo cadastro? <sim / nao> : ');
                continuar = continuar.toLowerCase();
                if (continuar == 'sim') {
                    loop = true;
                } else if (continuar == 'nao') {
                    loop = false;
                  } else {
                    console.log('\n\tResposta invalida!');
                    }
            } while (continuar != 'sim' && continuar != 'nao');
        }
    }


 buscar() {
    //variáveis locais
    let loop = true;
    let continuar = true;
    let nao_encontrou = true;
    let op;
    let isbnBusca;

    while(loop) {
        continuar = true;
        nao_encontrou = true;
        console.clear();
        console.log("\n__________BUSCAR LIVRO__________\n");
        isbnBusca = readline.question('Digite o ISBN do livro (apenas numeros): ');
        for (const livro of this.acervo) {
            if (livro.getIsbnLivro === isbnBusca) {
                console.log(`\n\tLivro encontrado:\n`);
                console.log(`${livro.getTituloLivro}`.toUpperCase());
                console.log("------------------------------------------------------------------");
                console.log(`Autor principal: ${livro.getAutorLivro}`);
                console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                console.log(`Paginas:         ${livro.getPaginasLivro}`);
                console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                console.log(`ISBN:            ${livro.getIsbnLivro}`);
                console.log(`assuntos:        ${livro.getAssuntosLivro}\n\n`);
                nao_encontrou = false;
            }
        }
        if (nao_encontrou) { 
            console.log(`\n\tNenhum registro com o ISBN ${isbnBusca} foi encontrado.`);
        }
        while(continuar) {
            op = readline.question("\nRealizar uma nova busca? <sim / nao> : ");
            op = op.toLowerCase();
            switch (op) {
                case "sim":
                    continuar = false;
                    loop = true;
                    break;
                case "nao":
                    continuar = false;
                    loop = false;
                    break;
            default:
                console.log('\n\tResposta invalida!\n');
                break;
        }
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

    while(loop) {
        loop = true;
        nao_encontrou = true;

        console.clear();
        console.log("\n__________ALTERANDO CADASTRO DE LIVRO__________\n");
        isbnBusca = readline.question('Digite o ISBN do livro (apenas numeros): ');
        for (const livro of this.acervo) {
            if (livro.getIsbnLivro === isbnBusca) {
                        posicao = this.acervo.indexOf(livro);
                        livro_alterado = this.acervo[posicao];
                        console.log('\n\tLivro encontrado:\n');
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
                            op = readline.questionInt(`
O que deseja alterar?
---------------------
1. Titulo
2. Autor Principal
3. Outros autores
4. Edicao
5. Publicacao
6. Paginas 
7. ISBN
8. Assuntos
0. Sair
____________________
=> `);

                            switch (op) {
                                case 1:
                                    while(loop){
                                        tituloLivro = readline.question("\n\nDigite o titulo do livro: ");
                                        if(tituloLivro.length !==0 ){
                                            livro_alterado.setTituloLivro = tituloLivro;
                                            this.acervo[posicao] = livro_alterado;
                                            break;
                                        }else{
                                            console.log("------------------------------------------------------")
                                            console.log("Campo Obrigatorio! Por favor forneça o Titulo do livro")
                                            console.log("------------------------------------------------------")
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
                                        continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                        continuar = continuar.toLowerCase();
                                        if (continuar == 'sim') {
                                            alterar = true;
                                        } else if (continuar == 'nao') {
                                            alterar = false;
                                        } else {
                                            console.log('\n\tERRO: Resposta invalida!');
                                        }
                                    } while (continuar != 'sim' && continuar != 'nao');
                                    break;

                                case 2:
                                    autorLivro = readline.question('\n\nDigite o nome do autor do livro: ');
                                    livro_alterado.setAutorLivro = autorLivro;
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
                                        continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                        continuar = continuar.toLowerCase();
                                        if (continuar == 'sim') {
                                            alterar = true;
                                        } else if (continuar == 'nao') {
                                            alterar = false;
                                        } else {
                                            console.log('\n\tResposta invalida!');
                                        }
                                    } while (continuar != 'sim' && continuar != 'nao');
                                    break;
                            
                                case 3:
                                    outrosAutoresLivro = readline.question("\n\nDigite o nome dos outros autores (ex: autor1,autor2):").split(',');
                                    livro_alterado.setOutrosAutoresLivro = outrosAutoresLivro;
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
                                        continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                        continuar = continuar.toLowerCase();
                                        if (continuar == 'sim') {
                                            alterar = true;
                                        } else if (continuar == 'nao') {
                                            alterar = false;
                                        } else {
                                            console.log('\n\tResposta invalida!');
                                        }
                                    } while (continuar != 'sim' && continuar != 'nao');
                                    break;

                                case 4:
                                    edicaoLivro = readline.question('\n\nDigite o número da edicao do livro: ');
                                    livro_alterado.setEdicaoLivro = edicaoLivro;
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
                                        continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                        continuar = continuar.toLowerCase();
                                        if (continuar == 'sim') {
                                            alterar = true;
                                        } else if (continuar == 'nao') {
                                            alterar = false;
                                        } else {
                                            console.log('\n\tResposta invalida!');
                                        }
                                    } while (continuar != 'sim' && continuar != 'nao');
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
                                        continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                        continuar = continuar.toLowerCase();
                                        if (continuar == 'sim') {
                                            alterar = true;
                                        } else if (continuar == 'nao') {
                                            alterar = false;
                                        } else {
                                            console.log('\n\tResposta invalida!');
                                        }
                                    } while (continuar != 'sim' && continuar != 'nao');
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
                                        continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                        continuar = continuar.toLowerCase();
                                        if (continuar == 'sim') {
                                            alterar = true;
                                        } else if (continuar == 'nao') {
                                            alterar = false;
                                        } else {
                                            console.log('\n\tResposta invalida!');
                                        }
                                    } while (continuar != 'sim' && continuar != 'nao');
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
                                            continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                            continuar = continuar.toLowerCase();
                                            if (continuar == 'sim') {
                                                alterar = true;
                                            } else if (continuar == 'nao') {
                                                alterar = false;
                                            } else {
                                                console.log('\n\tResposta invalida!');
                                            }
                                        } while (continuar != 'sim' && continuar != 'nao');
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
                                            continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                            continuar = continuar.toLowerCase();
                                            if (continuar == 'sim') {
                                                alterar = true;
                                            } else if (continuar == 'nao') {
                                                alterar = false;
                                            } else {
                                                console.log('\n\tResposta invalida!');
                                            }
                                        } while (continuar != 'sim' && continuar != 'nao');
                                        break;
    
                                    case 0:
                                        alterar = false;
                                        break;
                                    default:
                                        alterar = true;
                                        console.log('\n\tOpcao incorreta. Tente novamente.');
                                        break;
                                }
                            } while (alterar);
                            nao_encontrou = false;
                            break;
                        }
                    }
                    if (nao_encontrou) {
                        console.log('\n\tLivro nao encontrado!\n');
                    }

                    do {
                        continuar = readline.question('\nDeseja alterar outro cadastro? <sim / nao> : ');
                        continuar = continuar.toLowerCase();
                        if (continuar == 'sim') {
                            loop = true;
                        } else if (continuar == 'nao') {
                            loop = false;
                        } else {
                            console.log('\n\tResposta invalida!');
                        }
                    } while (continuar != 'sim' && continuar != 'nao');
        }

 }


 remover() {
    //variáveis locais
    let posicao;
    let nao_encontrou = true;
    let remover;
    let loop = true;
    let continuar;

    while(loop) {
        nao_encontrou = true;
        loop = true;
        console.clear();
        console.log("\n__________REMOVENDO CADASTRO DE LIVRO__________\n");
        let isbnBusca = readline.question('\nDigite o ISBN do livro (apenas numeros): ');
        for (const livro of this.acervo) {
            if (livro.isbn === isbnBusca) {
                posicao = this.acervo.indexOf(livro);
                nao_encontrou = false;
                console.log('\n\tLivro encontrado:\n');
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
                    remover = readline.question('\nDeseja remover o livro? <sim / nao> : ');
                    remover = remover.toLowerCase();
                    if (remover == 'sim') {
                        this.acervo.splice(posicao, 1);
                        console.log('\n\tRemocao concluida!\n');
                    } else if (remover == 'nao') {
                        console.log('\n\tRemocao cancelada!');
                    } else {
                        console.log('\n\tResposta invalida! Tente novamente.');
                    }
                } while (remover !== 'sim' && remover !== 'nao');
            }
        }
        if (nao_encontrou) {
            console.log('\n\tLivro nao encontrado!\n');
        }
   
        //condição para continuar ou não removendo livros
        do {
           continuar = readline.question('\nDeseja realizar uma nova remocao? <sim / nao> : ');
           continuar = continuar.toLowerCase();
           if (continuar == 'sim') {
               loop = true;
           } else if (continuar == 'nao') {
               loop = false;
             } else {
               console.log('\n\tResposta invalida!');
               }
       } while (continuar != 'sim' && continuar != 'nao');

    }
     
 }

 
 sair() {
    console.log("\nFechando sistema de catálogo...");
    loop = false;
 }


}


//exportando a classe banco
export {banco}