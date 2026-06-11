import { View, ScrollView, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useState } from 'react';
import type_colors from './src/data/types'

export default function App() {
  const [nome, setNome] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const buscarPokemon = async () => {
      try {
          setLoading(true);
          setErro('');
          setPokemon(null);

          const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`);

          if (!resposta.ok) {
              throw new Error('Pokemon nao encontrado');
          }

          const dados = await resposta.json();
          setPokemon(dados);
          } catch (e) {
              setErro(e.message);
          } finally {
              setLoading(false);
          }
    }

  return (
    <>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>
      <Text style={styles.subtitle}>
        Pesquise qualquer Pokémon da PokéAPI
      </Text>
        <TextInput
            value={nome}
            onChangeText={setNome}
            onSubmitEditing={buscarPokemon}
            style={styles.input}
            placeholder="Digite o nome do Pokemon"
        />

        <TouchableOpacity style={styles.button} onPress={buscarPokemon}>
            <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>

        {loading && <Text style={styles.loading}>Carregando...</Text>}
        {erro ? <Text style={styles.error}>Erro: {erro}</Text> : null}
        {pokemon && (
          <View style={styles.card}>
            <Text style={styles.pokemonId}>
              #{pokemon.id}
            </Text>
            <Text style={styles.pokemonName}>
              {pokemon.name}
            </Text>
            <Image
              source={{
                uri: pokemon.sprites.other["official-artwork"].front_default
              }}
              style={styles.imagem}
            />
            <View style={styles.typeContainer}>
              {pokemon.types.map((item) => (
                <View
                  key={item.slot}
                  style={[
                    styles.tagTipo,
                    {
                      backgroundColor:
                        type_colors[item.type.name] || "#E2E8F0"
                    }
                  ]}
                >
                  <Text style={styles.textType}>
                    {item.type.name}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>
                  Peso
                </Text>
                <Text style={styles.infoValue}>
                  {(pokemon.weight / 10).toFixed(1)} kg
                </Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>
                  Altura
                </Text>
                <Text style={styles.infoValue}>
                  {(pokemon.height / 10).toFixed(1)} m
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f77979",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    alignSelf: "center",
    backgroundColor: "#f63b3b",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  subtitle: {
    color: "#ffffffd8",
    fontSize: 15,
    marginBottom: 25,
    alignSelf: "center",
  },

  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  button: {
    width: "100%",
    backgroundColor: "#f63b3b",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  loading: {
    color: "#64748B",
    marginTop: 20,
    fontSize: 15,
  },

  error: {
    color: "#DC2626",
    marginTop: 20,
    fontSize: 15,
    fontWeight: "600",
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    marginTop: 24,
    padding: 24,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 40,
  },

  pokemonId: {
    fontSize: 14,
    color: "#94A3B8",
  },

  pokemonName: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0F172A",
    textTransform: "capitalize",
    marginTop: 4,
    marginBottom: 10,
  },

  imagem: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },

  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },

  tagTipo: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    marginVertical: 4,
  },

  textType: {
    color: "#ffffff",
    fontWeight: "600",
    textTransform: "capitalize",
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  infoBox: {
    alignItems: "center",
  },

  infoLabel: {
    color: "#94A3B8",
    fontSize: 12,
    marginBottom: 4,
  },

  infoValue: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "700",
  },
});