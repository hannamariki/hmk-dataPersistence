
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import Courselist from './Courselist';

export default function App() {
const [credit, setCredit] = useState('');
 const [title, setTitle] = useState('');
 const [courses, setCourses] = useState([]);

 const db = SQLite.openDatabaseSync('coursedb'); // luo SQLite tietokannan coursedb tai jos sellainen on olemassa, avaa sen

 const initialize = async () => { //kurssin nimi
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY NOT NULL, credits INT, title TEXT);
    `);// muista käyttää puolipistettä SQL kyselyissä!!!
    await updateList(); // päivittää course listan
  } catch (error) {
    console.error('Could not open database', error); 
  }
}


useEffect(() => {initialize()}, []); 

  return (
    <SQLite.SQLiteProvider
    databaseName='coursedb'
    onInit={initialize}
    onError={error => console.error('Could not open database', error)}
    >
      <Courselist>

      </Courselist>
    </SQLite.SQLiteProvider>
    
  );
}



