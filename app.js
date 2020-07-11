//Selectors
const amtBudget = document.getElementById('amt-budget');
const myBudget = document.getElementById('my-budget');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const listExpenses = document.getElementsByClassName('list-expenses');
const expenseButton = document.getElementById('expense-button');
const listItems = document.getElementById('list-items');
const li = document.getElementById('add');
const ul = document.getElementById('list-items')
const addSpan = document.getElementById('add-span');
var amtLeft = document.getElementById('amt-left');
const myForm = document.forms.my;
const errorMsg = document.getElementById('warning');
const saveItems = document.getElementById('save-items');
const clearBtn = document.getElementById('clear-btn')

//Event Listeners
myBudget.addEventListener("blur",getAmount);
expenseButton.addEventListener('click', addExpenseItem);
saveItems.addEventListener('click',saveToLocalStorage);
clearBtn.addEventListener('click', clearLocalStorage)



let expenses;
    if (localStorage.getItem('expenses')){
        ul.innerHTML = JSON.parse(localStorage.getItem('expenses'));
        amtBudget.innerHTML = JSON.parse(localStorage.getItem('budget'));
        amtLeft.innerHTML = JSON.parse(localStorage.getItem('left'));
    } else {
        expenses = [];
        let budgetArray = [];
        let leftArray = [];
    }

function saveToLocalStorage(event) {
    event.preventDefault()
    
    let expensesArray = [];
    let budgetArray = [];
    let leftArray = [];
    expensesArray.push(listItems.innerHTML);
    budgetArray.push(amtBudget.textContent);
    leftArray.push(amtLeft.textContent)
    localStorage.setItem('expenses',JSON.stringify(expensesArray))
    localStorage.setItem('budget',JSON.stringify(budgetArray))
    localStorage.setItem('left',JSON.stringify(leftArray))
}


function clearLocalStorage(event) {
    event.preventDefault();

    localStorage.removeItem('expenses');
    localStorage.removeItem('budget');
    localStorage.removeItem('left');

    addSpan.innerHTML = ''
    amtBudget.innerHTML = "Budget:"
    amtLeft.innerHTML = "Left:"
}


// Arrays
const expenseAmountArray = [];


//Functions
function getAmount(event) {
        if (myBudget.value === 0 || myBudget.value === ''){
            alert("Please enter a valid amount")
        }
        amtBudget.textContent = "Budget:" + "$" + myBudget.value;
        amtLeft.textContent = "Left:" + "$" + myBudget.value;
        amtLeft.value = myBudget.value;
        myBudget.textContent = '';
}


function addExpenseItem(event){ 
  event.preventDefault()
    if(myForm.elements.expense.value === "" && myForm.elements.amount.value === ""){
        expenseButton.setAttribute('disabled', true)
        expenseAmount.style.border = 'thin solid red';
        expenseName.style.border = 'thin solid red';
        myBudget.style.border = 'thin solid red'
        errorMsg.style.display = 'inline'
    } else {
        expenseButton.removeAttribute('disabled');
        expenseAmount.style.border = 'thin solid green';
        expenseName.style.border = 'thin solid green';
        myBudget.style.border = 'thin solid green'
    }

    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    newSpan.classList.add('amount')
    
    const newExpenseName = expenseName.value;
    const newExpenseAmount = Number(expenseAmount.value);

    newSpan.append(newExpenseAmount);
    listItems.appendChild(newLi).append(newExpenseName,newSpan);
    expenseAmountArray.push(newExpenseAmount);
   
    
        // Getting sum of expenses
        var sum = expenseAmountArray.reduce(function(a, b){
            return a + b;
        }, 0);
        
        // Calculating Amount Left
        const remainingAmount = myBudget.value - sum;
        amtLeft.textContent = "Left:" + "$" + remainingAmount;

    expenseAmount.value = '';
    expenseName.value = '';
}
      