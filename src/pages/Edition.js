import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import Hero from 'components/hero/BackgroundAsImageWithCenteredContent'
import AnimationRevealPage from "helpers/AnimationRevealPage.js"
import News from 'components/blogs/ThreeColSimpleWithImage'
import Ed from 'components/blogs/GridWithFeaturedPost'
import HumansOfVIT from 'components/hero/BackgroundAsImage'
import Footer from 'components/footers/MiniCenteredFooter'


export default () => {
    const { number } = useParams()
    const [Loading, setLoading] = React.useState(true)
    const [edition, setEdition] = React.useState({})

    React.useEffect(() => {
        axios.get("https://thepc.herokuapp.com/api/edition/" + number, qs.stringify({})
        ).then(response => {
            setLoading(false)
            setEdition(response.data)
        }).catch(error => console.log(error))
    }, [])
    return (
        <>
            {Loading === true ? <AnimationRevealPage><h1>Loading ...</h1></AnimationRevealPage> :
                <AnimationRevealPage>
                    <Hero title={edition.ename} number={edition.enumber} />
                    <News editionObj={edition.articles} enumber={edition.enumber} />
                    <Ed posts={edition.articles} enumber={edition.enumber} />
                    <HumansOfVIT hov={edition.hov} />
                    <Footer />
                </AnimationRevealPage>
            }
        </>

    )
}