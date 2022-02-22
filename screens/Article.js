import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Comments } from "../components/Comments";

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
});

const Article = ({ navigation, route }) => {
  const [shouldLoadComments, setShouldLoadComments] = useState(false);

  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = route.params;
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetch(Constants.manifest.extra.API_URL + "/articles/" + id)
      .then((resp) => resp.json())
      .then((data) => {
        setArticle(data);
      })
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  }, []);

  const handleScroll = ({
    nativeEvent: { contentOffset, contentSize, layoutMeasurement },
  }) => {
    if (
      !shouldLoadComments &&
      layoutMeasurement.height + contentOffset.y >
        contentSize.height - layoutMeasurement.height
    ) {
      setTimeout(() => {
        setShouldLoadComments(true);
      }, 2000);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ width }}
        onScroll={handleScroll}
        scrollEventThrottle={100}
      >
        <Image
          source={{
            uri: article.photo,
          }}
          style={{
            width,
            height: 300,
          }}
        />
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>{article.title}</Text>
          <Text>{article.body}</Text>
        </View>
        <Comments shouldLoadComments={shouldLoadComments} articleId={id} />
      </ScrollView>
      <Button
        title="< HomeScreen"
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </View>
  );
};

export { Article };
