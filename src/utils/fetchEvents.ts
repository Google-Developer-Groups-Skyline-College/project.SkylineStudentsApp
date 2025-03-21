import * as rssParser from 'react-native-rss-parser';

// import { parseString } from 'react-native-xml2js';

export interface SkylineEvent {
  title: string;
  date: string;
  description: string;
  location: string;
  link: string;
  image?: string;
  time: string;
  building?: string;
}

export const fetchSkylineEvents = async (): Promise<SkylineEvent[]> => {
  try {
    const response = await fetch('https://events.skylinecollege.edu/live/rss/events/group/District%20Academic%20Calendar/group/Districtwide%20Events/group/Skyline%20Athletics/group/Skyline%20College/group/Skyline%20Transfer%20Center/group/Skyline%20College/header/Skyline%20College%20Events');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const responseText = await response.text();
    const rss = await rssParser.parse(responseText);
    
    const events: SkylineEvent[] = rss.items
      .slice(0, 8)
      .map(item => {
        // Get full description and clean it up
        const fullDescription = item.description
          .replace(/<[^>]*>/g, '')  // Remove HTML tags
          .replace(/&nbsp;/g, ' ')   // Replace HTML entities
          .replace(/\[\s*map\s*\]/gi, '') // Remove [map] text
          .split(/\n/)
          .map(part => part.trim())
          .filter(part => part.length > 0);

        // Extract time pattern
        const timePattern = /\d{1,2}:\d{2}(?:am|pm)\s*-\s*\d{1,2}:\d{2}(?:am|pm)(?:\s*Weekly\s*(?:\(.*?\))?)?/i;
        const timeMatch = item.title.match(timePattern) || 
        fullDescription.find(part => timePattern.test(part))?.match(timePattern);
        const time = timeMatch ? timeMatch[0] : '';

        // Extract location and building
        const locationLine = fullDescription
          .find(part => part.includes('Building') || part.includes('Bldg') || part.includes('Room'));
        
        let building = undefined;
        let location = '';
        
        if (locationLine) {
          const buildingMatch = locationLine.match(/(?:Building|Bldg\.?)\s*(\d+(?:\s*-\s*\d+)?(?:\s*Room\s*\d+)?)/i);
          building = buildingMatch ? buildingMatch[0] : undefined;
          location = locationLine.replace(building || '', '').trim();
        }

        // Get full description without location and time info
        const descriptionText = fullDescription
          .filter(part => 
            !timePattern.test(part) &&
            part !== locationLine &&
            !part.includes('Event Thumbnail')
          )
          .join('\n')
          .trim();

        // Enhanced image extraction
        let image = undefined;
        const imageMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
        if (imageMatch) {
          const baseImageUrl = imageMatch[1].split('?')[0];
          image = baseImageUrl.startsWith('http:') 
            ? baseImageUrl.replace('http:', 'https:')
            : baseImageUrl;
        }

        // Clean up title
        const cleanTitle = item.title.replace(timePattern, '').trim();

        return {
          title: cleanTitle,
          date: item.published,
          description: descriptionText,
          location: location || locationLine || '',
          link: item.links[0]?.url || '',
          image,
          time,
          building
        };
      });
    
    return events;
  } catch (error) {
    console.error('Error fetching Skyline events:', error);
    return [];
  }
};

// Helper function to extract image from description
function extractImageFromDescription(description: string): string | undefined {
  const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : undefined;
}

// // In your explore.tsx, modify the useEffect to use this function
// useEffect(() => {
//   const loadEvents = async () => {
//     try {
//       setIsLoading(true);
//       const fetchedEvents = await fetchSkylineEvents();
//       setEvents(fetchedEvents);
//     } catch (error) {
//       console.error('Failed to fetch events:', error);
//       Alert.alert('Error', 'Could not load events');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   loadEvents();
// }, []); 