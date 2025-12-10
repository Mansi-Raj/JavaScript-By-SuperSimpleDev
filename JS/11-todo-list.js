const todoList = [{
  task: '',
  dueDate: ''
}];

renderTodoList();

function renderTodoList(){
  let todoListHTML = '';

  //12
  todoList.forEach((todoObject, idx)=>{    
    const { task, dueDate } = todoObject;
    if(task.trim() !== ''){
      const html = `
        <div class="div-css">${task}</div>
        <div class="div-css">${dueDate}</div>
        <button class="task-delete-button js-task-delete-button">
        Delete</button>`;
        todoListHTML+=html;
    }
  });
  /*11
  for(let i=0; i<todoList.length;i++){
    const {task} = todoList[i];
    const {dueDate} = todoList[i];
    if(task.trim() !== ''){
      const html = `
        <div class="div-css">${task}</div>
        <div class="div-css">${dueDate}</div>
        <div><button class="task-delete-button" onclick="
          todoList.splice(${i}, 1);
          renderTodoList();
        ">
        Delete</button></div>`;

        todoListHTML+=html;
    }
  }*/



  document.querySelector('.js-taskDisplay')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-task-delete-button').forEach((deleteButton, idx) => {
    deleteButton.addEventListener('click', () =>{
      todoList.splice(idx, 1);
      renderTodoList();
    });
  });
}

document.querySelector('.js-add-button').addEventListener('click', ()=>{
  addTodo();
});

function addTodo(){
  const inputElement = document.querySelector('.js-taskInput');
  const task = inputElement.value;
  const dueDateEle = document.querySelector('.js-dueDate');
  const dueDate = dueDateEle.value;

  todoList.push({
    task,
    dueDate
  });
  renderTodoList();
  inputElement.value ='';
}