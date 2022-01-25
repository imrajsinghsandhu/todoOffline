/**
 * CRUD operation functions declared here.
 */

// the Rails API endpoint
// const baseURL = `${process.env.REACT_APP_API_URL}/api/version1/todos`;
const baseURL = "http://localhost:3000/api/version1/todos";

// the function to GET the todos
export const loadTodos = async () => {
  const res = await fetch(baseURL);
  return await res.json();
};

// get the todo via the id, hits the show function
// in ruby controller
export const getTodo = async (id) => {
  const res = await fetch(`${baseURL}/${id}`);
  return res.json;
};

// creating a new todo
export const createTodo = async (todo) => {
  return fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: todo.title,
      done: todo.done,
      tag: todo.tag,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// updating a todo
export const updateTodo = async (todo) => {
  const res = await fetch(`${baseURL}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: todo.id,
      title: todo.title,
      done: todo.done,
      tag: todo.tag,
    }),
  });

  return await res.json();
};

// Deleting the todo
export const deleteTodo = async (id) => {
  return fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};
