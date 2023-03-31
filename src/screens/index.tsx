import { useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { Header } from "../components/Header";
import { Task } from "../components/Task";
import { TaskDTO } from "../dtos/TaskDTO";
import Empty from "../components/Empty";
import { uuid } from "../utils/uuid";

export function HomeScreen() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [newTask, setNewTask] = useState("");

  function handleTaskAdd() {
    if (newTask !== "" && newTask.length >= 5) {
      setTasks((tasks) => [
        ...tasks,
        { id: uuid(), isCompleted: false, title: newTask.trim() },
      ]);
    }
    setNewTask("");
  }

  function handleTaskDone(id: string) {
    setTasks((tasks) =>
      tasks.map((task) => {
        task.id === id ? (task.isCompleted = !task.isCompleted) : null;
        return task;
      })
    );
  }

  function handleDeleteTask(id: string) {
    return Alert.alert(
      "Remover Tarefa",
      `Realmente deseja remover a tarefa "${getTitleTaskById(id)}"?`,
      [
        {
          text: "Sim",
          onPress: () =>
            setTasks((tasks) => tasks.filter((task) => task.id !== id)),
          style: "destructive",
        },
        { text: "Não", style: "cancel" },
      ]
    );
  }

  const getTitleTaskById = (id: string): string =>
    tasks
      .filter((task) => task.id === id && task.title)
      .map((item) => (item.title ? item.title : ""))[0];

  const tasksCreated = tasks.length;
  const completeTasks = tasks.filter(({ isCompleted }) => isCompleted).length;

  return (
    <View style={styles.container}>
      <Header
        task={newTask}
        onChangeText={setNewTask}
        onPress={handleTaskAdd}
      />
      <View style={styles.tasksContainer}>
        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={styles.tasksCreated}>Criadas</Text>
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>{tasksCreated}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.tasksDone}>Concluidas</Text>
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>{completeTasks}</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(tasks) => tasks.id!}
          renderItem={({ item }) => (
            <Task
              key={item.id}
              isCompleted={item.isCompleted}
              taskDone={() => handleTaskDone(item.id ?? "")}
              deleteTask={() => handleDeleteTask(item.id ?? "")}
              title={item.title}
            />
          )}
          ListEmptyComponent={<Empty />}
        />
      </View>
    </View>
  );
}
