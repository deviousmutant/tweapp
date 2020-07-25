import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import Hero from 'components/hero/TwoColumnWithVideo'
import AnimationRevealPage from "helpers/AnimationRevealPage.js"
import Subscribe from 'components/forms/SimpleSubscribeNewsletter'
import Featuring from 'components/cards/ThreeColContactDetails'
import Editions from 'components/cards/ThreeColSlider'
import Footer from 'components/footers/MiniCenteredFooter'

export default () => {
    const [edition, setEdition] = React.useState()

    React.useEffect(() => {
        axios.get("https://thepc.herokuapp.com/api/edition/", qs.stringify({})
        ).then(response => { setEdition(response.data) }
        ).catch(error => console.log(error))
    }, [])
    return (
        <AnimationRevealPage>
            <Hero />
            <Subscribe />
            <Featuring />
            <Editions editions={edition} />
            <Footer />
        </AnimationRevealPage>

    )
}