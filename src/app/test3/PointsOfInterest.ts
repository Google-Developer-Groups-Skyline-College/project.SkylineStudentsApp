export interface ServiceHours {
    0: [ number, number ] | null,
    1: [ number, number ] | null,
    2: [ number, number ] | null,
    3: [ number, number ] | null,
    4: [ number, number ] | null,
    5: [ number, number ] | null,
    6: [ number, number ] | null
}

type Categories = 'Campus Services' | 'Recreational Area' | 'Events Area' | 'Study & Tutoring' | 'Uncategorized'

export interface PointOfInterest {
    coordinates: [number, number]
    indoor_info?: {
        building: number
        floor: number
        room: string
    }
    name: string
    description: string
    category: Categories
    website: string

    contact?: string
    hours?: ServiceHours
    
    gallery: string[]
}

const pois: PointOfInterest[] = [
    { 
        coordinates: [-122.468329, 37.631876],
        indoor_info: { building: 19, floor: 1, room: '' },
        name: 'Promise Scholars',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.467898, 37.630089],
        indoor_info: { building: 6, floor: 1, room: '' },
        name: 'Public Safety',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.467925, 37.630438],
        indoor_info: { building: 6, floor: 2, room: '' },
        name: 'Upper Conference Rooms',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.467576, 37.62977],
        name: 'The Quad',
        description: '',
        category: 'Events Area',
        website: '',
        gallery: []
    },
    { 
        coordinates: [-122.468259, 37.629921],
        indoor_info: { building: 7, floor: 3, room: '309' },
        name: 'The MESA Center',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.467125, 37.630863],
        indoor_info: { building: 4, floor: 1, room: '' },
        name: 'The Salon and Spa',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.462565, 37.63019],
        name: 'Fitness Parkland',
        description: '',
        category: 'Recreational Area',
        website: '',
        gallery: []
    },
    { 
        coordinates: [-122.469687, 37.628641],
        indoor_info: { building: 5, floor: 1, room: '' },
        name: 'The Farallon Room',
        description: '',
        category: 'Events Area',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.463953, 37.630076],
        name: 'Baseball Field',
        description: '',
        category: 'Recreational Area',
        website: '',
        gallery: []
    },
    { 
        coordinates: [-122.466756, 37.630442],
        indoor_info: { building: 4, floor: 2, room: '' },
        name: 'Intercultural Center',
        description: '',
        category: 'Recreational Area',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.467729, 37.630137],
        indoor_info: { building: 6, floor: 1, room: '' },
        name: 'Sky Café',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.465578, 37.631333],
        name: 'Grass Field',
        description: '',
        category: 'Recreational Area',
        website: '',
        gallery: []
    },
    { 
        coordinates: [-122.466375, 37.630082],
        indoor_info: { building: 3, floor: 1, room: '' },
        name: 'Gymnasium',
        description: '',
        category: 'Recreational Area',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.4676, 37.629341],
        indoor_info: { building: 1, floor: 2, room: '' },
        name: 'The Theater',
        description: 'The Skyline College Theater is a premier large-scale event venue located on the Skyline College campus in San Bruno, California. The 500-seat auditorium regularly hosts dramatic performances, musical showcases, speaker series, summits, conferences, and more, including the College\'s yearly plays and musicals, and speakers such as Cornel West, Delores Huerta, and Angela Davis.',
        category: 'Events Area',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.467978, 37.632214],
        indoor_info: { building: 19, floor: 1, room: '' },
        name: 'Financial Aid Office',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.465123, 37.629814],
        name: 'Tennis Courts',
        description: '',
        category: 'Recreational Area',
        website: '',
        gallery: []
    },
    { 
        coordinates: [-122.467716, 37.629976],
        indoor_info: { building: 6, floor: 1, room: '' },
        name: 'Fireside Dining Room',
        description: '',
        category: 'Recreational Area',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.467048, 37.629167],
        indoor_info: { building: 1, floor: 2, room: '' },
        name: 'Dream Center',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.469095, 37.631217],
        indoor_info: { building: 14, floor: 1, room: '' },
        name: 'Loma Chica Child Development Center',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.466491, 37.630511],
        indoor_info: { building: 4, floor: 3, room: '' },
        name: 'Admin',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.46822, 37.629759],
        indoor_info: { building: 7, floor: 3, room: '307' },
        name: 'The STEM Center',
        description: 'The Skyline College STEM Center brings together academic and student support services for students taking science, technology, engineering and math courses.',
        category: 'Study & Tutoring',
        website: 'https://skylinecollege.edu/stemcenter/',

        contact: '',
        hours: {
            0: null,
            1: [ 9, 17 ],
            2: [ 9, 17 ],
            3: [ 9, 17 ],
            4: [ 0, 17 ],
            5: [ 9, 14 ],
            6: null
        },
        gallery: []
    },
    { 
        coordinates: [-122.468196, 37.631946],
        indoor_info: { building: 19, floor: 1, room: '' },
        name: 'TRiO',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.464587, 37.630822],
        name: 'Upper Soccer Field',
        description: '',
        category: 'Recreational Area',
        website: '',
        gallery: []
    },
    { 
        coordinates: [-122.463039, 37.630908],
        name: 'Lower Synthetic Field and Track',
        description: '',
        category: 'Recreational Area',
        website: '',
        gallery: []
    },
    { 
        coordinates: [-122.468656, 37.632477],
        indoor_info: { building: 19, floor: 1, room: '' },
        name: 'U.S Passport Office',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.468461, 37.632196],
        indoor_info: { building: 19, floor: 1, room: '' },
        name: 'Middle College',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.466943, 37.630851],
        indoor_info: { building: 4, floor: 2, room: '' },
        name: 'Barbering/Cosmetology',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
    { 
        coordinates: [-122.468059, 37.632023],
        indoor_info: { building: 19, floor: 1, room: '' },
        name: 'Admissions & Records',
        description: '',
        category: 'Campus Services',
        website: '',

        contact: '',
        hours: {
            0: [ 0, 0 ],
            1: [ 0, 0 ],
            2: [ 0, 0 ],
            3: [ 0, 0 ],
            4: [ 0, 0 ],
            5: [ 0, 0 ],
            6: [ 0, 0 ]
        },
        gallery: []
    },
]

export default pois