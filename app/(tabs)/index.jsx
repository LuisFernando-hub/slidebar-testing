import styled from "styled-components/native";
import CategoryGrid from "../../components/CategoryGrid";

export default function HomeScreen() {
  const categories = [
    { id: 1, name: "Education", emoji: "📚" },
    { id: 2, name: "Car", emoji: "🚗" },
    { id: 3, name: "Home", emoji: "🏠" },
    { id: 4, name: "Food", emoji: "🍕" },
    { id: 5, name: "Health", emoji: "💊" },
    { id: 6, name: "Selfcare", emoji: "💅" },
    { id: 7, name: "Travel", emoji: "✈️" },
    { id: 8, name: "Pets", emoji: "🐶" },
    { id: 10, name: "Finance", emoji: "💰" },
    { id: 11, name: "Finance", emoji: "💰" },
    { id: 12, name: "Finance", emoji: "💰" },
  ];

  return (
    <AppContainer>
      <CategoryGrid categories={categories} size={500} />
    </AppContainer>
  );
}

const AppContainer = styled.View`
  flex: 1;
  background-color: #000;
  justify-content: center;
  align-items: center;
`;
