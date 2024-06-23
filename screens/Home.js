import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components/native";

import { coins } from "../api";
import { BLACK_COLOR } from "../colors";
import Coin from "../components/Coin";

const Home = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["coins"],
    queryFn: coins
  })

  const [cleanData, setCleanData] = useState([]);

  useEffect(() => {
    if (data) {
      setCleanData(
        data.filter((coin) => coin.rank != 0 && coin.is_active && !coin.is_new)
      );
    }
  }, [data]);

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color="white" size="large" />
      </Loader>
    );
  }

  return (
    <Container>
      <FlatList
        data={cleanData}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Coin index={index} id={item.id} symbol={item.symbol} />
        )}
      />
    </Container>
  );
};


const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
  justify-content: center;
  align-items: center;
`;


export default Home;