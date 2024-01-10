document.addEventListener("DOMContentLoaded", function () {
    //load expenses from local storage
    loadExpenses();
});

function addExpense() {
    //input
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    //validate input
    if (amount.trim() === "" || description.trim() === "" || category.trim() === "") {
        alert("Please fill in all fields");
        return;
    }

    //expense object
    const expense = {
        amount: amount,
        description: description,
        category: category
    };

    //get existing expenses from local storage
    const expenses = getExpenses();

    //add new expense to the list
    expenses.push(expense);

    //save expenses to local storage
    saveExpenses(expenses);

    //clear input fields
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";

    //refresh expense list
    loadExpenses();
}

function loadExpenses() {
    //get existing expenses from local storage
    const expenses = getExpenses();

    //display expenses on the page
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${expense.amount} - ${expense.description} (${expense.category})</span>
            <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
            <button class="btn btn-primary btn-sm" onclick="editExpense(${index})">Edit</button>
        `;
        expenseList.appendChild(li);
    });
}

function deleteExpense(index) {
    //get existing expenses from local storage
    const expenses = getExpenses();

    //remove the expense at the specified index
    expenses.splice(index, 1);

    //save updated expenses to local storage
    saveExpenses(expenses);

    //refresh expense list
    loadExpenses();
}

function editExpense(index) {
    //get existing expenses from local storage
    const expenses = getExpenses();

    //get the expense at the specified index
    const expenseToEdit = expenses[index];

    //populate input fields with the existing values
    document.getElementById("amount").value = expenseToEdit.amount;
    document.getElementById("description").value = expenseToEdit.description;
    document.getElementById("category").value = expenseToEdit.category;

    //delete the expense at the specified index
    deleteExpense(index);
}

function getExpenses() {
    //get existing expenses from local storage
    const expensesString = localStorage.getItem("expenses");
    return expensesString ? JSON.parse(expensesString) : [];
}

function saveExpenses(expenses) {
    //save expenses to local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));
}