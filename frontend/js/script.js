const tbody = document.querySelector('tbody')
const addForm = document.querySelector('.add-form')
const inputTask = document.querySelector('.input-task')


const fetchTasks = async () => {
    // coloco o endereço da busca criada no back - end
    const response = await fetch('http://localhost:3333/tasks');
    // converte a resposta da busca para o formato JSON
    const tasks = await response.json();

    return tasks;


}

const addTask = async (event) => {
    event.preventDefault();

    const tasks = { title: inputTask.value }
    await fetch('http://localhost:3333/tasks', {
        method: 'post', //define o metodo de requisição
        headers: { 'Content-Type': 'application/json' }, // definito o tipo de dados da requisição
        body: JSON.stringify(tasks), // converte os OBJ JSON em uma STRING
    });

    loadTaks();
    inputTask.value = '';
}

const deleteTasks = async (id) => {
alert('DELETE task: ' + id);
await fetch(`http://localhost:3333/tasks/${id}`,{
    method:'delete'
})
loadTaks();
}

const updateTasks = async ({ id, title, status }) => {

    await fetch(`http://localhost:3333/tasks/${id}`,{
        method:'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({title, status})
    })
    loadTaks();
    
}

const formatDate = (dateUTC) =>{
    const option = { dateStyle: 'long', timeStyle:'short'}
    const date = new Date(dateUTC).toLocaleString('pt-br',option)

    return date
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag)

    if (innerText) {
        element.innerText = innerText;
    }

    if (innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
}

const creatSelect = (value) => {
    const options = `
                            <option value="pendente">Pendente</option>
                            <option value="em andamento">em andamento</option>
                            <option value="concluida">Concluida</option>
                            `;

    const select = createElement('select', '', options)
    select.value = value;
    return select
}

const createRow = (task) => {
    const { id, title, created_at, status } = task

    const tr = createElement('tr')
    const tdTitle = createElement('td', title);
    const tdData = createElement('td', formatDate(created_at))
    const tdStatus = createElement('td')
    const tdActions = createElement('td')
    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>')
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>')

    deleteButton.addEventListener('click',()=> deleteTasks(id))

    const select = creatSelect(status)
    select.addEventListener('change',({target})=>updateTasks({ id, title, created_at, status:target.value}));

    //adiciona uma classe no elemento
    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    const editForm = createElement('form')
    const editInput = createElement('input')
   

    editInput.value = title
    editForm.appendChild(editInput)

        editForm.addEventListener('submit',(event)=>{
            event.preventDefault();
            updateTasks({id,title:editInput.value, status});
        })

    editButton.addEventListener('click',()=>{
        tdTitle.innerText = ''
        tdTitle.appendChild(editForm)
    })

    tdStatus.appendChild(select)

    tdActions.appendChild(editButton)
    tdActions.appendChild(deleteButton)

    tr.appendChild(tdTitle)
    tr.appendChild(tdData)
    tr.appendChild(tdStatus)
    tr.appendChild(tdActions)

    return tr
}


const loadTaks = async () => {
    const task = await fetchTasks();

    tbody.innerHTML = ''

    task.forEach(task => {
        const tr = createRow(task);
        tbody.appendChild(tr)

    });
}

addForm.addEventListener('submit', addTask)

loadTaks()