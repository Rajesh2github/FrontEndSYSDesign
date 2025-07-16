import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

const todoData = [{ id: 1, title: 'Sample Todo', completed: false },{ id: 2, title: 'Another Todo', completed: true }];

app.use(bodyParser.json());

app.all('/', (req, res) => {
  res.send('Hello, World!');
}); 
// READ
app.get('/todos', (req, res) => {
  res.json(todoData);
});
// CREATE
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  console.log("req.body", req.body);
  console.log("newTodo", newTodo);
  todoData.push(newTodo);
  res.status(201).json({message: 'Todo created successfully'});
});
// UPDATE
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;
  const index = todoData.findIndex(todo => todo.id === parseInt(id));
  if (index !== -1) {
    todoData[index] = { ...todoData[index], ...updatedTodo };
    res.json({ message: 'Todo updated successfully' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});
// DELETE
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const index = todoData.findIndex(todo => todo.id === parseInt(id));
  if (index !== -1) {
    todoData.splice(index, 1);
    res.json({ message: 'Todo deleted successfully' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
}); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;