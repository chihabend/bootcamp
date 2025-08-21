import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

const testAPI = async () => {
  try {
    console.log('Testing Task Management API...\n');

    const createTask = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Complete Project',
        description: 'Finish the task management API project',
        priority: 'high',
        status: 'pending'
      })
    });
    
    const newTask = await createTask.json();
    console.log('✅ Created task:', newTask);

    const getAllTasks = await fetch(`${BASE_URL}/tasks`);
    const tasks = await getAllTasks.json();
    console.log('\n✅ All tasks:', tasks);

    const getTask = await fetch(`${BASE_URL}/tasks/${newTask.id}`);
    const task = await getTask.json();
    console.log('\n✅ Retrieved task:', task);

    const updateTask = await fetch(`${BASE_URL}/tasks/${newTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'in-progress' })
    });
    
    const updatedTask = await updateTask.json();
    console.log('\n✅ Updated task:', updatedTask);

    const deleteTask = await fetch(`${BASE_URL}/tasks/${newTask.id}`, {
      method: 'DELETE'
    });
    
    const deleteResult = await deleteTask.json();
    console.log('\n✅ Deleted task:', deleteResult);

    const finalTasks = await fetch(`${BASE_URL}/tasks`);
    const finalTaskList = await finalTasks.json();
    console.log('\n✅ Final task list:', finalTaskList);

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
};

testAPI();
