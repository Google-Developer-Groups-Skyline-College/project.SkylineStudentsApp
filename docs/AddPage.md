[comment]: <> (@rmorata: This file is to detail adding a simple page to the app!)

# Adding a page to the app🎉

## 📝 Adding Page Quick Start!

### Make the source directory for your page
Make a new directory under src/app/ and name it something meaningful. Our tech stack looks for index.tsx to be the source for the new page.
To start off, copy and paste the following into ```src/app/YOURPAGENAME/index.tsx```, throughout this guide I will be using ```src/app/empty/```:
```javascript
/*
@rmorata Stripped down version of clubListing/index.tsx where ParallaxScrollView and Titlebar still present
*/

import { View } from 'react-native'
import { Stack } from 'expo-router'

import { ThemedText } from '@/components/ThemedText'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import ReturnHome from '@/components/ReturnHome'
import { Image } from '@/components/Image'

export default function Empty() {

    return (
        <View className='w-full h-full'>
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#000', dark: '#000' }}
                headerImage={
                    <Image
                        source={require('$/images/missing.jpg')}
                        contentFit='cover'
                        contentPosition={{bottom: '10%'}}
                        style={{ width: '100%', height: '110%' }}
                    />
                }
            >
                {/* Title bar*/}
                <ThemedText type='subtitle' className='border-b-[1px] text-center border-neutral-200 pb-2'>
                    {'Empty Page Test'}
                </ThemedText>



                {/*@rmorata Actual page content to go here*/}


                
                {/*@rmorata Home button bar at bottom*/}
                <ReturnHome />

            </ParallaxScrollView>

            <Stack.Screen
                options={{
                    title: '',
                }}
            />
        </View>
    );
}
```

### Have a temporary way to get to your page
You need to route from src/app/(tabs)/index.tsx and make a button under the "Experimental Pages" section that routes to another page that is located as its own deirectory under the src/app/ directory.
```javascript
          <Link href='../empty' asChild>
            <Text className='font-bold text-orange-400 border border-orange-400 p-2'>New empty page</Text>
          </Link>
```

### Add button to home page
Within the section that has the large pretty buttons that take you to the clubs page, opportunites page, etc. you can copy and paste this one below the last one.
```javascript
            <ThemedView darkColor='#385515' lightColor='#689B2AFF' className='flex justify-center items-center gap-1 w-[49%] h-28 p-2 rounded-2xl'>
              <Link href='/empty' className='z-10 absolute w-full h-full' /> 
              <MaterialCommunityIcons name="party-popper" size={32} color="#FFF" />
              <Text className='font-bold text-lg text-white'>New Page</Text>
            </ThemedView>
```
Notice that for the href link doesn't need to go to parent directory. For example ```href='/empty``` rather than the experimental section button that uses ```href='../empty'```.

## Understanding the Typescript JSX w/ React-Native structure

### Top of the page source
At the top of the example page code provide, we have
```javascript
import { View } from 'react-native'
import { Stack } from 'expo-router'

import { ThemedText } from '@/components/ThemedText'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import ReturnHome from '@/components/ReturnHome'
import { Image } from '@/components/Image'
```
We are importing individual components from frameworks such as ```View``` from ```react-native``` as well as in-house stuff like ```@/components/ReturnHome``` which is located locally at ```src/components/ReturnHome.tsx```!

### The meat of the page source

We see we have a function called Empty() that is defined as:
```javascript
export default function Empty()
```
For your page, rename Empty to something meaningful.
\
\
As for View, ParallaxScrollView, and Stack.Screen you really do not have to worry about this. You just have to know that:
- **View** is where most of your work on pages will be done
- **ParallaxScrollView** Allows us to have the pretty way of displaying the related page image at the top of the page content and have it change as we scroll up and down.
\
Within **ParallaxScrollView**, we have a way of doing the titlebar which is as follows:
```javascript
<ThemedText type='subtitle' className='border-b-[1px] text-center border-neutral-200 pb-2'>
                    {'Empty Page Test'}
                </ThemedText>
```
After the title bar, this is where the actual page content is.
\
\
We then close off with the bar at the bottom that contains the home button:
```javascript
<ReturnHome />
```
