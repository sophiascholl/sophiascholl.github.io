/* Sophia Scholl
Project 2
May 14, 2025
*/

// 2D Array to store tasks - each task is [taskText, priority]
let tasks = [];
// New 2D array to store date and time - each item is [dateString, timeString]
let taskDueDates = [];

// Array of random tasks for the random task feature - focused on health and student wellness
const randomTasks = [
  "Take a short walk",
  "Drink a glass of water",
  "Stretch for 5 minutes",
  "Practice deep breathing for 2 minutes",
  "Stand up and move around for 5 minutes",
  "Do a quick meditation session",
  "Write in a gratitude journal",
  "Have a healthy snack",
  "Rest your eyes for 2 minutes",
  "Fix your posture",
  "Do a quick workout",
  "Call a friend or family member",
  "Take a short nap",
  "Listen to calming music",
  "Drink a cup of tea",
  "Practice mindfulness for 5 minutes",
  "Step outside for fresh air",
  "Do a quick stretching routine"
];

// Get DOM elements
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const taskList = document.getElementById('task-list');

// Function to validate date in MM/DD format
function validateDate(dateStr){
  // write the body of this function please
  if(dateStr.indexOf('/') !== dateStr.lastIndexOf('/') || dateStr.indexOf('/') === -1) {
    return false;
  }



  const parts = dateStr.split('/');
  if(parts.length !==2){
    return false;
  }

  const month = parts[0];
  const day = parts[1];

  if (month.length !==2 || day.length !==2){
    return false;
  }
  
  for (let i = 0; i < month.length; i++){
    if (month.charCodeAt(i) < 48 || month.charCodeAt(i) > 57){
      return false;
    }
  }

  for(let i = 0; i < day.length; i++){
    if (day.charCodeAt(i) < 48 || day.charCodeAt(i) > 57){
      return false;
    }
  }

  const monthNum = parseInt(month,10);
  const dayNum = parseInt(day,10);

  if (monthNum < 1 || monthNum > 12){
    return false;
  }
  const daysInMonth = [0,31,29,31,30,31,30,31,30,31,30,31];
    if (dayNum < 1 || dayNum > daysInMonth[monthNum]){
    return false;
  }
    return true;
}

// Function to validate time in 24-hour format (HH:MM)
function validateTime(timeStr) {
if(timeStr.indexOf(':') !== timeStr.lastIndexOf(':') || timeStr.indexOf(':') === -1) {
    return false;
  }

  const parts = timeStr.split(':');
  if(parts.length !==2){
    return false;
  }

  const hoursStr = parts[0];
  const minutesStr = parts[1];

  if (hoursStr.length !==2 || minutesStr.length !==2){
    return false;
  }
  

  for ( let i = 0; i < 2; i++){
    const hChar = hoursStr.charCodeAt(i);
    const mChar = minutesStr.charCodeAt(i);

    if(hChar < 48 || hChar > 57 || mChar < 48 || mChar > 57){
      return false;
    }
  }

  const hours = parseInt(hoursStr,10);
  const minutes = parseInt(minutesStr,10);

  if (hours < 0 || hours > 23) {
    return false;
  }

  if (minutes < 0 || minutes > 59) {
    return false;
  }
  return true;
}

function calculatePriority(dateStr, timeStr) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear()

  const [monthStr, dayStr] = dateStr.split('/').map(Number);
  const [hoursNum, timeNum] = timeStr.split(':').map(Number);

  const dueDate = new Date(currentYear, monthStr-1, dayStr, hoursNum, timeNum);

  console.log(dueDate);
  console.log(dueDate.getTime());
  return dueDate.getTime();
}



// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  const dateStr = dateInput.value.trim();
  const timeStr = timeInput.value.trim();
  
  if (taskText === '') {
    alert('Please enter a task first!');
    return;
  }
  
  if (!validateDate(dateStr)) {
    alert('Please enter a valid date in MM/DD format!');
    return;
  }
  
  if (!validateTime(timeStr)) {
    alert('Please enter a valid time in 24-hour format (HH:MM)!');
    return;
  }
  
  // Calculate priority based on date and time
  const priority = calculatePriority(dateStr, timeStr);
  console.log(priority);
  
  // Create task array [taskText, priority]
  const task = [taskText, priority];
  
  // Add to tasks array
  tasks.push(task);
  
  // Add to due dates array
  taskDueDates.push([dateStr, timeStr]);
  
  // Sort tasks by priority
  sortTasksByPriority();
  
  // Update task display
  updateTaskDisplay();
  
  // Clear the input field
  clearInput();
}

// Function to add a random task
function addRandomTask() {
  // Get random task from the array
  const randomIndex = Math.floor(Math.random() * randomTasks.length);
  const randomTask = randomTasks[randomIndex];
  
  // Set the task input value
  taskInput.value = randomTask;
  
  // Focus on the date input
  dateInput.focus();
}

