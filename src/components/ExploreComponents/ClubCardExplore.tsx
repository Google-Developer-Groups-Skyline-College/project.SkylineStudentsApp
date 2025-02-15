import React from "react";
import { View, Text, ImageBackground, ImageSourcePropType } from "react-native";
interface CardProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  type: string;
  field: string;
}
const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  type,
  field,
}) => {
  return (
    <View className="w-64 h-80 bg-white rounded-lg overflow-hidden shadow-lg">
      <ImageBackground
        source={image}
        className="flex-1 justify-center items-center"
        resizeMode="cover"
      ></ImageBackground>
      <View className="h-1/2 py-2 px-2 gap-1 my-3 ">
        <Text className="text-xs font-light">
          {type} &bull; {field}
        </Text>
        <Text className="text-lg font-bold">{title}</Text>
        <Text className="text-sm text-gray-700 font-medium ">
          {description}
        </Text>
      </View>
    </View>
  );
};
export default Card;