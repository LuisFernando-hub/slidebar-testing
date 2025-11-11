
import styled from 'styled-components/native';
import { Dimensions, FlatList } from 'react-native';
import { useRef, useState } from 'react';

const { width } = Dimensions.get('window');

export default function CategorySlider({ categories, size = 300 }) {
    const [page, setPage] = useState(0);
    const flatListRef = useRef(null);

    const itemsPerPage = 6;
    const totalPages = Math.ceil(categories.length / itemsPerPage);


    const handleNext = () => {
        const nextPage = (page + 1) % totalPages;
        flatListRef.current.scrollToIndex({ index: nextPage, animated: true });
        setPage(nextPage);
    };


    const handlePrev = () => {
        const prevPage = (page - 1 + totalPages) % totalPages;
        flatListRef.current.scrollToIndex({ index: prevPage, animated: true });
        setPage(prevPage);
    };


    const pages = [];
    for (let i = 0; i < totalPages; i++) {
        const start = i * itemsPerPage;
        const slice = categories.slice(start, start + itemsPerPage);
        pages.push(slice);
    }

    const handleScrollEnd = (e) => {
        const newPage = Math.round(e.nativeEvent.contentOffset.x / width);
        setPage(newPage);
    };

    const renderPage = ({ item }) => (
        <PageContainer style={{ height: size }}>
            <CategoryGrid>
                {item.map((cat) => (
                <CategoryItem key={cat.id}>
                    <Emoji>{cat.emoji}</Emoji>
                    <CategoryName>{cat.name}</CategoryName>
                </CategoryItem>
                ))}
            </CategoryGrid>
        </PageContainer>
    );

    return (
        <Container style={{ height: size }}>
            <FlatList
                ref={flatListRef}
                data={pages}
                keyExtractor={(_, i) => i.toString()}
                renderItem={renderPage}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScrollEnd}
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


const CategoryGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 82%;
  padding: 10px 0;
`;


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

const PageContainer = styled.View`
  width: ${width}px;
  justify-content: center;
  align-items: center;
`;