import React, { useEffect, useState, useCallback } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import {
  Alert,
  Button,
  FlatList,
  Image,
  PlatformColor,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
  visited: {
    opacity: 0.5,
  },
  photo: {
    width: 100,
    height: 100,
  },
});

const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [visitedArticles, setVisitedArticles] = useState([]);
  const { getItem, setItem } = useAsyncStorage("@visited");

  const readItemFromStorage = async () => {
    const item = await getItem();
    setVisitedArticles(JSON.parse(item) || []);
  };

  const writeItemToStorage = async (newValue) => {
    await setItem(JSON.stringify(newValue));
    setVisitedArticles(newValue);
  };

  const fetchArticles = () =>
    fetch(Constants.manifest.extra.API_URL + "/articles")
      .then((data) => data.json())
      .then((items) => {
        setArticles(items);
      })
      .catch((e) => console.error(e));

  useEffect(() => {
    readItemFromStorage().then(fetchArticles);
  }, []);

  const handlePress = useCallback(
    async (item) => {
      if (!visitedArticles.includes(item.id)) {
        const newArticles = [...(visitedArticles || []), item.id];
        setVisitedArticles(newArticles);
        ``;
        await writeItemToStorage(newArticles);
      }
      navigation.navigate("Article", {
        id: item.id,
        title: item.title,
      });
    },
    [visitedArticles]
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchArticles().then(() => setRefreshing(false));
  }, []);

  const showVisitedArticleIds = useCallback(() => {
    alert("Visited ids:" + (visitedArticles || []).join(","));
  }, [visitedArticles]);

  return (
    <View
      style={{
        margin: 20,
      }}
    >
      <View style={{ marginVertical: 10 }}>
        <Button title="Show me visitedIds" onPress={showVisitedArticleIds} />
      </View>
      <FlatList
        data={articles}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id} onPress={() => handlePress(item)}>
            <View
              style={[
                styles.item,
                visitedArticles.includes(item.id) ? styles.visited : undefined,
              ]}
            >
              <Image
                source={{
                  uri: item.photo,
                }}
                style={styles.photo}
              />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export { HomeScreen };
