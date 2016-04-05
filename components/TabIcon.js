import React, {
  StyleSheet,
  Component,
  View,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  icon: {
    flex: 1
  },
  text: {
    flex: 1,
    fontSize: 10,
    color: '#929292'
  },
  textSelected: {
    color: '#0076FF'
  }
})

export default class TabIcon extends Component {
    render(){
        const map = {
          topic: 'home',
          discover: 'compass',
          me: 'user'
        }

        let name = 'roket'
        if (this.props.name in map) {
          name = map[this.props.name]
        }

        let color = this.props.selected ? '#0076FF' : '#929292'

        return (
            <View style={styles.wrap}>
              <Icon name={name} size={28} color={color} style={styles.icon}/>
              <Text style={[styles.text, this.props.selected && styles.textSelected]}>{this.props.title}</Text>
            </View>
        );
    }
}
