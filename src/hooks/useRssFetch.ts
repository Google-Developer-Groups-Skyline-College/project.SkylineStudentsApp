import { decode } from 'he'

import { XMLParser } from 'fast-xml-parser'

import { useQuery } from '@tanstack/react-query'

export function extractImages(text: string) {
    // removes XML tags, extra space between words (leaves max one space between words), and trims whitespace in that order
    return text.match(/<img[^>]+src="([^">]+)"/)
}

export function sanitizeXml(text: string) {
    // removes XML tags, extra space between words (leaves max one space between words), and trims whitespace in that order
    return text.replace(/<\/?[^>]+(>|$)/g, '').replace(/\s+/g, ' ').trim()
}

interface RssData<RssItemStructure> {
    channel: {
        title: string
        description: string
        link: string
        language: string
        item: RssItemStructure[]
    }
}

const xmlParser = new XMLParser({
    tagValueProcessor: (_, val) => decode(val)
})

export default function useRssFetch<RssItemStructure>(endpoint: string) {

    const fetchData = async () => {
        const response = await fetch(endpoint)
        if (response.ok) {
            return xmlParser.parse(await response.text()).rss
        }
        return { channel: { title: '', description: '', link: '', language: '', item: [] } }
    }

    const { data } = useQuery({ queryKey: [endpoint], queryFn: async () => {
        return await fetchData() as RssData<RssItemStructure>
    }})

    return data
}


// export default function useRssFetch<RssItemStructure>(endpoint: string) {

//     const [ rss, setRss ] = useState<RssData<RssItemStructure>>()

//     useEffect(() => {
//         const fetchData = async () => {
//             fetch(endpoint).then(async (response) => {
//                 const textResponse = await response.text()
//                 setRss(parser.parse(textResponse).rss)
//             }).catch((err) => {
//                 console.warn('⚠️ Failed to fetch RSS data from endpoint: ' + endpoint)
//                 console.warn(err)
//             })
//         }

//         fetchData()
//     }, [endpoint])

//     return rss
// }
