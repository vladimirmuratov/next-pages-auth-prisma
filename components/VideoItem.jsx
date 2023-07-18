import {Box, CloseButton} from '@chakra-ui/react'

export const VideoItem = ({id, url, onDelete}) => {
    return(
        <Box position="relative">
            <CloseButton onClick={() => onDelete(id)} position="absolute" color="white" right={0}/>
            <iframe src={`https://www.youtube.com/embed/${url}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="video"
            />
        </Box>
    )
}
