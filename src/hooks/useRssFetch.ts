import { useEffect, useState } from 'react'
import { decode } from 'he'

import { XMLParser } from 'fast-xml-parser'

export function stripXML(text: string) {
    // removes XML tags, extra space between words (leaves max one space between words), and trims whitespace
    return text.replace(/<\/?[^>]+(>|$)/g, '').replace(/\s+/g, ' ').trim()
}

interface RssData<RssItemTemplate> {
    channel: {
        title: string
        description: string
        link: string
        language: string
        item: RssItemTemplate[]
    }
}

export default function useRssFetch<RssItemTemplate>(endpoint: string) {

    const [ rss, setRss ] = useState<RssData<RssItemTemplate>>()

    useEffect(() => {
        const fetchData = async () => {
            fetch(endpoint).then(async (response) => {
                const textResponse = await response.text()

                const parser = new XMLParser({
                    tagValueProcessor: (_, val) => decode(val),
                })
    
                setRss(parser.parse(textResponse).rss)
            }).catch((err) => {
                console.log(err)
            })
        }

        fetchData()
    }, [endpoint])

    return rss
}