// Function to sort tasks by priority and update the taskDueDates array accordingly
function sortTasksByPriority() {
  // Create an array of indices
  let indices = Array.from(Array(tasks.length).keys());
  
  // Sort indices based on due dates and times
  indices.sort(function(a, b) {
    // Get date and time from taskDueDates
    const dateA = taskDueDates[a][0];
    const timeA = taskDueDates[a][1];
    const dateB = taskDueDates[b][0];
    const timeB = taskDueDates[b][1];
    
    // Parse date components
    const [monthA, dayA] = dateA.split('/').map(Number);
    const [monthB, dayB] = dateB.split('/').map(Number);
    
    // Compare months first
    if (monthA !== monthB) {
      return monthA - monthB;
    }
    
    // If months are the same, compare days
    if (dayA !== dayB) {
      return dayA - dayB;
    }
    
    // If dates are the same, compare times
    const [hoursA, minutesA] = timeA.split(':').map(Number);
    const [hoursB, minutesB] = timeB.split(':').map(Number);
    
    // Compare hours
    if (hoursA !== hoursB) {
      return hoursA - hoursB;
    }
    
    // Compare minutes
    return minutesA - minutesB;
  });
  
  // Create new arrays based on sorted indices
  const newTasks = [];
  const newTaskDueDates = [];
  
  for (let i = 0; i < indices.length; i++) {
    newTasks.push(tasks[indices[i]]);
    newTaskDueDates.push(taskDueDates[indices[i]]);
  }
  
  // Replace original arrays with sorted arrays
  tasks = newTasks;
  taskDueDates = newTaskDueDates;
}

// Function to handle keypress (for Enter key)
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

// Assign the onkeydown property directly
taskInput.onkeydown = handleKeyPress;

// Function to clear the input fields
function clearInput() {
  taskInput.value = '';

  taskInput.focus();
}

// Function to update the task display
function updateTaskDisplay() {
  // Clear current task list
  taskList.innerHTML = '';
  
  // Add each task item using for loop as requested
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskText = task[0]; // Task text is at index 0
    const dateStr = taskDueDates[i][0]; // Date string
    const timeStr = taskDueDates[i][1]; // Time string
    
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    
    // Create task details container
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';
    
    // Get current date
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Parse the date and time
    const [month, day] = dateStr.split('/').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    // Create a date object for the due date
    const dueDate = new Date(currentYear, month - 1, day, hours, minutes);
    
    // Calculate time difference in hours
    const diffMs = dueDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    // Assign visible priority class based on time difference
    let priorityClass = 1; // Default to highest priority (red)
    if (diffHours < 0) {
      priorityClass = 1; // Overdue - highest priority (red)
    } else if (diffHours < 4) {
      priorityClass = 1; // Due within 4 hours - highest priority (red)
    } else if (diffHours < 24) {
      priorityClass = 2; // Due within a day (orange)
    } else if (diffHours < 48) {
      priorityClass = 3; // Due within 2 days (blue)
    } else if (diffHours < 72) {
      priorityClass = 4; // Due within 3 days (green)
    } else {
      priorityClass = 5; // Due later - lowest priority (gray)
    }
    
    // Create task text container
    const taskTextContainer = document.createElement('span');
    taskTextContainer.className = 'task-text';
    
    // Create priority dot element
    const priorityDot = document.createElement('span');
    priorityDot.className = `priority-indicator priority-${priorityClass}`;
    
    // Create the actual task text element
    const taskTextElement = document.createTextNode(taskText);
    
    // Create due date text
    const dueDateText = document.createElement('span');
    dueDateText.className = 'due-date-text';
    dueDateText.textContent = `Due: ${dateStr} at ${timeStr}`;
    
    // Create delete button with onclick attribute
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.setAttribute('onclick', `deleteTask(${i})`);
    
    // Append elements to containers
    taskTextContainer.appendChild(priorityDot);
    taskTextContainer.appendChild(taskTextElement);
    
    taskDetails.appendChild(taskTextContainer);
    taskDetails.appendChild(dueDateText);
    
    listItem.appendChild(taskDetails);
    listItem.appendChild(deleteButton);
    
    // Append list item to task list
    taskList.appendChild(listItem);
  }
}

// Function to delete a specific task
function deleteTask(index) {
  // Remove task from both arrays
  tasks.splice(index, 1);
  taskDueDates.splice(index, 1);
  
  // Update the display
  updateTaskDisplay();
}

// Function to clear all tasks
function clearTasks() {
  // Clear both arrays
  tasks = [];
  taskDueDates = [];
  
  // Update the display
  updateTaskDisplay();
}

// Initial input field setup and display update
window.onload = function() {
  // Initial update of task display
  updateTaskDisplay();
};