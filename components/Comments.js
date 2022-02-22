import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import { AddComment } from "./AddComment";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    paddingVertical: 20,
  },
});

const Comments = ({ shouldLoadComments, articleId }) => {
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const fetchComments = () => {
    fetch(
      Constants.manifest.extra.API_URL + "/articles/" + articleId + "/comments"
    )
      .then((data) => data.json())
      .then((items) => {
        setComments(items);
      })
      .catch((e) => console.error(e));
  };

  const handleAddComment = (author, content) => {
    setShowCommentForm(false);
    setComments((currentComments) => [{ author, content }, ...currentComments]);
  };

  useEffect(() => {
    if (shouldLoadComments) {
      fetchComments();
    }
  }, [shouldLoadComments]);

  if (!shouldLoadComments) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments section</Text>
      <Button title="Add comment" onPress={() => setShowCommentForm(true)} />
      <View>
        {comments.map((comment) => (
          <View key={comment.id} style={{ padding: 20 }}>
            <Text style={{ fontWeight: "bold" }}>
              <Text>Author:</Text>
              <Text>{comment.author}</Text>
            </Text>
            <Text>
              <Text>Content:</Text>
              <Text>{comment.content}</Text>
            </Text>
          </View>
        ))}
      </View>
      <AddComment
        visible={showCommentForm}
        onClose={() => setShowCommentForm(false)}
        onSubmit={handleAddComment}
      />
    </View>
  );
};

export { Comments };
