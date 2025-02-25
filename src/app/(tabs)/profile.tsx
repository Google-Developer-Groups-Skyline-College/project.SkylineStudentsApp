import { View, Text, Image } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { UserConfig } from '@/constants/UserConfig';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#000', dark: '#000' }}
      headerImage={
        <Image
          source={require('$/images/backdrop.png')}
          className='w-full h-[144%]'
        />
      }>

      <View>
        <ThemedText className='text-center mt-2' type='title'>Hello, <Text className='text-red-400'>{UserConfig.displayName}!</Text></ThemedText>
        <ThemedText className='text-center'>Welcome to Your <ThemedText className='font-bold'>Profile</ThemedText>.</ThemedText>
      </View>

      <ThemedText type='subtitle' className='border-b-[1px] border-neutral-200 pb-2'>⚙️ Your Dashboard</ThemedText>

      <View className='flex flex-row flex-wrap justify-between items-center gap-2'>
        <ThemedView darkColor='#00384E' lightColor='#1A7CA3FF' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 bg-sky-900 rounded-2xl'>
          <MaterialIcons name="notifications" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>Notifications</Text>
        </ThemedView>
        <ThemedView darkColor='#385515' lightColor='#689B2AFF' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
          <MaterialCommunityIcons name="account-check" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>Preferences</Text>
        </ThemedView>

        <ThemedView darkColor='#7f1d1d' lightColor='#CA4343FF' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
          <MaterialCommunityIcons name="information" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>My Details</Text>
        </ThemedView>
        <ThemedView darkColor='#673A15' lightColor='#CA8853FF' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 bg-yellow-900 rounded-2xl'>
          <MaterialCommunityIcons name="alien" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>Experimental</Text>
        </ThemedView>
        <ThemedView darkColor='#44204BFF' lightColor='#9C5EA8FF' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 bg-yellow-900 rounded-2xl'>
          <MaterialIcons name="map" size={32} color="#FFF" />
          <Text className='font-bold text-lg text-white'>My Schedule</Text>
        </ThemedView>
      </View>

      <View className='flex items-center'>
        <Text className='text-yellow-600 font-bold'>— This is an app preview. —</Text>
        <Text className='text-neutral-500'>Report bugs, request features, give feedback</Text>
        <Text className='text-neutral-500'>to the <Text className='font-bold'>Computer Science Club.</Text></Text>
        {/* TODO - Add a link to a google form for feedback */}
      </View>
      
    </ParallaxScrollView>
  );
}