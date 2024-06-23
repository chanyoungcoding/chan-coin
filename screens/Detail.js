import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { history, info } from "../api";
import { Icon } from "../components/Coin";
import { useQuery } from "@tanstack/react-query";

const Detail = ({ navigation, route: {params: { symbol, id }}}) => {

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Icon
          source={{
            uri: `https://coplore-icon-api.vercel.app/api/icons/${symbol}`,
          }}
        />
      ),
    });
  }, []);

  const { isLoading: infoLoading, data: infoData } = useQuery({
    queryKey: ["coinInfo", id],
    queryFn: info
  });

  const { isLoading: historyLoading, data: historyData } = useQuery({
    queryKey: ["coinHistory", id],
    history
  });

  console.log(infoData);

  return <Container />;
};

const Container = styled.ScrollView``;

export default Detail;