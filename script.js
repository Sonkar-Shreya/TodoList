// set todo and get todo are used for local storage 
// here getTodo return the todos which are stored in local storage
function getTodo() {
  const todo = localStorage.getItem("todo");
  if (!todo) return [];
  return JSON.parse(todo);
}

let todo = document.getElementById("input");
let list = document.getElementById("list");
// here array is initalised with get todo function as if we have any todo in local storage it will show these todos 
// otherwise it return an empty array
let array = getTodo();
let countofTask = array.length;

display();
// add Todo function : add todos to array
function addTodo() {
  let input = document.getElementById("input").value;

  if (input == "") {
    alert("write todo");
  } else {
    const task = {
      id: Date.now(),
      status: false,
      title: input,
    };
    array.push(task);
    setTodos();
    document.getElementById("input").value = "";
    countofTask++;
    display();
  }
}
// display function to display todos by accessing through array and making list, adding checkbox and delete button

function display() {
  document.getElementById("list").innerHTML = "";
  document.getElementById("countTask").innerHTML = countofTask;

  // todo ko list m add krege to display hoga

  for (const task of array) {
    let box = document.createElement("div");
    let li = document.createElement("span");
    let box1 = document.createElement("span");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.status;
    checkbox.addEventListener("click", () => {
      task.status = !task.status;
      setTodos();
      display();
      console.log(array);
    });

    const del = document.createElement("img");
    del.src = "img/delete.png";
    del.style.width = "14px";
    del.id = task.title;
    del.addEventListener("click", deleteTodo);

    li.style.textDecoration = task.status ? "line-through" : "none";
    li.innerHTML = task.title;
    todo.value = "";
    li.style.paddingLeft = "10px";
    li.style.fontSize = "larger";

    box.style.backgroundColor = "rgb(229, 246, 203)";
    box.style.borderRadius = "10px";
    box.style.border = "5px solid white";
    box.style.height = "40px";
    box.style.paddingLeft = "12px";
    box.style.paddingRight = "12px";
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "space-between";


    box1.appendChild(checkbox);
    box1.appendChild(li);
    box.appendChild(box1);
    box.appendChild(del);
    list.appendChild(box);
  }
}
// set Todos to set the todos in local storage
function setTodos() {
  localStorage.setItem("todo", JSON.stringify(array));
}

// delete todo : to delete the todo from array and local storage and update in display
function deleteTodo(e) {
  const taskId = e.target.id;
  array = array.filter((task) => task.title != taskId);
  setTodos();
  countofTask--;
  document.getElementById("countTask").innerHTML = countofTask;
  display();
}
