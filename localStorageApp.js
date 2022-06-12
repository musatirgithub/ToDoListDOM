const myInput = document.getElementById('todo');
const addSign = document.querySelector('.add-task');
const tasks = document.querySelector('.tasks');

let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function taskLoader(){
    todoList.forEach((todo) =>{
        let {id, content, isDone} = todo;
        tasks.innerHTML += `
        <div class="task" id=${id} isDone=${isDone}>
            <div class="left">
                <i class="fa-regular fa-square check"></i>
                <p>${content}</p>
            </div>
                <i class="fa-solid fa-trash-can"></i>
        </div>
        `
    }
    )
    taskCounter();
}

window.addEventListener('load', taskLoader);

function taskAdder(){
    if (myInput.value != ''){
        const todoObject = {
            'id':  new Date().getTime(),
            'content' : myInput.value,
            'isDone': false
        }

        tasks.innerHTML += `
        <div class="task" id=${todoObject.id} isDone=${todoObject.isDone}>
            <div class="left">
                <i class="fa-regular fa-square check"></i>
                <p>${myInput.value}</p>
            </div>
            <i class="fa-solid fa-trash-can"></i>
        </div>
        `

        todoList.push(todoObject);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        taskCounter();
        myInput.value = '';
    }else{
        alert(`Task can't be empty!`);
    }
}

myInput.addEventListener('keydown', (event) =>{
    if (event.key == "Enter"){
        taskAdder();
    }
});
addSign.addEventListener('click', taskAdder);

tasks.addEventListener('click', (event)=>{
    if (event.target.classList.contains('fa-square')){
        event.target.parentElement.classList.add('strikethrough');
        event.target.className = 'fa-solid fa-x check';
        event.target.parentElement.parentElement.isDone = true;

        todoList.forEach((a) => {
            if (a.id == event.target.parentElement.parentElement.id){
                a.isDone = true;
                localStorage.setItem('todoList', JSON.stringify(todoList));
            }
        })
        taskCounter();
    } else if (event.target.classList.contains('fa-x')){
        event.target.parentElement.classList.remove('strikethrough');
        event.target.className = 'fa-regular fa-square check';
        todoList.forEach((a) => {
            if (a.id == event.target.parentElement.parentElement.id){
                a.isDone = false;
                localStorage.setItem('todoList', JSON.stringify(todoList));
            }
        })
        taskCounter();
    } else if (event.target.classList.contains('fa-trash-can')){
        if (event.target.previousElementSibling.firstElementChild.classList.contains('fa-x')){
            event.target.parentElement.remove();
            todoList = todoList.filter((a) => a.id != event.target.parentElement.id);
            localStorage.setItem('todoList', JSON.stringify(todoList));
        } else {
            alert("Please complete the task!")
        }
    }
    taskCounter();
})

function taskCounter(){
    const totalTasks = JSON.parse(localStorage.getItem('todoList')).length;
    const completedTasks = JSON.parse(localStorage.getItem('todoList')).filter((a) => a.isDone == true).length;
    document.querySelector('.stats p').innerText = `${completedTasks} OUT OF ${totalTasks} TASKS COMPLETED`;
}