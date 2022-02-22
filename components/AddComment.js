import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 10,
  },
});

const AddComment = ({ visible, onClose, onSubmit }) => {
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    setAuthor("");
    setBody("");
    onSubmit(author, body);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <StatusBar hidden />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontWeight: "bold" }}>Add comment</Text>
            <TextInput
              placeholder="Author"
              value={author}
              onChangeText={(data) => setAuthor(data)}
              style={{ padding: 20 }}
              autoFocus
            />
            <TextInput
              placeholder="Comment"
              value={body}
              editable
              multiline
              onChangeText={(data) => setBody(data)}
              style={{ padding: 20 }}
            />
            <Button
              disabled={author.length === 0 || body.length === 0}
              title="Add comment"
              onPress={handleSubmit}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export { AddComment };
