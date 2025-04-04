import React from "react"
import { View, Text, ImageBackground, ImageSourcePropType } from "react-native"
import { Ionicons } from "@expo/vector-icons"
interface NewsCardProps {
  image: ImageSourcePropType
  title: string
  desc: string
  date: string
}
const NewsCard: React.FC<NewsCardProps> = ({ image, title, desc, date }) => {
  return (
    <View className="w-64 h-80 bg-white rounded-lg overflow-hidden shadow-lg">
      <ImageBackground
        source={image}
        className="flex-1 justify-center items-center"
        resizeMode="cover"
      ></ImageBackground>
      <View className="h-1/2 py-2 px-2 gap-1 my-3">
        <Text className="text-lg font-bold">{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="time-outline" size={15} color="gray" />
          <Text className="text-xs font-light ml-1">{date}</Text>
        </View>
        <Text
          className="text-xs text-gray-700 font-medium"
          numberOfLines={4} // Limit to 3 lines
          ellipsizeMode="tail" // Add ellipsis at the end
        >
          {desc}
        </Text>
      </View>
    </View>
  )
}
export default NewsCard