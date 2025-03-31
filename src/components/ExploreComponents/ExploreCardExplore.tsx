import React from 'react'
import { View, Text, TouchableOpacity, Linking, Image } from 'react-native'
import { SkylineEvent } from '@/utils/fetchEvents'

const EventCard: React.FC<SkylineEvent> = ({ 
  title,
  date,
  description,
  location,
  link,
  image,
  time,
  building
}) => {
  const handlePress = () => {
    if (link) {
      Linking.openURL(link)
    }
  }

  const getHighQualityImage = (imageUrl: string) => {
    if (!imageUrl) return undefined
    const baseUrl = imageUrl.split('?')[0]
    return `${baseUrl}?w=800&h=800&fit=crop&auto=format&q=90`
  }

  return (
    <TouchableOpacity 
      className="w-full bg-[#1E1E1E] rounded-lg p-4 mb-4"
      onPress={handlePress}
    >
      <Text className="text-white text-xl font-bold">
        {title}
      </Text>
      
      <Text className="text-gray-300 text-base my-1">
        {time}
      </Text>

      <Text className="text-gray-400 text-base mb-2">
        {building && location ? `${location} - ${building}` : location || building}
      </Text>

      <Text className="text-gray-200 text-base mb-3">
        {description}
      </Text>

      {image && (
        <View className="w-full aspect-square rounded-lg overflow-hidden bg-[#121212]">
          <Image 
            source={{ uri: getHighQualityImage(image) }} 
            className="w-full h-full"
            resizeMode="contain"
            style={{ 
              width: '100%',
              height: undefined,
              aspectRatio: 1,
              backgroundColor: '#121212'
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  )
}

export default EventCard 