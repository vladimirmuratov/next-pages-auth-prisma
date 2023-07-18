import {Grid, GridItem, Heading, Skeleton} from '@chakra-ui/react'
import {VideoItem} from '@/components/VideoItem'

export const VideosList = ({videos = [], onDelete, isLoading = false}) => {

    return (
        <Grid
            py={5}
            templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}}
            gap={{base: 1, md: 5}}
        >
            {(!isLoading && videos.length)
                ? videos.map((v) => (
                    <GridItem key={v.id} justifySelf="center">
                        <VideoItem {...v} onDelete={onDelete}/>
                    </GridItem>))
                : isLoading
                    ? (<>
                        <GridItem>
                            <Skeleton height="150px"></Skeleton>
                        </GridItem>
                        <GridItem>
                            <Skeleton height="150px"></Skeleton>
                        </GridItem>
                        <GridItem display={{md: 'none', lg: 'block'}}>
                            <Skeleton height="150px"></Skeleton>
                        </GridItem>
                    </>)
                    : <Heading>Videos not found</Heading>
            }
        </Grid>
    )
}
