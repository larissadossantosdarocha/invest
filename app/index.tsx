import { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0ffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
    color: "#990000",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default function Investimento() {
  const [mensal, setMensal] = useState("");
  const [meses, setMeses] = useState("");
  const [taxaJuros, setTaxaJuros] = useState("");
  const [resultado, setResultado] = useState("");

  function calcularInvestimento() {
    if (mensal && meses && taxaJuros) {
      // Convertendo as entradas para números
      const mensalValor = parseFloat(mensal);  // Aporte mensal
      const t = parseInt(meses);  // Número de meses
      const i = parseFloat(taxaJuros) / 100;  // Taxa de juros mensal em decimal

      let montanteR = 0;  // Montante acumulado

      // Calculando o valor total sem juros (somente aportes)
      const valorTotalSemJuros = mensalValor * t;

      // Laço de repetição para calcular o valor total com juros compostos
      for (let j = 1; j <= t; j++) {
        montanteR = montanteR + montanteR * i + mensalValor;
      }

      setResultado(
        `Valor Total sem Juros: R$ ${valorTotalSemJuros.toFixed(2)}\nValor Total com Juros Compostos: R$ ${montanteR.toFixed(2)}`
      );
    } else {
      setResultado("Por favor, insira todos os dados corretamente.");
    }
  } 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Investimento</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o valor do aporte mensal (R$)"
        keyboardType="numeric"
        value={mensal}
        onChangeText={setMensal}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o número de meses"
        keyboardType="numeric"
        value={meses}
        onChangeText={setMeses}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a taxa de juros mensal (%)"
        keyboardType="numeric"
        value={taxaJuros}
        onChangeText={setTaxaJuros}
      />

      <Button
        title="Calcular Investimento"
        color={"#990000"}
        onPress={calcularInvestimento}
      />

      <Text style={styles.text}>{resultado}</Text>
    </View>
  );
}
