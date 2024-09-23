
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';


export default function App() {
const [credit, setCredit] = useState('');
 const [title, setTitle] = useState('');
 const [courses, setCourses] = useState([]);

 const db = SQLite.useSQLiteContext()


const saveItem = async () => { //kurssin opintopistemäärä
    try {
      await db.runAsync('INSERT INTO course VALUES (?, ?, ?)', null, credit, title);
      await updateList();
    } catch (error) {
      console.error('Could not add item', error);
    }
  };
  
  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from course'); // kysytään aina kaikki
      setCourses(list);
    } catch (error) {
      console.error('Could not get items', error);
    }
  }
  
  const deleteItem = async (id) => { //kurssi poistetaan kun suoritettu (done painike)
    console.log('deleteItem')
    try {
      await db.runAsync('DELETE FROM course WHERE id=?', id);
      await updateList();
    }
    catch (error) {
      console.error('Could not delete item', error);
    }
  }
  
  useEffect(() => {updateList()}, []); 

<View style={styles.container}>
      <TextInput 
        placeholder='Title' 
        onChangeText={title => setTitle(title)}
        value={title}/> 
      <TextInput 
        placeholder='Credits' 
        keyboardType='numeric' 
        onChangeText={credit => setCredit(credit)}
        value={credit}/> 
      <Button onPress={saveItem} title="Save" />
      <FlatList
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
      <View style={styles.itemcontainer}>
      < Text>{item.title}</Text>
        <Text>{item.credits} </Text>
        <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.id)}>done</Text>
      </View>}
        data={courses}//courses päivittyy tänne
/>
     
    </View>
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        },
      });
      
}