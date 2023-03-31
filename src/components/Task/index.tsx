import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme";
import { TaskDTO } from "../../dtos/TaskDTO";

interface Props extends TaskDTO {
  taskDone: (id?: string) => void;
  deleteTask: (id?: string) => void;
}

export function Task({ id, isCompleted, title, taskDone, deleteTask }: Props) {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPressIn={() => taskDone(id)}>
        <MaterialCommunityIcons
          name={
            isCompleted
              ? "checkbox-marked-circle-outline"
              : "checkbox-blank-circle-outline"
          }
          size={22}
          color={
            isCompleted ? theme.colors.brand.purple : theme.colors.brand.blue
          }
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={isCompleted ? styles.textDone : styles.textCreated}>
          {title}
        </Text>
      </View>

      <TouchableOpacity onPressIn={() => deleteTask(id)}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={20}
          color={theme.colors.base.gray300}
        />
      </TouchableOpacity>
    </View>
  );
}
