import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "@tanstack/react-query";
import { CartesianChart, Line } from "victory-native";
import { View, Text, Dimensions } from "react-native";

import { history, info } from "../api";
import { BLACK_COLOR } from "../colors";
import { Icon } from "../components/Coin";
import inter from "../assets/InterVariable.ttf";
import { useFont } from "@shopify/react-native-skia";

const { width, height} = Dimensions.get("window");

const Detail = ({ navigation, route: { params: { symbol, id } } }) => {

  const font = useFont(inter, 12);
  const labelColor = "white";

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

  // Fetching coin info and history data using react-query
  const { isLoading: infoLoading, data: infoData } = useQuery({
    queryKey: ["coinInfo", id],
    queryFn: info
  });

  const { isLoading: historyLoading, data: historyData } = useQuery({
    queryKey: ["coinHistory", id],
    queryFn: history
  });

  const [victoryData, setVictoryData] = useState(null);

    // timestamp에서 월-일 형식의 문자열을 추출하는 함수
    const extractMonthDay = (timestamp) => {
      const extractTime = timestamp.match(/T\d{2}/)[0];
      if (extractTime) {
        const hour = extractTime.slice(1,3)
        return `${hour} `
      }
      return ''; // 일치하는 패턴이 없을 경우 빈 문자열 반환
    };

  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData.map((price) => ({
          x: extractMonthDay(price.timestamp),
          y: price.price,
        }))
      );
    }
  }, [historyData]);

  console.log(victoryData)
  console.log(historyData)

  return (
    <Container style={{height}}>
      <Box style={{height: height / 2, width: width / 1.1}}>
        {victoryData ? (
          <CartesianChart 
            data={victoryData}
            xKey="x" 
            yKeys={["y"]}
            domainPadding={{top: 30}}
            axisOptions={{ font, labelColor }}
          >
            {({ points }) => (
            <Line
              points={points.y}
              color="#81C784"
              strokeWidth={3}
              animate={{ type: "timing", duration: 300 }}
            />
            )}
          </CartesianChart>
        ) : <View><Text>데이터가 없습니다.</Text></View>}
      </Box>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${BLACK_COLOR};
`;

const Box = styled.View`
  margin: 0 auto;
`

export default Detail;
