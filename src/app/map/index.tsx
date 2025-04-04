import { useRef, useEffect, useCallback, useState } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Octicons from '@expo/vector-icons/Octicons'

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import Mapbox from '@rnmapbox/maps'

import { ThemedBottomSheet } from '@/components/ThemedBottomSheet'

import PointOfInterestCard from './components/PointOfInterestCard'
import PointOfInterestMarker from './components/PointOfInterestMarker'

import { useQuery } from '@tanstack/react-query'
import { QueryData } from '@supabase/supabase-js'
import useSupabase from '@/hooks/useSupabase'

const START_COORDINATES = [-122.467574, 37.629341]
const POI_MIN_ZOOM_RANGE = 18.21

Mapbox.setAccessToken('pk.eyJ1Ijoic2t5bGluZWdkZ29jIiwiYSI6ImNtNzRmaTk0YTAycmMycXB2NWZ1MjZpamcifQ.tzt5lPJ51rc4t_sEFGF0bQ')

interface ServiceHours {
  0: [ string, string ] | null,
  1: [ string, string ] | null,
  2: [ string, string ] | null,
  3: [ string, string ] | null,
  4: [ string, string ] | null,
  5: [ string, string ] | null,
  6: [ string, string ] | null
}

type Categories = 'Campus Services' | 'Recreational Area' | 'Events Area' | 'Study & Tutoring' | 'Uncategorized'

export interface PointOfInterest {
  id: string
  indoor_info?: {
      building: number
      floor: number
      room: string
  }
  name: string
  description: string
  category: Categories
  website_url?: string

  contact?: string
  hours?: ServiceHours
}

export default function Map() {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const cameraRef = useRef<Mapbox.Camera>(null)
  const mapRef = useRef<Mapbox.MapView>(null)

  const [ selectedPoi, setSelectedPoi ] = useState<PointOfInterest>()
  // const [ pressPoint, setPressPoint ] = useState<GeoJSON.Position>()
  const [ zoomLevel, setZoomLevel ] = useState(0)

  const handleSheetChanges = useCallback((index: number) => {
    //
  }, [])

  async function onCameraUpdated() {
    const newZoom = await mapRef.current?.getZoom()
    setZoomLevel(newZoom || zoomLevel)
  }

  function onPressMap() {
    // const geometry = e.geometry as GeoJSON.Point
    clearSelectedPoi()
    // setPressPoint(geometry.coordinates)
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
    // cameraRef.current?.setCamera({
    //   centerCoordinate: [pointOfInterest.latitude, pointOfInterest.longitude]
    // })
    setSelectedPoi(pointOfInterest)
  }



  const supabase = useSupabase()

  // poiQuery: fetches all point of informations
  const poisQueryFunction = supabase
      .from('map-pois')
      .select('*')

  const poiQuery = useQuery({ queryKey: ['map-pois'], queryFn: async () => {
      const { data } = await poisQueryFunction
      return data
  } })

  const [ queriedPois, setQueriedPois ] = useState<QueryData<typeof poisQueryFunction>>()

  useEffect(() => {
      if (poiQuery.isFetched && poiQuery.data) {
          // club query will return an array with the single club in it
          setQueriedPois(poiQuery.data)
      }
  }, [poiQuery])

  return (

    <GestureHandlerRootView className='flex-1 w-full h-full'>
      <View className='flex-1 w-full h-full'>
        <Mapbox.MapView
          ref={mapRef}

          styleURL='mapbox://styles/skylinegdgoc/cm74fwh3e008601rf5wdrhh04'
          style={{ flex: 1 }}

          compassEnabled
          compassViewMargins={{x: 4, y: 24}}
          logoEnabled={false}
          pitchEnabled={false}
          scaleBarEnabled={false}

          onCameraChanged={onCameraUpdated}
          onPress={onPressMap}
        >
          <Mapbox.Camera
            ref={cameraRef}
            zoomLevel={16.75}
            minZoomLevel={15}

            pitch={45}
            heading={0}
            animationMode='easeTo'
            // animationDuration={1200}

            defaultSettings={{ centerCoordinate: START_COORDINATES }}
            centerCoordinate={START_COORDINATES}
          />

          {((zoomLevel > POI_MIN_ZOOM_RANGE) && queriedPois) && queriedPois.map((feature, index) => (
            <Mapbox.MarkerView
              coordinate={[feature.latitude || 0, feature.longitude || 0]}
              allowOverlap={true}
              id={`pt-ann-${index}`}
              key={`pt-ann-${index}`}
            >
              <PointOfInterestMarker feature={feature} onPressed={onPoiPressed} />
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

        snapPoints={['10%', '35%']}
        handleComponent={() => <View className='rounded-t-2xl py-2'>
          <Octicons name='horizontal-rule' color={'#888'} size={16} className='mx-auto' />
        </View>}
      >
        {
          selectedPoi &&
          <BottomSheetView>
            <PointOfInterestCard
              id={selectedPoi.id}
              indoor_info={selectedPoi.indoor_info}
              name={selectedPoi.name}
              description={selectedPoi.description}
              category={selectedPoi.category}
              website_url={selectedPoi.website_url}
              contact={selectedPoi.contact}
              hours={selectedPoi.hours}
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
