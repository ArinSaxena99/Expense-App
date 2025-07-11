import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";

const LanguageModal = ({ visible, onClose, onSelect, options }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="#fff" />
        </Pressable>
        <View style={styles.container}>
          {options.map((lang) => (
            <Pressable
              key={lang.code}
              onPress={() => {
                onSelect(lang.code);
                onClose();
              }}
              style={styles.option}
            >
              <Text style={styles.label}>{lang.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  container: {
    backgroundColor: "#fff",
    height: 140,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 10,
    padding: 20,
    width: "100%",
  },
  option: {
    paddingVertical: 12,
  },
  label: {
    textAlign: "center",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    bottom: 150, // Slightly above the modal (modal height is 300)
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 6,
    zIndex: 2,
  },
});
