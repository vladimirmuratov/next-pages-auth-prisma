import 'swiper/css'
import {useEffect, useState} from 'react'
import {Box} from '@chakra-ui/react'
import {register} from 'swiper/element/bundle'
import pic1 from '/public/images/pic1.jpg'
import pic2 from '/public/images/pic2.jpg'
import pic3 from '/public/images/pic3.jpg'
import pic4 from '/public/images/pic4.jpg'
import pic5 from '/public/images/pic5.jpg'
import pic6 from '/public/images/pic6.jpg'


export const Slider = () => {
    const [images, setImages] = useState([])

    useEffect(() => {
        setImages([pic1, pic2, pic3, pic4, pic5, pic6])
        register()
    }, [])

    return (
        <Box h={{base: "170px", md: "500px"}}>
            <swiper-container
                autoplay={true}
                style={{height: '100%'}}
                loop="true"
                slides-per-view="1"
                navigation={true}
                pagination={true}
            >
                {images.length
                    ? images.map((pic) => (
                        <swiper-slide key={pic.src}>
                            <img src={pic.src} alt="pic"/>
                        </swiper-slide>))
                    : <></>
                }
                <swiper-button-prev></swiper-button-prev>
                <swiper-button-next></swiper-button-next>
            </swiper-container>
        </Box>
    )
}
