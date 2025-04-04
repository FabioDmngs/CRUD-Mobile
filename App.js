import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, Button } from 'react-native';

const App = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para carregar os contatos do servidor
  const loadPeople = () => {
    setLoading(true);
    fetch('http://192.168.43.190:3000/people')
      .then((response) => response.json())
      .then((data) => {
        setPeople(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar dados:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPeople();
  }, []);

  // Dados de exemplo para POST 
  const newPerson = {
    firstName: 'Fábio',
    lastName: 'Domingues',
    address: 'Rua A, 123',
    email: 'fabio.domingues01@email.com',
    avatar: 'https://avatars.githubusercontent.com/u/68564103'
  };

  // Dados de exemplo para PUT
  const UpPerson = {
    firstName: 'Fábio',
    lastName: 'Silva',
    address: 'Rua b,23',
    email: 'fabio.domingues01@email.com',
    avatar: 'https://avatars.githubusercontent.com/u/853823'
  };



  // Função para criar uma nova pessoa (POST)
  const createPerson = () => {
    fetch('http://192.168.43.190:3000/people', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPerson),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Pessoa criada:', data);
        loadPeople(); // Atualiza a lista após a criação
      })
      .catch((error) => console.error('Erro ao criar pessoa:', error));
  };

  // Função para atualizar uma pessoa existente (PUT)
  const updatePerson = (id) => {
    fetch(`http://192.168.43.190:3000/people/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(UpPerson),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Pessoa atualizada:', data);
        loadPeople(); // Atualiza a lista após a atualização
      })
      .catch((error) => console.error('Erro ao atualizar pessoa:', error));
  };

  // Função para deletar uma pessoa (DELETE)
  const deletePerson = (id) => {
    fetch(`http://192.168.43.190:3000/people/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('Pessoa deletada com sucesso');
        loadPeople(); // Atualiza a lista após a exclusão
      })
      .catch((error) => console.error('Erro ao deletar pessoa:', error));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Lista de contatos */}
      <FlatList
        data={people}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>
                {item.firstName} {item.lastName}
              </Text>
              <Text>{item.address}</Text>
              <Text>{item.email}</Text>

              {/* Botões para PUT E DELETE */}
              <View style={styles.itemButtons}>
                <Button
                  title="Atualizar"
                  onPress={() => updatePerson(item.id)}
                
                />
                <Button
                  title="Deletar"
                  onPress={() => deletePerson(item.id)}
                  color="red"
                />
              </View>
            </View>
          </View>
        )}
      />

      {/* Botão para criar novo contato */}
      <View style={styles.createButton}>
        <Button title="Criar Pessoa" onPress={createPerson}
        color = "green"
        />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
  itemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    
   
  },
  createButton: {
    marginVertical: 20,
   
  },
});

export default App;