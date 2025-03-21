import { useRef, useEffect, useCallback, useState } from 'react'
import { Pressable, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { FontAwesome } from '@expo/vector-icons'
import Mapbox from '@rnmapbox/maps'

import ThemedBottomSheet from '@/components/ThemedBottomSheet'
import ThemedView from '@/components/ThemedView'
import ThemedText from '@/components/ThemedText'
import PointOfInterestCard from './components/PointOfInterestCard'

import pois, { PointOfInterest } from './PointsOfInterest'

const START_COORDINATES = [-122.467574, 37.629341]
const POI_MIN_ZOOM_RANGE = 18.21

Mapbox.setAccessToken('pk.eyJ1Ijoic2t5bGluZWdkZ29jIiwiYSI6ImNtNzRmaTk0YTAycmMycXB2NWZ1MjZpamcifQ.tzt5lPJ51rc4t_sEFGF0bQ')

export default function Map() {
  const bottomSheetRef = useRef<BottomSheet>(null)
  // const cameraRef = useRef<Mapbox.Camera>(null)
  const mapRef = useRef<Mapbox.MapView>(null)

  const [ selectedPoi, setSelectedPoi ] = useState<PointOfInterest>()
  // const [ pressPoint, setPressPoint ] = useState<GeoJSON.Position>()
  const [ zoomLevel, setZoomLevel ] = useState(0)

  const handleSheetChanges = useCallback((index: number) => {
    //
  }, [])

  const onPressMap = () => {
    // const geometry = e.geometry as GeoJSON.Point
    clearSelectedPoi()
    // setPressPoint(geometry.coordinates)
  }

  async function changed() {
    const newZoom = await mapRef.current?.getZoom()
    setZoomLevel(newZoom || zoomLevel)
  }

  function clearSelectedPoi() {
    if (selectedPoi) {
      // console.log(bottomSheetRef.current)
      bottomSheetRef.current?.close()
      setSelectedPoi(undefined)
    }
  }

  function onPoiPressed(pointOfInterest: PointOfInterest) {
    bottomSheetRef.current?.expand()
    setSelectedPoi(pointOfInterest)
  }

  // useEffect(() => {
  //   camera.current?.setCamera({
  //     centerCoordinate: [0, 0]
  //   })
  // }, [])

  return (

    <GestureHandlerRootView className='flex-1 w-full h-full'>

      <View className='flex-1 w-full h-full'>
        <Mapbox.MapView
          styleURL='mapbox://styles/skylinegdgoc/cm74fwh3e008601rf5wdrhh04'
          style={{ flex: 1 }}

          compassEnabled
          compassViewMargins={{x: 4, y: 24}}
          logoEnabled={false}
          pitchEnabled={false}
          scaleBarEnabled={false}

          onCameraChanged={changed}
          onPress={onPressMap}
          ref={mapRef}
        >
          <Mapbox.Camera
            // ref={cameraRef}
            zoomLevel={16.75}
            minZoomLevel={15}

            pitch={45}
            heading={0}
            animationMode='easeTo'

            defaultSettings={{ centerCoordinate: START_COORDINATES }}
            centerCoordinate={START_COORDINATES}
          />

          {(zoomLevel > POI_MIN_ZOOM_RANGE) && pois.map((feature, index) => (
            <Mapbox.MarkerView
              coordinate={feature.coordinates}
              allowOverlap={false}
              id={`pt-ann-${index}`}
              key={`pt-ann-${index}`}
            >

              <Pressable className='active:opacity-50' onPress={() => {onPoiPressed(feature)}}>
                <ThemedView darkColor='bg-neutral-900/75' lightColor='bg-white/75' className='px-2 py-1 rounded-xl'>
                  <ThemedText>{feature.name}</ThemedText>
                </ThemedView>
              </Pressable>

            </Mapbox.MarkerView>
          ))}
          <Mapbox.LocationPuck />
        </Mapbox.MapView>
      </View>

      <ThemedBottomSheet
        ref={bottomSheetRef}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.00,

          elevation: 24,
        }}

        onChange={handleSheetChanges}
        onClose={clearSelectedPoi}

        enablePanDownToClose
        index={2}

        snapPoints={['10%', '30%']}
        handleComponent={() => <View className='rounded-t-2xl py-2'>
          <FontAwesome name='chevron-up' color={'white'} className='mx-auto' />
        </View>}
      >
        {
          selectedPoi &&
          <BottomSheetView>
            <PointOfInterestCard
              coordinates={selectedPoi.coordinates}
              indoor_info={selectedPoi.indoor_info}
              name={selectedPoi.name}
              description={selectedPoi.description}
              category={selectedPoi.category}
              website={selectedPoi.website}
              contact={selectedPoi.contact}
              hours={selectedPoi.hours}
              gallery={selectedPoi.gallery}
            />
          </BottomSheetView>
        }
      </ThemedBottomSheet>

      {/* <ThemedText className='absolute w-full h-10 bg-black text-center'>{zoomLevel}</ThemedText> */}

    </GestureHandlerRootView>

  )
}

// <Mapbox.ShapeSource id="routeFill" shape={{type: 'FeatureCollection', features: features}}>
//             <Mapbox.CircleLayer
//               id={"linelayer1"}
//               style={{
//                 lineJoin: "round",
//                 lineColor: "#900000",
//                 lineWidth: 5,
//                 lineCap: "round",
//               }}
//             />

//           </Mapbox.ShapeSource>
