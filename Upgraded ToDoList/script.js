document.addEventListener("DOMContentLoaded", function() {
    var addTaskBtn = document.getElementById("addTaskBtn");
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
    var checkedCountSpan = document.getElementById("checkedCount");
    var uncheckedCountSpan = document.getElementById("uncheckedCount");

    addTaskBtn.addEventListener("click", function() {
        addTask();
    });

    function addTask() {
        if (taskInput.value === "") {
            alert("Please enter a task!");
            return;
        }

        var li = document.createElement("li");
        var taskText = document.createElement("span");
        taskText.textContent = taskInput.value;
        taskText.classList.add("task-text");
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.addEventListener("change", function() {
            updateTaskStatus();
        });
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", function() {
            taskList.removeChild(li);
            updateTaskStatus();
        });
        li.appendChild(checkBox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        updateTaskStatus();

        taskInput.value = "";
    }

    function updateTaskStatus() {
        var checkedCount = 0;
        var uncheckedCount = 0;
        var tasks = taskList.getElementsByTagName("li");
        for (var i = 0; i < tasks.length; i++) {
            var checkBox = tasks[i].querySelector("input[type='checkbox']");
            if (checkBox.checked) {
                checkedCount++;
            } else {
                uncheckedCount++;
            }
        }
        checkedCountSpan.textContent = checkedCount;
        uncheckedCountSpan.textContent = uncheckedCount;
    }
});
