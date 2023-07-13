import Link from 'next/link'
import homerImg from '@/public/homer.png'

export const Logo = () => {
    return (
        <Link href="/">
            <img src={homerImg.src} alt="pic" width={50} height={50}/>
        </Link>
    )
}
