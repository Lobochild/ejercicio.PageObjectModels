import TodoPage from '../pageObjects/TodoPage';

describe('Gestión de tareas con POM', () => {
  beforeEach(() => {
    TodoPage.visit(); // Navega a la página antes de cada prueba
  });

  // Ejercicio 1: Crear una tarea
  it('Debe permitir crear una tarea', () => {
    TodoPage.addTodo('Mi primera tarea'); // Añade una tarea
    TodoPage.verifyTodoCount(1); // Verifica que hay 1 tarea
  });

  // Ejercicio 2: Marcar una tarea como completada
  it('Debe permitir marcar una tarea como completada', () => {
    TodoPage.addTodo('Tarea completada'); // Añade una tarea
    TodoPage.markAsCompleted(0); // Marca la primera tarea como completada
    cy.get(TodoPage.todoListItems).eq(0).should('have.class', 'completed'); // Verifica que tiene la clase 'completed'
  });

  // Ejercicio 3: Desmarcar una tarea completada
  it('Debe permitir desmarcar una tarea completada', () => {
    TodoPage.addTodo('Tarea desmarcada'); // Añade una tarea
    TodoPage.markAsCompleted(0); // Marca como completada
    TodoPage.markAsCompleted(0); // Desmarca la tarea
    cy.get(TodoPage.todoListItems).eq(0).should('not.have.class', 'completed'); // Verifica que no tiene la clase 'completed'
  });

  // Ejercicio 4: Editar una tarea
  it('Debe permitir editar una tarea', () => {
    TodoPage.addTodo('Tarea para editar'); // Añade una tarea

    // Doble clic en el label para activar la edición
    cy.get('[data-testid="todo-item-label"]').contains('Tarea para editar').dblclick();

    // Asegura que el input generado esté visible después del doble clic
    cy.get('.todo-list li input[type="text"]') // Selecciona el campo de entrada generado
      .should('be.visible') // Verifica que el campo de entrada es visible
      .clear() // Limpia el contenido actual
      .type('Tarea editada{enter}'); // Escribe el nuevo texto y presiona Enter

    // Verifica que el texto actualizado está en la lista de tareas
    cy.get('[data-testid="todo-item-label"]').should('contain.text', 'Tarea editada');
  });

  // Ejercicio 5: Borrar una tarea
  it('Debe permitir borrar una tarea', () => {
    TodoPage.addTodo('Tarea para borrar'); // Añade una tarea
    TodoPage.deleteTodo(0); // Borra la primera tarea
    TodoPage.verifyTodoCount(0); // Verifica que no hay tareas
  });

  // Ejercicio 6: Filtrar tareas
  it('Debe permitir filtrar tareas por estado', () => {
    TodoPage.addTodo('Tarea activa'); // Añade una tarea activa
    TodoPage.addTodo('Tarea completada'); // Añade una tarea completada
    TodoPage.markAsCompleted(1); // Marca la segunda tarea como completada

    // Filtrar completadas
    TodoPage.filterTodos('completed');
    TodoPage.verifyTodoCount(1); // Verifica que hay 1 tarea
    cy.get(TodoPage.todoListItems).eq(0).should('contain.text', 'Tarea completada'); // Verifica el contenido

    // Filtrar activas
    TodoPage.filterTodos('active');
    TodoPage.verifyTodoCount(1); // Verifica que hay 1 tarea
    cy.get(TodoPage.todoListItems).eq(0).should('contain.text', 'Tarea activa'); // Verifica el contenido

    // Mostrar todas
    TodoPage.filterTodos('all');
    TodoPage.verifyTodoCount(2); // Verifica que hay 2 tareas
  });
});

