// document.addEventListener("DOMContentLoaded", () => {
const taskListContainer = document.getElementById("taskCategories");
const addTaskBtn = document.getElementById("addTaskBtn");
const darkModeToggle = document.getElementById("darkModeToggle");
const searchTasks = document.getElementById("searchTasks");
const filterPriority = document.getElementById("filterPriority");
const sortByDate = document.getElementById("sortByDate");

// let draggedTaskIndex = null;

let tasks = [];
// Add Task
addTaskBtn.addEventListener("click", () => {
  console.log("xxx");
  const taskTitle = document.getElementById("taskTitle").value;
  const taskDueDate = document.getElementById("taskDueDate").value;
  const taskPriority = document.getElementById("taskPriority").value;
  const taskNotes = document.getElementById("taskNotes").value;

  if (taskTitle === "") return;

  const task = {
    title: taskTitle,
    dueDate: taskDueDate,
    priority: taskPriority,
    notes: taskNotes,
    completed: false,
  };

  tasks.push(task);
  console.log(task);
  renderTasks();
  clearForm();
});

// Clear Form
const clearForm = () => {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDueDate").value = "";
  document.getElementById("taskPriority").value = "low";
  document.getElementById("taskNotes").value = "";
};
// Render Tasks
const renderTasks = () => {
  taskListContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = `task ${task.priority}`;
    // taskDiv.setAttribute("draggable", "true");
    taskDiv.setAttribute("data-index", index);

    const formattedDueDate = task.dueDate
      ? new Date(task.dueDate).toLocaleDateString()
      : "No Due Date";

    if (task.completed) taskDiv.classList.add("completed");
    taskDiv.innerHTML = `
      <span>${task.title} - Due: ${formattedDueDate}</span>
      <div>
        <button class="complete-btn">${
          task.completed ? "Completed" : "Complete"
        }</button>
        <button class="delete-btn">Delete</button> 
      </div>
    `;

    // Add Complete functionality
    taskDiv.querySelector(".complete-btn").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed; // Toggle complete status
      renderTasks();
    });

    // Add Delete functionality
    taskDiv.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1); // Remove task from the array
      renderTasks();
    });

  
    console.log(tasks);
    taskListContainer.appendChild(taskDiv);
  });
};

// Dark Mode
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Filter & Search
searchTasks.addEventListener("input", applyFilters);
filterPriority.addEventListener("change", applyFilters);
sortByDate.addEventListener("change", applyFilters);

// function applyFilters() {
//   const searchTerm = searchTasks.value.toLowerCase();
//   const selectedPriority = filterPriority.value;

//   const selectedSort = sortByDate.value;

//   const filteredTasks = tasks.filter((task) => {
//     const matchesSearch = task.title.toLowerCase().includes(searchTerm);
//     const matchesPriority =
//       selectedPriority === "" || task.priority === selectedPriority;

//     return matchesSearch && matchesPriority;
//   });

//   // Render filtered tasks
//   taskListContainer.innerHTML = "";
//   filteredTasks.forEach((task, index) => {
//     const taskDiv = document.createElement("div");
//     taskDiv.className = `task ${task.priority}`;
//     taskDiv.setAttribute("draggable", "true");
//     taskDiv.setAttribute("data-index", index);
//     if (task.completed) taskDiv.classList.add("completed");
//     taskDiv.innerHTML = `
//                 <span>${task.title} - Due: ${task.dueDate}</span>
//                 <div>
//                     <button class="complete-btn">${
//                       task.completed ? "Completed" : "Complete"
//                     }</button>
//                 </div>
//             `;
//     // Add Complete functionality
//     taskDiv.querySelector(".complete-btn").addEventListener("click", () => {
//       tasks[index].completed = !tasks[index].completed;
//       applyFilters(); // Re-apply filters after completing task
//     });
//     // Drag Events
//     taskDiv.addEventListener("dragstart", handleDragStart);
//     taskDiv.addEventListener("dragover", handleDragOver);
//     taskDiv.addEventListener("drop", handleDrop);
//     taskDiv.addEventListener("dragend", handleDragEnd);
//     taskListContainer.appendChild(taskDiv);
//   });
// }
// Sort by Date logic
// sortByDate.addEventListener("change", () => {
//   const selectedSort = sortByDate.value;
//   if (selectedSort === "asc") {
//     tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
//   } else if (selectedSort === "desc") {
//     tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
//   }
//   renderTasks(); // Re-render the task list after sorting
// });
// Export Tasks as PDF

function applyFilters() {
  const searchTerm = searchTasks.value.toLowerCase();
  const selectedPriority = filterPriority.value;
  const selectedSort = sortByDate.value;

  // فیلتر کردن تسک‌ها بر اساس عنوان و اولویت
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm);
    const matchesPriority =
      selectedPriority === "" || task.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  // مرتب‌سازی تسک‌های فیلتر شده بر اساس تاریخ
  if (selectedSort === "asc") {
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (selectedSort === "desc") {
    filteredTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }

  // Render filtered and sorted tasks
  taskListContainer.innerHTML = "";
  filteredTasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = `task ${task.priority}`;
    taskDiv.setAttribute("draggable", "true");
    taskDiv.setAttribute("data-index", index);
    if (task.completed) taskDiv.classList.add("completed");
    taskDiv.innerHTML = `
                <span>${task.title} - Due: ${task.dueDate}</span>
                <div>
                    <button class="complete-btn">${
                      task.completed ? "Completed" : "Complete"
                    }</button>
                     <button class="delete-btn">Delete</button> 
                </div>
            `;
    // Add Complete functionality
    taskDiv.querySelector(".complete-btn").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      applyFilters(); // Re-apply filters after completing task
    });
     taskDiv.querySelector(".delete-btn").addEventListener("click", () => {
       tasks.splice(index, 1); // Remove task from the array
       applyFilters();
     });
  
    taskListContainer.appendChild(taskDiv);
  });
}

document.getElementById("exportTasksBtn").addEventListener("click", () => {
  exportTasksAsPDF();
});

const exportTasksAsPDF = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let yOffset = 10;

  tasks.forEach((task) => {
    const taskContent = `${task.title} - Due: ${task.dueDate} - Priority: ${task.priority}`;
    doc.text(taskContent, 10, yOffset);
    yOffset += 10;
  });

  doc.save("tasks.pdf");
};




const task = ['task1','task2','task3']