
let taskArray = [];


function updateTime(){

    chrome.storage.local.get(["timer" , "isRunning"] , (res) => {

        const checkstart = document.getElementById('start-timer-btn');
       if(res.isRunning == true){
        checkstart.textContent = "Pause Timer"
       }else if(res.isRunning == false){
        checkstart.textContent = "Start Timer"
       }

      
        const time = document.getElementById("time")
        const minutes = `${25 - Math.ceil( res.timer/60)}`.padStart(2 , "0")
        let seconds = "00";
       if(res.timer % 60 != 0){
         seconds = `${60 - res.timer%60}`.padStart(2 , "0")
       }
        time.textContent = `${minutes}:${seconds}`
    })
}
updateTime();
setInterval(updateTime , 1000);

const startTimerbtn = document.getElementById("start-timer-btn");
startTimerbtn.addEventListener("click", () =>{
   chrome.storage.local.get(["isRunning" ] , (res) => {
    chrome.storage.local.set({
        isRunning: !res.isRunning,
    } , () => {
        startTimerbtn.textContent  = !res.isRunning ? "Pause Timer":"Start Timer"
    })
   })
})


const resetTimerbtn = document.getElementById('reset-timer-btn');
resetTimerbtn.addEventListener('click', () =>{
    chrome.storage.local.set({
        timer:0 ,
        isRunning:false,
    } , () => {
        startTimerbtn.textContent = "Start Timer"
    })
})


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