import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({icon,size,color, onPress}) => {
  return (
    <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} color={color} size={size}/>
        {/* <Text style={styles.hello}>+</Text> */}
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer:{
        borderRadius:24,
        padding:6,
        marginHorizontal:12,
        marginVertical:2
    },
    pressed:{
        opacity:0.75
    },
});
