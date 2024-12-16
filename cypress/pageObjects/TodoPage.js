class TodoPage {
  // Selectores
  newTodoInput = '.new-todo';
  todoListItems = '.todo-list li';
  toggleButton = '.toggle';
  deleteButton = '.destroy';
  filterAll = '[href="#/"]';
  filterActive = '[href="#/active"]';
  filterCompleted = '[href="#/completed"]';
  
  // Métodos
  visit() {
    cy.visit('https://todomvc.com/examples/react/dist/');
  }

  addTodo(todoText) {
    cy.get(this.newTodoInput).type(`${todoText}{enter}`);
  }

  markAsCompleted(index) {
    cy.get(this.todoListItems).eq(index).find(this.toggleButton).click();
  }

  deleteTodo(index) {
    cy.get(this.todoListItems).eq(index).find(this.deleteButton).click({ force: true });
  }

  filterTodos(filterType) {
    if (filterType === 'all') cy.get(this.filterAll).click();
    if (filterType === 'active') cy.get(this.filterActive).click();
    if (filterType === 'completed') cy.get(this.filterCompleted).click();
  }

  verifyTodoCount(count) {
    cy.get(this.todoListItems).should('have.length', count);
  }
}

export default new TodoPage();
