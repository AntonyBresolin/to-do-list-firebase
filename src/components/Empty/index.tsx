import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import clipboard from "../../assests/img/clipboard.png"

export default function Empty(){
    return <View style={styles.container}>
        <Image source={clipboard} style={styles.image}/>
        <Text style={styles.textBold}>Você ainda não possui tarefas cadastradas</Text>
        <Text style={[styles.textBold, styles.textRegular]}>Crie tarefas e organize seu dia</Text>
    </View>;
}