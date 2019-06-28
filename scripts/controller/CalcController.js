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

        this.setLastNumberToDisplay();
    }

    addEventListenerAll(element, events, fn){//função para rodar cada evento por vez - click e drag
        //split separa as duas palavras pelo espaço(ou ponto, virgula) e tranforma em um array
        events.split(',').forEach(event=>{
            element.addEventListener(event, fn,false);//false é pra não contar como duas vezes qdo clicar
        });

        
    }

    clearAll(){
        this._operation = [];

        this.setLastNumberToDisplay();
    }
    clearEntry(){
        this._operation.pop();//retira o ultimo valor que tinha sido inserido no array

        this.setLastNumberToDisplay();
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1];
     // console.log("-->",this._operation[this._operation.length - 1]);
      
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

    pushOperation(value){//metodo para verificar se é um trio (numero + operador + numero)

        this._operation.push(value);

        if(this._operation.length > 3){

            this.calc(); //função responsavel pelo calculo do n+o+n
            
        }

    }

    calc(){

        let last = this._operation.pop();//retira o ultimo elemento do array, deixando (numero + operador + numero)
        
        let result = eval(this._operation.join(""));

        if(last == '%'){//o ultimo é o simbolo de porcentagem

            result = result / 1000;

            this._operation = [result];

        }else{

            this._operation = [result, last];//cria um novo array, insere o n+o+n+last
        }
   

        this.setLastNumberToDisplay();//metodo para mostrar no display o ultimo numero
    }

    setLastNumberToDisplay(){

        let lastNumber;

        for(let i = this._operation.length - 1; i >= 0; i--){
            if(!this.isOperator(this._operation[i])){//se não for um operador, ou seja se for numero
                lastNumber = this._operation[i];
                break;
            }
        }

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    addOperation(value){//add a operação no array [ONDE ESTA A LOGICA]

        //console.log('A',value,(this.getLastOperation()));

        if(isNaN(this.getLastOperation())){//Se o ultimo valor inserido no array não for um numero...
            //se for string
            
            if(this.isOperator(value)){
                //trocar o operador
                
                this.setLastOperation(value);//chama a função que troca o operador anterior pelo ultimo que foi apertado
                
            }else if(isNaN(value)){
                
                console.log('outra coisa',value);
            }else{
                this.pushOperation(value);
                this.setLastNumberToDisplay();//metodo para mostrar no display o ultimo numero
            }
        }else{

            if(this.isOperator(value)){//meu valor de agora é um operador? +-*/

                this.pushOperation(value);//add no array

            }else{
                            //se for numero, tem que concatenar
                let newValue = this.getLastOperation().toString() + value.toString();
                this._setLastOperation(parseInt(newValue));//add o operador no array operation
                //atualizar display

                this.setLastNumberToDisplay();//metodo para mostrar no display o ultimo numero
            }
        }
       
        
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
       
     /*  this.addEventListenerAll(btn,'mouseover,mouseup,mousedown', e=>{//drag é quando clica e arrasta
       btn.style.cursor = "pointer";
        }); */
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