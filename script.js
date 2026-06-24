const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");
const stickyNote = document.getElementById("stickyNote");


function saveTasks() {

    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(function(task) {
        tasks.push(task.firstChild.textContent);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", addTask);

function addTask() {

    const taskText = taskInput.value;

    if(taskText === ""){
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        ${taskText}
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);

    saveTasks();

    taskInput.value = "";

    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function(){
        li.remove();
        saveTasks();
    });
}
const savedTasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function(taskText) {

    const li = document.createElement("li");

    li.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");

    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function() {
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);

    taskList.appendChild(li);

});






themeToggle.addEventListener("click", function(){

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
    themeToggle.textContent = "☀️";
}
else{
    themeToggle.textContent = "🌙";
}

});

stickyNote.value = localStorage.getItem("stickyNote") || "";

stickyNote.addEventListener("input", function() {
    localStorage.setItem("stickyNote", stickyNote.value);
});

const temperature =
    document.getElementById("temperature");

const weatherStatus =
    document.getElementById("weatherStatus");

    async function getWeather() {

    const url =
"https://api.open-meteo.com/v1/forecast?latitude=13.35&longitude=74.79&current=temperature_2m,weather_code";

    const response = await fetch(url);

    const data = await response.json();
    const code = data.current.weather_code;


    temperature.textContent =
        data.current.temperature_2m + "°C";

if(code === 0){
    weatherStatus.textContent = "☀️ Sunny • Manipal";
}
else if(code <= 3){
    weatherStatus.textContent = "⛅ Partly Cloudy • Manipal";
}
else{
    weatherStatus.textContent = "☁️ Cloudy • Manipal";
}

}
getWeather();