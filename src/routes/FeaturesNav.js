import React from 'react'
import PageHeader from "../components/website/PageHeader";
import Services from "../components/website/Services";
import ChoseUs from '../components/website/ChoseUs';
import Testimonial from '../components/website/Testimonial';

export default function FeaturesNav() {
    return (
        <>
            <PageHeader title="Features" readOnly />
            <Services />
            <ChoseUs />
            <Testimonial />
        </>
    )
}
