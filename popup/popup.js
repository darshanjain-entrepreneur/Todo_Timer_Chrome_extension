
let taskArray = [];


const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', addTask);

chrome.storage.sync.get(["taskArray"] , (res) => {
    taskArray = res.taskArray ? res.taskArray: [];
    renderTasks();
})

function saveTasks(){
    chrome.storage.sync.set({
        taskArray,
    })
}

function renderTask(taskNum){


    const taskRow = document.createElement('div');

const text = document.createElement('input');

text.type = "text";
text.placeholder = "Enter Your Todo";
text.value =taskArray[taskNum];

text.addEventListener("change", () => {
    taskArray[taskNum] = text.value;
    saveTasks()
    console.log(taskArray);
})

const deleteBtn  = document.createElement('input');

deleteBtn.type = "button";
deleteBtn.value = "X";

deleteBtn.addEventListener("click", () =>{
deleteTask(taskNum)
saveTasks()
})

taskRow.appendChild(text);
taskRow.appendChild(deleteBtn);

const taskcontainer = document.getElementById("task-container");
taskcontainer.appendChild(taskRow);
}





function addTask(){

    const taskNum = taskArray.length;
taskArray.push("");
renderTask(taskNum);
saveTasks();


}

function deleteTask(taskNum){
taskArray.splice(taskNum, 1);
renderTasks(taskNum);

}

function renderTasks(taskNum){
const taskcontainer = document.getElementById("task-container");
taskcontainer.textContent = "";
taskArray.forEach((taskText , taskNum) => {

    renderTask(taskNum);

})


}