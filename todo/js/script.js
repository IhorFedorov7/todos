let addTodo = document.querySelector('.message'),
    addBtn = document.querySelector('.add'),
    todo = document.querySelector('.todo'),
    todoList = [];

    if(localStorage.getItem('todo')){
        todoList = JSON.parse(localStorage.getItem('todo'));
        displayMessages();
    }

    addBtn.addEventListener('click', () => {
        if(!addTodo.value) return;

        let newTodo = {
            todo: addTodo.value,
            checked: false,
            important: false
        };

        todoList.push(newTodo);
        displayMessages();
        localStorage.setItem('todo', JSON.stringify(todoList));
        addTodo.value = '';
    });

    function displayMessages() {
        let display = '';
        if(todoList.length === 0) todo.innerHTML = '';
        todoList.forEach((item, i) => {
            display += `
            <li>
                <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : '' }>
                <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
            </li>
            `
            todo.innerHTML = display;
        })
    }

    todo.addEventListener('change', (e) => {
        let idInput = e.target.getAttribute('id'),
            forLabel = todo.querySelector(`[for='${idInput}']`),
            valueLabel = forLabel.innerHTML;
        
            todoList.forEach((item) => {
                if (item.todo === valueLabel){
                    item.checked = !item.checked;
                    localStorage.setItem('todo', JSON.stringify(todoList));
                }
            })
    })

    todo.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        todoList.forEach((item, i) => {
            if(item.todo === e.target.innerHTML){
                if(e.ctrlKey || e.metaKey) {
                    todoList.splice(i, 1);
                }else{
                    item.important = !item.important;
                }
                displayMessages();
                localStorage.setItem('todo', JSON.stringify(todoList));
            }
        })
    })

