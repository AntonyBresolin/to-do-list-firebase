import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import logo from "../../assests/img/logo.png";
import { theme } from "../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type HeaderProps = {
  task: string,
  onChangeText: (task: string) => void
  onPress: () => void
}

export function Header({task, onChangeText, onPress}: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Image source={logo} />
      <View style={styles.form}>
        <TextInput
          placeholderTextColor={theme.colors.base.gray300}
          placeholder="Adicione uma nova tarefa"
          style={styles.input}
          value={task}
          onChangeText={onChangeText}
        />
        <TouchableOpacity style={styles.botao} onPress={onPress}>
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={22}
            color={theme.colors.base.gray100}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
      </View>
    </View>
  );
}
