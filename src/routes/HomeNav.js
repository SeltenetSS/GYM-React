import React from 'react'
import Banner from '../components/website/Banner';
import GymClass from '../components/website/GymClass';
import About from '../components/website/About';
import ChoseUs from '../components/website/ChoseUs';
import Team from '../components/website/Team';
import Subscribe from '../components/website/Subscribe';
import MonthlyPlan from '../components/website/MonthlyPlan';
import BMI from '../components/website/BMI';
import Testimonial from '../components/website/Testimonial';


export default function HomeNav() {
    return (
        <>
            <Banner />
            <GymClass />
            <About />
            <ChoseUs />
            <Team />
            <Subscribe />
            <MonthlyPlan />
            <BMI />
            <Testimonial />
        </>
    )
}
