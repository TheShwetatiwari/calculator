const resultElement=document.getElementById('result');

const clearBtn=document.getElementById('clear-button');
const deleteBtn=document.getElementById('detete-button');
const divideBtn=document.getElementById('divide-button');
const multiplyBtn=document.getElementById('multiply-button');
const subtractBtn=document.getElementById('subtraction-button');
const addBtn=document.getElementById('add-button');
const decimalBtn=document.getElementById('decimal-button');
const equalBtn=document.getElementById('equal-button');
const numberBtns=document.querySelectorAll('.number');

//initialised the variables
let result='';
let operation='';
let previousOperand=0;

//function to append number
const appendNumber=(number)=>{
  if(number==='.' && result.includes('.')){
    return;
  }
  result+=number;
  updateDisplay();
}
//function to update display
const updateDisplay=()=>{
  if(operation){
    resultElement.innerText=`${previousOperand} ${operation} ${result}`;
  }
  else{
    resultElement.innerText=result;
  }
}

//function to select operator
const selectOperator=(operatorValue)=>{
  if(result==='') return;
  if(operation!==''&& previousOperand!==''){
    calculateResult();
  }

  operation=operatorValue;
  previousOperand=result;
  result='';
  updateDisplay();
}
//function to calculate result
 const calculateResult=()=>{
  let evaluatedResult;
  const prev=parseFloat(previousOperand);
  const current=parseFloat(result);
  if(isNaN(prev)||isNaN(current)) return;
  switch(operation){
    case '+':
      evaluatedResult=prev +current;
      break;
      case '-':
        evaluatedResult=prev -current;
        break;
        case '*':
          evaluatedResult=prev *current;
          break;
          case '/':
            evaluatedResult=prev / current;
            break;
      default:
        return;
  }
  result=evaluatedResult.toString();
   operation='';
   previousOperand='';


 }
 //function to clear display
 const clearDisplay=()=>{
  result='';
  previousOperand='';
  operation='';
  updateDisplay();
 }
 //function delete last digit
 const deleteLastDigit=()=>{
 if(result==='') return;
 result=result.slice(0,-1);
 updateDisplay();
 }

//add event listener to number buttons
numberBtns.forEach(button=>{
    button.addEventListener('click',()=>{
      appendNumber(button.innerText);
    });
});
decimalBtn.addEventListener('click',()=>appendNumber('.'));
addBtn.addEventListener('click',()=>selectOperator('+'));
subtractBtn.addEventListener('click',()=>selectOperator('-'));
multiplyBtn.addEventListener('click',()=>selectOperator('*'));
divideBtn.addEventListener('click',()=>selectOperator('/'));
equalBtn.addEventListener('click',()=>{
  if(result==='') return; 
  calculateResult();
updateDisplay();
});
clearBtn.addEventListener('click',clearDisplay);

deleteBtn.addEventListener('click',deleteLastDigit);