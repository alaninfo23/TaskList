/* Essas variaveis recebem valores das classes */
const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');

/* Seleciona a classe task-container p/ adicionar parágrafo e icone de deletar */
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

    /* Essa função adiciona uma classe para a DIV que foi criada acima*/
    taskItemContainer.classList.add('task-item');

    /* Essa função cria um parágrafo onde vai aparecer o conteúdo do input  */
    const taskContent = document.createElement('p');

    /* Essa função insere o valor do input no parágrafo que foi criado com a função anterior */
    taskContent.innerText = inputElement.value;

    /* Essa função espera um clique no taskContent(tarefa) para executar a função Handle Click */
    taskContent.addEventListener('click', () => handleClick(taskContent));

    /* Essa variavel recebe o elemento do icone de deletar */
    const deleteItem = document.createElement('i');
    /* E ai a variavel recebe duas classes referente ao icone e atribui a variavel que foi criada acima. */
    /* As informações desse icone estão lá no arquivo CSS */
    deleteItem.classList.add('far');
    deleteItem.classList.add('fa-trash-alt');

    /* Essa função espera um clique no deleteItem(botão deletar) para executar a função handleDeleteClick */
    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    /* Essas 2 funções adicionam a classe task-item e o paragrafo P que foram criados
    acima dentro da DIV taskItemContainer. */
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    /* Essa função adiciona a div taskItemContainer no tasksContainer   */
    tasksContainer.appendChild(taskItemContainer);
    /* Essa função apenas insere um valor vazio no input para limpar o campo após clicar em adicionar */
    inputElement.value = '';
    
    updateLocalStorage();
};

/* Essa função percorre os elementos do taskitem até achar o correspondente
ao taskContent, em seguida ele mudará o nome da classe*/
const handleClick = (taskContent) => {
    /* Essa função pega todos os filhos do taskitem */
    const tasks = tasksContainer.childNodes;
    /* Verificar se o item atual do loop é o mesmo que está sendo clicado, se for ele muda nome da classe para completed. */
    for (const task of tasks) {
      const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
  
      if (currentTaskIsBeingClicked) {
        task.firstChild.classList.toggle("completed");
      }
    }
  /* Executando função que armazena as alterações feitas no LocalStorage */
    updateLocalStorage();
  };

/* Essa função faz a mesma coisa da função acima só que ao invés de mudar nome da classe ele remove o Taskitem */
const handleDeleteClick = (taskItemContainer, taskContent) => {
  /* Essa função pega todos os filhos do taskitem */
    const tasks = tasksContainer.childNodes;
    for (const task of tasks) {
      /* Verificar se o item atual do loop é o mesmo que está sendo clicado, se for ele deleta o item. */
      const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
  
      if (currentTaskIsBeingClicked) {
        taskItemContainer.remove();
      }
    }
  /* Executando função que armazena as alterações feitas no LocalStorage */
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
/* Função que armazena dados no localStorage */
const updateLocalStorage = () => {
    /* Variavel que armazena os itens da lista */
    const tasks = tasksContainer.childNodes;
    /* criamos um map com todos os itens armazenados no tasks  */
    /* e para cada task ele vai executar a função abaixo */
    const localStorageTasks = [... tasks].map(task => {
        /* armazena o primeiro item na variavel content */
        const content = task.firstChild;
        /* verifica se nesse primeiro item q foi armazenado no content contem o completed */
        const isCompleted = content.classList.contains('completed');

        return { description: content.innerText, isCompleted };
        taskContent.addEventListener('click', () => handleClick(taskContent));
    });
    /* Função que armazena o item no localStorage */
    /* Essa função JSON.stringify como o nome diz converter Json para String */
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

/* Essa função pega os dados salvos no localStorage e coloca na tela */
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
    }
};
/* Função que chama */
refreshTasksUsingLocalStorage();

/* Essa função espera um clique para executar a função Handle Click */
addTaskButton.addEventListener('click', () => handleAddTask());
/* Chama a função handleInputCHange caso o input for válido, essa função removerá a classe error */
inputElement.addEventListener('change', () => handleInputChange());