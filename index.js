const taskList = [];
const addTask = document.querySelector('.add-task');
const tasks = document.querySelector('.tasks');
const input = document.querySelector('.input-group input');
const todo = document.getElementById('todo');
const checks = document.querySelectorAll('.tasks input')
// this part of code is for adding new tasks
addTask.addEventListener('click', taskAdder);
todo.addEventListener('keydown', (event)=>{
    if (event.key == 'Enter'){
        taskAdder();
    }
})

function taskAdder(){
    tasks.innerHTML += `<div class="task"><div class="left"><i class="fa-regular fa-square check"></i><p>${todo.value}</p></div><i class="fa-solid fa-trash-can"></i></div>`
    todo.value = '';
    returnStats();
}

// this part of code is for returning feedback about the number of completed tasks
tasks.addEventListener('click', (event) =>{
   if (event.target.classList.contains('check')){
       event.target.parentElement.classList.toggle('strikethrough');
       
   } else if (event.target.classList.contains('fa-trash-can')){
    event.target.parentElement.remove();
   }
   returnStats();
});

function returnStats(){
    let completed = 0;
    let rest = 0;
    document.querySelectorAll('.check').forEach((a)=>{
     if (a.parentElement.classList.contains('strikethrough')) {
         completed++;
     } else {
         rest++;
     }
 })
 document.querySelector('.stats p').innerText = `${completed} OUT OF ${completed+rest} TASKS COMPLETED`;
}