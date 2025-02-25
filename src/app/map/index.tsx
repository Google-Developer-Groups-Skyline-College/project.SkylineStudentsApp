import React, { useRef, useState, useEffect } from 'react';
// import MapView, { PROVIDER_GOOGLE, MAP_TYPES, Marker } from 'react-native-maps';
import { Text, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Image as ExpoImage } from 'expo-image'

const CAMERA_START = {
    center: {
        latitude: 37.62976867594795,
        longitude: -122.46756161476384,
    },
    heading: 327.3,
    pitch: 0,
    zoom: 18,
}

const CAMERA_ZOOM_RANGE = {
    maxCenterCoordinateDistance: 5,
}

const POINTS_OF_INTEREST = [
    {
        title:'The Skyline College Quad',
        description: 'The central events area of Skyline College. 🥳',
        coordinates: {
            latitude: 37.62976867594795,
            longitude: -122.46756161476384,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }
    },
    {
        title:'Building 6 - "The Fireside Dining Room"',
        description: 'Food Services area for Sky Café, World Cup Coffee & Tea. ☕',
        coordinates: {
            latitude: 37.62996827033055,
            longitude: -122.46771287637672,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }
    },
    {
        title:'The STEM Center (Building 7, Third Floor)',
        description: 'An open tutoring and study area for STEM Classes',
        coordinates: {
            latitude: 37.62980505771402,
            longitude: -122.46830272425905,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }
    }
]

export default function Map() {
    const mapRef = useRef<MapView>(null);

    const [ currentMargin, setCurrentMargin ] = useState(1);

    useEffect(() => {
        setTimeout(() => {
            setCurrentMargin(0);
        }, 1000);
    }, []);

    const postLayout = () => {
        mapRef.current?.animateCamera({center: {
            latitude: 37.62976867594795,
            longitude: -122.46756161476384,
        }, pitch: 45, heading: 20,altitude: 200, zoom: 40}, {duration: 500});
    }

    return (

        <View className='flex-1'>
            {/* <MapView
                style={{ marginBottom: currentMargin, ...StyleSheet.absoluteFillObject }}
                provider={PROVIDER_GOOGLE}
                mapType={MAP_TYPES.HYBRID}
                initialCamera={CAMERA_START}
                cameraZoomRange={CAMERA_ZOOM_RANGE}

                pitchEnabled

                showsIndoors
                showsIndoorLevelPicker
                showsBuildings
                showsUserLocation
                showsMyLocationButton
                followsUserLocation
                showsCompass={false}

                onPress={postLayout}

                loadingEnabled

                ref={mapRef}
                className='absolute w-full h-full'
            >
                {POINTS_OF_INTEREST.map((marker, index) => (
                    <Marker title={marker.title} description={marker.description} key={index} coordinate={marker.coordinates}></Marker>
                ))}
            </MapView> */}
            <ThemedView className='absolute bottom-0 w-full rounded-t-3xl flex-col justify-start items-center p-4 gap-4'>
                <ThemedText type='subtitle'>The STEM Center</ThemedText>
                <ThemedText className='text-center'>The Skyline College STEM Center brings together academic and student support services for students taking science, technology, engineering and math courses.</ThemedText>
                <View className='w-full h-32'>
                    <ExpoImage source={require('$/images/bobaSocial.jpg')} style={{ width: '100%', height: '100%' }} />
                </View>
            </ThemedView>
        </View>

    );
}
