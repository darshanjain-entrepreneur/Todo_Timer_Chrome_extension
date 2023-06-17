chrome.alarms.create("Todotimer" , {
    periodInMinutes:1/60,
})



chrome.alarms.onAlarm.addListener((alarm) => {
    if(alarm.name === "Todotimer"){
chrome.storage.local.get(["timer" , "isRunning"] , (res) => {
    if(res.isRunning){
       let  timer = res.timer + 1;
       let isRunning = true;
       if(timer === 25*60){
        this.registration.showNotification("Todo Timer" , {
            body:"Hey I am Darshan Jain , Your  25 minutes have passed",
            icon:"iconss.png",
        })
        timer = 0;
        isRunning = false;
       }
       chrome.storage.local.set({
        timer,
        isRunning,
       })
    }
})
    }
})


chrome.storage.local.get(["timer" , "isRunning"], (res) => {

    chrome.storage.local.set({
        timer: "timer" in res ? res.timer : 0,
        isRunning:"isRunning" in res ? res.isRunning :false,
    })
})