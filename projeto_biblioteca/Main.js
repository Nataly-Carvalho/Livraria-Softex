//habilitando a biblioteca readline-sync
import readline from "readline-sync";

//importando a classe livro
import {Livro} from "./classeLivro.js"

//importando a classe banco
import {banco} from "./classeAcervo.js"

//variáveis globais
let loop = true;

//criação do objeto bancoAcervo
const bancoAcervo = new banco();

// Livros de exemplo
const livro1 = new Livro("A Economia da Natureza", "Robert E. Ricklefs", "", "2", "Rio de Janeiro: Guanabara Koogan, 2016", "606", "9788527728768", ["Ecologia", "Diversidade biologica", "Ecossistemas", "Comunidades vegetais"]);
const livro2 = new Livro("A Historia da Gastronomia", "Maria Leonor de Macedo Soares Leal", "", "1", "Rio de Janeiro: Senac, 2005", "137", "8585746777", ["Gastronomia", "Culinaria", "Tecnologia de alimentos", "Historia"]);

//adicionando os dois livros supracitados no bancoAcervo
bancoAcervo.acervo.push(livro1);
bancoAcervo.acervo.push(livro2);

//MENU
while(loop) {
    console.clear();
    console.log("\n\n======CATALOGO DE LIVROS======");
    console.log("1 - Listar livros registrados");
    console.log("2 - Cadastrar novo livro");
    console.log("3 - Buscar livro");
    console.log("4 - Alterar livro");
    console.log("5 - Remover livro");
    console.log("0 - Sair do sistema\n");

    let op = readline.question('OP: ');

    switch(op) {
        case "1":
            bancoAcervo.listar();
            break;
        
        case "2":
            bancoAcervo.cadastrar();
            break;
        
            case "3":
                bancoAcervo.buscar();
                break;
            
            case "4":
                bancoAcervo.alterar();
                break;
            
            case "5":
                bancoAcervo.remover();
                break;
            
            case "0":
                console.log("\nFechando sistema de catálogo...");
                loop = false;
                break;
            
            default:
                console.log('\nOpcao invalida!\n');
                break;
    }
}