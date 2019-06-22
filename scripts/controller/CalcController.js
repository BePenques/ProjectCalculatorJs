class CalcController{

    constructor(){
        //quando tem underline na frente do atributo ele é PRIVADO(encapsulamento)
                
        this.operation = [];
        this._locale = "pt-BR";        
        this._displayCalcEL = document.querySelector("#display");//criou um vinculo - amarrou o elemento com a variavel
        this._dateEL = document.querySelector("#data");
        this._timeEL = document.querySelector("#hora");
        this.currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){

        this.setDisplayDateTime();

        //função executada num intervalo de tempo
        setInterval(()=>{//arrow function
            this.setDisplayDateTime();
        }, 1000);//atualiza a cada 1 segundo - 1000 milisegundos

      /*  setTimeout(()=>{
            clearInterval(interval);
        }, 10000); */

       /* this._dateEL.innerHTML = "18/05/1995";
        this._timeEL.innerHTML = "18:00"; */
    }

    addEventListenerAll(element, events, fn){//função para rodar cada evento por vez - clique e drag
        //split separa as duas palavras pelo espaço(ou ponto, virgula) e tranforma em um array
        events.split(',').forEach(event=>{
            element.addEventListener(event, fn,false);//false é pra não contar como duas vezes qdo clicar
        });

        
    }

    clearAll(){
        this._operation = [];
    }
    clearEntry(){
        this._operation.pop();//retira o ultimo valor que tinha sido inserido no array
    }

    getLastOperation(){
      //  return this._operation[this._operation.length - 1];
      console.log("-->",this._operation[this._operation.length - 1]);
      
        //retorna a ultima operação(sendo numero ou operador)
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(){
       return (['+','-','*','%','/'].indexOf(value) > -1);
        /*procura o value dentro do array
        se encontrar traz o index, senhão -1*/
        

    }
    addOperation(value){//add o operador no array

        if(isNaN(this.getLastOperation())){//Se o ultimo valor inserido no array não for um numero...
            //se for string
            
            if(this.isOperator(value)){
                //trocar o operador
                
                this._setLastOperation(value);//chama a função que troca o operador anterior pelo ultimo que foi apertado
                
            }else if(isNaN(value)){
                //outra coisa
                console.log(value);
            }else{
                this._operation.push(value);
            }
        }else{
            //se for numero, tem que concatenar
           let newValue = this.getLastOperation().toString() + value.toString();
           this._setLastOperation(parseInt(newValue));//add o operador no array operation
        }
       
        //push add no final do array
        console.log(this._operation);
    }

    setError(){
        this.displayCalc = "ERROR";
    }

    execbtn(value){

        switch(value){

            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                
                break;
            case 'igual':
                this.addOperation('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }

    }

    initButtonsEvents(){
        //querySelectorAll - pega todos os elementos #buttons e #parts iniciados pela tag "g"
       let buttons = document.querySelectorAll("#buttons > g, #parts > g");

       buttons.forEach((btn, index)=>{ //para cada botão que vc encontrar...
       /* btn.addEventListener('click', e=>{//defina um evento ao ser clicado
            console.log(btn.className.baseVal.replace("btn-",""));
        }); */
        this.addEventListenerAll(btn,'click,drag', e=>{//drag é quando clica e arrasta
            let textBtn = btn.className.baseVal.replace("btn-","");

            this.execbtn(textBtn);
       });
       
       this.addEventListenerAll(btn,'mouseover,mouseup,mousedown', e=>{//drag é quando clica e arrasta
       btn.style.cursor = "pointer";
        });
     });
 
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
   
    }


    get displayTime(){
        //innerHTML é uma propriedade que toda vez que trabalham manipulando o DOM tem acesso a ela
        //ela significa: pega esse objeto que estou falando, coloque uma informação la dentro no formato html
        
        return this._timeEL.innerHTML;
    }

    set displayTime(value){
        return this._timeEL.innerHTML = value;
    }

    get displayDate(){
        return this._dateEL.innerHTML;
    }

    set displayDate(value){
        return this._dateEL.innerHTML = value;
    }

    get displayCalc(){//pega o valor
        return this._displayCalcEL.innerHTML;
    }

    set displayCalc(value){//coloca um novo valor
        return this._displayCalcEL.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }
    set dataAtual(value){
        this._dataAtual = value;
    }

}