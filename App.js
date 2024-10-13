
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import Courselist from './Courselist';
import { SQLiteProvider } from 'expo-sqlite';


export default function App() {

  const initialize = async (db) => {
    db.execAsync(`
      CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY NOT NULL, credits INT, title TEXT);
    `);
  };

  return (
    <SQLiteProvider
      databaseName='coursedb.db'
      onInit={initialize}
      onError={error => console.error('Could not open database', error)}
    >
      <Courselist />
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margintop: 30
  }
}
);

