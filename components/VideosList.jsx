import {Grid, GridItem} from '@chakra-ui/react'

export const VideosList = ({videos = []}) => {

    return (
        <Grid
            py={5}
            templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}}
            gap={{base: 1}}
        >
            {videos.map((v) => (
                <GridItem key={v.id} justifySelf="center">
                    <iframe src={`https://www.youtube.com/embed/${v.url}`}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="video"
                    />
                </GridItem>
            ))}
        </Grid>
    )
}
