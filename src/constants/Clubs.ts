// TODO - Club infos
// Add links to socials, site, YT, etc
// Add email contact
// FAQs?
// Officers?

import { ImageSourcePropType } from 'react-native'
import { Tags } from './Tags'

interface ClubsProps {
  [key: string]: {
    description: string,
    backdropImg: ImageSourcePropType,
    logoImg: ImageSourcePropType,
    meetingLocation: string,
    meetingTime: string,
    tags: Array<string>
  }
}

export const Clubs: ClubsProps = {
  'GDGoC Skyline College': {
    description: `🌴 Welcome! We are a Google Developer Groups on Campus chapter and the official Computer Science Club at Skyline College. We're a STEM community at a California community college located in San Bruno. We pioneer student growth in software development, through events like hackathons, and by building a strong platform for student growth in the large world of computer science.`,
    backdropImg: require('$/images/clubs/photos/computer_science_club/backdrop.png'),
    logoImg: require('$/images/clubs/logos/computer_science_club.png'),
    meetingLocation: 'Building 7, Room 7-324',
    meetingTime: '1:10 PM - 2:00 PM',
    tags: [Tags.STEM],
  },
  'Data Science Club': {
    description: 'The also best club highkey',
    backdropImg: require('$/images/clubs/photos/data_science_club/backdrop.png'),
    logoImg: require('$/images/clubs/logos/data_science_club.png'),
    meetingLocation: 'Building 7, Room 7-324',
    meetingTime: '12:00 PM - 1:00 PM',
    tags: [Tags.STEM],
  },
  'Engineering Robotics Club': {
    description: 'The also best club highkey',
    backdropImg: require('$/images/clubs/photos/engineering_robotics_club/backdrop.jpg'),
    logoImg: require('$/images/clubs/logos/engineering_robotics_club.webp'),
    meetingLocation: 'Building 7, The Fab Lab',
    meetingTime: '1:00 PM - 2:00 PM',
    tags: [Tags.STEM],
  },
  'Photography Club': {
    description: 'The also best club highkey',
    backdropImg: require('$/images/clubs/photos/photography_club/backdrop.jpg'),
    logoImg: require('$/images/clubs/logos/photography_club.webp'),
    meetingLocation: 'Building 1, Room 322',
    meetingTime: '3:00 PM - 5:00 PM',
    tags: [Tags.HOBBY],
  },
  'Filipino Student Union': {
    description: 'The also best club highkey',
    backdropImg: require('$/images/clubs/photos/filipino_student_union/backdrop.jpg'),
    logoImg: require('$/images/clubs/logos/filipino_student_union.webp'),
    meetingLocation: 'Building 4, The Intercultural Center',
    meetingTime: '3:00 PM - 5:00 PM',
    tags: [Tags.CULTURAL],
  },
  'Physics Astronomy Club': {
    description: 'The also best club highkey',
    backdropImg: require('$/images/clubs/photos/physics_astronomy_club/backdrop.jpg'),
    logoImg: require('$/images/clubs/logos/physics_astronomy_club.webp'),
    meetingLocation: 'Building 4, The Intercultural Center',
    meetingTime: '3:00 PM - 5:00 PM',
    tags: [Tags.STEM],
  },
  'Honors Club': {
    description: 'The also best club highkey',
    backdropImg: require('$/images/clubs/photos/honors_club/backdrop.jpg'),
    logoImg: require('$/images/clubs/logos/honors_club.png'),
    meetingLocation: 'Building 4, The Intercultural Center',
    meetingTime: '3:00 PM - 5:00 PM',
    tags: [],
  },
}