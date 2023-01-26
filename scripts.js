/* Essas variaveis recebem valores das classes */
const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');

const tasksContainer = document.querySelector('.task-container');

/* Função que valida se o valor digitado no input for maior que 0 ele retorna false*/
const validateInput = () => inputElement.value.trim().length > 0;

/* Função que atribui o valor da função acima numa variável e faz a validação, se caso for
válido ele muda o nome da classe para que o css faça a estilização c/ borda vermelha, senão
 */
const handleAddTask = () => {
    const inputIsvalid = validateInput();
    console.log(inputIsvalid)

    if (!inputIsvalid) {
        return inputElement.classList.add('error');
    }

    /* Essa função cria uma elemento DIV no HTML e atribui a variavel taskItemContainer */
    const taskItemContainer = document.createElement('div');
    /* Essa função adiciona uma classe para a DIV que foi criada */
    taskItemContainer.classList.add('task-item');

    /* Essa função cria um parágrafo onde vai aparecer o conteúdo do input  */
    const taskContent = document.createElement('p');
    /* Essa função insere o valor do input no parágrafo que foic riado com a função anterior */
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('far');
    deleteItem.classList.add('fa-trash-alt');

    deleteItem.addEventListener('click', () =>
    handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = '';
    
    updateLocalStorage();
};

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;
  
    for (const task of tasks) {
      const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
  
      if (currentTaskIsBeingClicked) {
        task.firstChild.classList.toggle("completed");
      }
    }
  
    updateLocalStorage();
  };
const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;
    for (const task of tasks) {
      const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
  
      if (currentTaskIsBeingClicked) {
        taskItemContainer.remove();
      }
    }
  
    updateLocalStorage();
  };
/* Valida se o input está válido, se tiver, ele vai remover a classe error
   para sair a cor vermelha do input */
const handleInputChange = () => {
    const inputIsvalid = validateInput();
    if(inputIsvalid) {
        return inputElement.classList.remove('error');
    }
};

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;

    const localStorageTasks = [... tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed');

        return { description: content.innerText, isCompleted };taskContent.addEventListener('click', () => handleClick(taskContent));
    });

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
    
    if(!tasksFromLocalStorage) return;

    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item');

        const taskContent = document.createElement('p');
        taskContent.innerText = task.description;
        
        if(task.isCompleted) {
            taskContent.classList.add('completed');
        }

        taskContent.addEventListener('click', () => handleClick(taskContent));

        const deleteItem = document.createElement('i');
        deleteItem.classList.add('far');
        deleteItem.classList.add('fa-trash-alt');

        deleteItem.addEventListener('click', () => 
        handleDeleteClick(taskItemContainer, taskContent)
        );

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);

        tasksContainer.appendChild(taskItemContainer);
    }/* Função que chama */
};

refreshTasksUsingLocalStorage();

/* Chama a função handleAddTask caso clique no botão adicionar*/
addTaskButton.addEventListener('click', () => handleAddTask());
/* Chama a função handleInputCHange caso o input for válido, essa função removerá a classe error */
inputElement.addEventListener('change', () => handleInputChange());