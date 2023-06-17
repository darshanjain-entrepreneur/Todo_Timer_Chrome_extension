
const taskArray = [];


const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', addTask);


function renderTask(taskNum){


    const taskRow = document.createElement('div');

const text = document.createElement('input');

text.type = "text";
text.placeholder = "Enter Your Todo";
text.value =taskArray[taskNum];

text.addEventListener("change", () => {
    taskArray[taskNum -1] = text.value;
    console.log(taskArray);
})

const deleteBtn  = document.createElement('input');

deleteBtn.type = "button";
deleteBtn.value = "X";

deleteBtn.addEventListener("click", () =>{
deleteTask(taskNum)

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



}

function deleteTask(taskNum){
taskArray.splice(taskNum, 1);
renderTasks();

}

function renderTasks(taskNum){
const taskcontainer = document.getElementById("task-container");
taskcontainer.textContent = "";
taskArray.forEach((taskText , taskNum) => {

    renderTask(taskNum);

})


}