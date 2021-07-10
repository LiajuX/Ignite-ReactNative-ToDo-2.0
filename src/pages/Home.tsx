import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task } from '../components/TaskItem';
import { TaskList } from '../components/TaskList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(task => task.title === newTaskTitle);
    
    if (foundTask) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const foundTask = updatedTasks.find(task => task.id === id);

    if (!foundTask) {
      return;
    }

    foundTask.done = !foundTask.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
 
        {
          text: 'Sim',
          onPress: () => { setTasks(oldState => oldState.filter(
              task => task.id !== id
            ));
          }
        }
      ]
    );
  }

  function handleEditTask(id: number, newTaskTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const foundTask = updatedTasks.find(task => task.id === id);

    if (!foundTask) {
      return;
    }

    foundTask.title = newTaskTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TaskList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})