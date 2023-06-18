const timeOption = document.getElementById('time-option');

timeOption.addEventListener('change', function(event){

    const val = event.target.value;
    if(val < 1 || val > 60){
        timeOption.value = 25;
    }

})

const savebtn  = document.getElementById('save-btn');

savebtn.addEventListener('click', () =>{

    chrome.storage.local.set({
        timer:0,
        timeOption: timeOption.value,
        isRunning:false,
    })
})

chrome.storage.local.get(["timeOption"] , (res) => {
    if(res.timeOption){
        timeOption.value = res.timeOption
    }else{
        timeOption.value = 25;
        chrome.storage.local.set({
            timeOption:timeOption.value,
        })
    }
})