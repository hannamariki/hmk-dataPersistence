import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';

export default function App() {
  const [credit, setCredit] = useState('');
  const [title, setTitle] = useState('');
  const [courses, setCourses] = useState([]);

  const db = useSQLiteContext();

  const saveItem = async () => {
    try {
      await db.runAsync('INSERT INTO course (credits, title) VALUES (?, ?)', [credit, title]);
      await updateList();
    } catch (error) {
      console.error('Could not add item', error);
    }
  };

  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * FROM course');
      setCourses(list);
    } catch (error) {
      console.error('Could not get items', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await db.runAsync('DELETE FROM course WHERE id = ?', [id]);
      await updateList();
    } catch (error) {
      console.error('Could not delete item', error);
    }
  };

  useEffect(() => {
    updateList();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Title' 
        onChangeText={text => setTitle(text)}
        value={title} 
      /> 
      <TextInput 
        placeholder='Credits' 
        keyboardType='numeric' 
        onChangeText={text => setCredit(text)}
        value={credit} 
      /> 
      <Button onPress={saveItem} title="Save" />
      <FlatList
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.title}</Text>
            <Text>{item.credits}</Text>
            <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.id)}>done</Text>
          </View>
        )}
        data={courses}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
});
