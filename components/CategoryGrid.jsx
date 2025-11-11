
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function CategorySlider({ categories, size = 300 }) {
    const [page, setPage] = useState(0);


    const itemsPerPage = 6;
    const totalPages = Math.ceil(categories.length / itemsPerPage);


    const handleNext = () => {
        setPage((prev) => (prev + 1) % totalPages);
    };


    const handlePrev = () => {
        setPage((prev) => (prev - 1 + totalPages) % totalPages);
    };


    const startIndex = page * itemsPerPage;
    const visibleItems = categories.slice(startIndex, startIndex + itemsPerPage);


    return (
        <Container style={{ height: size }}>
            <CategoryGrid
                data={visibleItems}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-around' }}
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={({ item }) => (
                    <CategoryItem>
                        <Emoji>{item.emoji}</Emoji>
                        <CategoryName>{item.name}</CategoryName>
                    </CategoryItem>
                )}
            />


            <Pagination>
                {Array.from({ length: totalPages }).map((_, i) => (
                    <Dot key={i} active={i === page} onPress={() => setPage(i)} />
                ))}
            </Pagination>


            <ArrowLeft onPress={handlePrev}>
                <ArrowText>◀</ArrowText>
            </ArrowLeft>


            <ArrowRight onPress={handleNext}>
                <ArrowText>▶</ArrowText>
            </ArrowRight>
        </Container>
    );
}


const Container = styled.View`
    width: ${width}px;
    background-color: #000;
    align-items: center;
    justify-content: center;
    position: relative;
`;


const CategoryGrid = styled.FlatList``;


const CategoryItem = styled.View`
    background-color: #111;
    border-radius: 24px;
    width: 90px;
    height: 90px;
    justify-content: center;
    align-items: center;
    margin: 8px;
`;


const Emoji = styled.Text`
    font-size: 32px;
    margin-bottom: 6px;
`;


const CategoryName = styled.Text`
    color: #fff;
    font-size: 14px;
`;


const Pagination = styled.View`
    flex-direction: row;
    margin-top: 12px;
`;


const Dot = styled.TouchableOpacity`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${(props) => (props.active ? '#fff' : '#555')};
    margin: 0 4px;
`;


const ArrowLeft = styled.TouchableOpacity`
    position: absolute;
    left: 20px;
    top: 50%;
`;


const ArrowRight = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    top: 50%;
`;


const ArrowText = styled.Text`
    color: #fff;
    font-size: 20px;
`;