// TODO - Club infos
// Add links to socials, site, YT, etc
// Add email contact
// FAQs?
// Officers?

import { ImageSourcePropType } from 'react-native'
import { Tags } from './Tags'

import { Searchables } from '@/components/SearchBar'

export type ClubDetails = Searchables & {
  [key: string]: {
    description: string,
    backdropImg: ImageSourcePropType,
    logoImg: ImageSourcePropType,
    contact: string,
    website: string,
    instagram: string,
    discord: string,
    meetingLocation: string,
    meetingTime: string,
    joinLink: string,
  }
}

export const Clubs: ClubDetails = {
  'GDGoC Skyline College': {
    description: `🌴 Welcome! We are a Google Developer Groups on Campus chapter and the official Computer Science Club at Skyline College. 🚀 We pioneer student growth in software development, through events like hackathons, and by building a strong platform for student growth in the large world of computer science.`,
    backdropImg: require('$/images/clubs/photos/computer_science_club/backdrop.png'),
    logoImg: require('$/images/clubs/logos/computer_science_club.png'),
    contact: 'contact@skycs.club',
    website: 'https://skycs.club',
    instagram: 'https://www.instagram.com/skylinecsc',
    discord: 'https://discord.gg/z5P9kccwRh',
    meetingLocation: 'Building 7, Room 7-324',
    meetingTime: '1:10 PM - 2:00 PM, Fri',
    joinLink: 'https://www.google.com',
    aliases: ['google', 'chapter', 'campus'],
    tags: [Tags.STEM],
  },
  'Data Science Club': {
    description: `📊 The Data Science Club is a community-led platform for students at Skyline College, providing a catalyst for career development, collaborative networking, and applying real-world data science skills through projects.`,
    backdropImg: require('$/images/clubs/photos/data_science_club/backdrop.png'),
    logoImg: require('$/images/clubs/logos/data_science_club.png'),
    contact: 'humd@smccd.edu',
    website: 'https://google.com',
    instagram: 'https://www.instagram.com/datascience_skyline',
    discord: 'https://discord.gg/YcryEdk8H5',
    meetingLocation: 'Building 7, Room 7-324',
    meetingTime: '12:00 PM - 1:00 PM, Fri',
    joinLink: 'https://www.google.com',
    tags: [Tags.STEM],
  },
  'Engineering Robotics Club': {
    description: 'Engineering excellence and embracing innovation one creation at a time. An inclusive community where future engineers are able to develop and collaborate through autonomous projects.',
    backdropImg: require('$/images/clubs/photos/engineering_robotics_club/backdrop.jpg'),
    logoImg: require('$/images/clubs/logos/engineering_robotics_club.webp'),
    contact: 'skyengineeringandroboticsclub@smccd.edu',
    website: 'https://google.com',
    instagram: '',
    discord: 'https://discord.gg/FJrrRHmsYC',
    meetingLocation: 'Building 7, The Fab Lab',
    meetingTime: '1:00 PM - 2:00 PMm, Fri',
    joinLink: 'https://www.google.com',
    tags: [Tags.STEM],
  },
  'Photography Club': {
    description: 'The also best club highkey',
    backdropImg: require('$/images/clubs/photos/photography_club/backdrop.jpg'),
    logoImg: require('$/images/clubs/logos/photography_club.webp'),
    contact: 'takayama@smccd.edu',
    website: 'https://google.com',
    instagram: '',
    discord: 'https://discord.gg/petKSpD8x2',
    meetingLocation: 'Building 1, Room 322',
    meetingTime: '3:00 PM - 5:00 PM, Thur',
    joinLink: 'https://www.google.com',
    aliases: ['video'],
    tags: [Tags.HOBBY],
  },
  'Filipino Student Union': {
    description: 'Organization established for students interested in learning more about Filipino culture and heritage and sharing this information with the community.',
    backdropImg: require('$/images/clubs/photos/filipino_student_union/backdrop.jpg'),
    logoImg: require('$/images/clubs/logos/filipino_student_union.webp'),
    contact: 'erpelol@my.smccd.edu',
    website: 'https://google.com',
    instagram: '',
    discord: 'https://discord.gg/ntJ4QHuT9t',
    meetingLocation: 'Building 4, The Intercultural Center',
    meetingTime: '3:00 PM - 5:00 PM',
    joinLink: 'https://www.google.com',
    tags: [Tags.CULTURAL],
  },
  'Physics Astronomy Club': {
    description: 'Student organization that promotes interest in physics and astronomy. Often host events like observatory star parties, field trips, and other seminars.',
    backdropImg: require('$/images/clubs/photos/physics_astronomy_club/backdrop.jpg'),
    logoImg: require('$/images/clubs/logos/physics_astronomy_club.webp'),
    contact: 'skylineastronomyclub@my.smccd.edu',
    website: 'https://google.com',
    instagram: '',
    discord: '',
    meetingLocation: 'Building 7, The Fab Lab',
    meetingTime: '3:00 PM - 5:00 PM',
    joinLink: 'https://www.google.com',
    tags: [Tags.STEM],
  },
  'Honors Club': {
    description: 'The Honors Transfer Club seeks to reflect the ideals and standards that the Honors Transfer Program emphasizes and to support its main mission of providing an academically rigorous learning environment for highly motivated students seeking challenge and preparation for the 4-year institution.',
    backdropImg: require('$/images/clubs/photos/honors_club/backdrop.jpg'),
    logoImg: require('$/images/clubs/logos/honors_club.png'),
    contact: '	honorsclubskylinecollege@gmail.com',
    website: 'https://google.com',
    instagram: '',
    discord: '',
    meetingLocation: 'Building 8, Room 8-324',
    meetingTime: '3:00 PM - 5:00 PM',
    joinLink: 'https://www.google.com',
    tags: [],
  },
}