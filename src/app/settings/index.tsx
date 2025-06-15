import { useEffect, useState } from 'react'
import { View, Text, Switch, TouchableOpacity } from 'react-native'

import restart from 'react-native-restart-app'

import { ScreenBase } from '@/components/ScreenBase'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/Card'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Settings } from '@/constants/Settings'
import { LinkWrap } from '@/components/LinkWrap'

function BaseOptionCard({ name, description, defaultValue, icon, interfaceComponent }) {
  return (
    <Card className='flex flex-wrap justify-between w-full p-3 rounded-2xl bg-opacity-5'>
      <View className='w-full'>
        <ThemedText className='font-bold text-lg'>{icon} {name}</ThemedText>
        <ThemedText className='italic'>{description}</ThemedText>
      </View>

      <View className='flex flex-row justify-between items-center'>
        <Text className='font-bold text-sm italic text-neutral-500'>{defaultValue} by default</Text>
        {interfaceComponent}
      </View>
    </Card>
  )
}

function ToggleOptionCard({ name, description, icon, defaultValue, id }) {

  const [value, setValue] = useState<string | null>(null)

  async function toggle() {
    const currentValue = await AsyncStorage.getItem(id)
    const newValue = currentValue === 'enabled' ? 'disabled' : 'enabled'
    try {
      await AsyncStorage.setItem(id, newValue)
      console.log(newValue)
    } catch(err) {
      console.log(err)
    }
    setValue(newValue)
  }

  useEffect(() => {
    async function getInitial() {
      setValue(await AsyncStorage.getItem(id))
    }

    getInitial()
  })

  return (
      <BaseOptionCard name={name} description={description} icon={icon} defaultValue={defaultValue} interfaceComponent={
        value && <Switch trackColor={{false: '#914848FF', true: '#8AD42EFF'}} thumbColor={'#FFF'} onChange={toggle} value={value === 'enabled' ? true : false} />
      } />
  )
}

export default function HomeScreen() {

  return (
    <ScreenBase title='Settings' subtitle='Personalize your experience.' backdrop={require('$/images/decoratives/centerpiece.webp')}>
    
      <View className='flex justify-center items-center w-full rounded-t-3xl gap-4'>

        <Text className='font-bold text-orange-400'>Restart the app for changes to take effect.</Text>

        <View className='flex w-full gap-2 rounded-2xl bg-[#C44949]/50 pb-2'>
          <ThemedView lightColor='bg-[#C44949] border-[#C44949]/50' darkColor='bg-[#C44949]/50 border-[#C44949]' className='flex flex-row justify-center items-center gap-1 w-full h-12 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialIcons name='notifications' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialIcons name='notifications' size={24} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>Notifications</Text>
          </ThemedView>

          <View className='flex w-full gap-2 px-2'>
            {Object.keys(Settings['Notifications']).map((key) => {
              const option = Settings['Notifications'][key]
              if (option.type === 'toggle') {
                return <ToggleOptionCard
                  name={option.name}
                  description={option.description}
                  icon={option.icon}
                  defaultValue={option.default}
                  id={key}
                  key={key}
                />
              }
              if (option.type === 'choice') {
                return
              }
            })}
          </View>

        </View>




        <View className='flex w-full gap-2 rounded-2xl bg-[#80B93B]/50 pb-2'>
          <ThemedView lightColor='bg-[#80B93B] border-[#80B93B]/50' darkColor='bg-[#72B421]/50 border-[#72B421]' className='flex flex-row justify-center items-center gap-1 w-full h-12 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialCommunityIcons name='account-check' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialCommunityIcons name='account-check' size={24} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>App Preferences</Text>
          </ThemedView>

          <View className='flex w-full gap-2 px-2'>
            {Object.keys(Settings['App Preferences']).map((key) => {
              const option = Settings['App Preferences'][key]
              if (option.type === 'toggle') {
                return <ToggleOptionCard
                  name={option.name}
                  description={option.description}
                  icon={option.icon}
                  defaultValue={option.default}
                  id={key}
                  key={key}
                />
              }
              if (option.type === 'choice') {
                return
              }
            })}
          </View>
        </View>

        <View className='flex w-full gap-2 rounded-2xl bg-[#1A7CA3]/50 pb-2'>
          <ThemedView lightColor='bg-[#1A7CA3] border-[#1A7CA3]/50' darkColor='bg-[#1A7CA3]/50 border-[#1A7CA3]' className='flex flex-row justify-center items-center gap-1 w-full h-12 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialCommunityIcons name='information' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialCommunityIcons name='information' size={24} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>My Interests</Text>
          </ThemedView>

          <View className='flex w-full gap-2 px-2'>
            <LinkWrap href='/schedule/view'>
              <Card className='flex flex-wrap justify-between w-full p-3 rounded-2xl bg-opacity-5'>
                <View className='w-full'>
                  <ThemedText className='font-bold text-lg'>Configure "My Interests"</ThemedText>
                  <ThemedText className='italic'>Currently a work-in-progress feature.</ThemedText>
                </View>
              </Card>
            </LinkWrap>
          </View>
        </View>

        <View className='flex w-full gap-2 rounded-2xl bg-[#C48ECF]/50 pb-2'>
          <ThemedView lightColor='bg-[#C48ECF] border-[#9C5EA8]/50' darkColor='bg-[#AB5DBB]/50 border-[#AB5DBB]' className='flex flex-row justify-center items-center gap-1 w-full h-12 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialIcons name='punch-clock' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialIcons name='punch-clock' size={24} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>My Schedule</Text>
          </ThemedView>

          <View className='flex w-full gap-2 px-2'>
            <LinkWrap href='/schedule/view'>
              <Card className='flex flex-wrap justify-between w-full p-3 rounded-2xl bg-opacity-5'>
                <View className='w-full'>
                  <ThemedText className='font-bold text-lg'>Configure "My Schedule"</ThemedText>
                  <ThemedText className='italic'>Currently a work-in-progress feature.</ThemedText>
                </View>
              </Card>
            </LinkWrap>
          </View>
        </View>

        <View className='flex w-full gap-2 rounded-2xl bg-[#F89340]/50 pb-2'>
          <ThemedView lightColor='bg-[#F89340] border-[#F89340]/50' darkColor='bg-[#F88526]/50 border-[#F88526]' className='flex flex-row justify-center items-center gap-1 w-full h-12 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialCommunityIcons name='alien' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialCommunityIcons name='alien' size={24} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>Experiments</Text>
          </ThemedView>

          <View className='flex w-full gap-2 px-2'>
            {Object.keys(Settings['Experiments']).map((key) => {
              const option = Settings['Experiments'][key]
              if (option.type === 'toggle') {
                return <ToggleOptionCard
                  name={option.name}
                  description={option.description}
                  icon={option.icon}
                  defaultValue={option.default}
                  id={key}
                  key={key}
                />
              }
              if (option.type === 'choice') {
                return
              }
            })}
          </View>
        </View>

        <Text className='font-bold text-orange-400'>Restart the app for changes to take effect.</Text>

        <TouchableOpacity className='w-full' onPress={() => { restart() }}>
          <ThemedView lightColor='bg-[#F89340] border-[#F89340]/50' darkColor='bg-[#F88526]/50 border-[#F88526]' className='flex flex-row justify-center items-center gap-1 w-full h-12 p-2 rounded-2xl border-2 overflow-hidden'>
            <MaterialCommunityIcons name='react' size={128} color='#FFFFFF10' className='absolute' />
            <MaterialCommunityIcons name='react' size={24} color='#FFF' />
            <Text className='text-lg text-white' style={{fontFamily: 'Inter_700Bold'}}>Apply Changes & Restart</Text>
          </ThemedView>
        </TouchableOpacity>

        <Footer />
      </View>
    </ScreenBase>
  )
}