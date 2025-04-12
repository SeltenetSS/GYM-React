import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function MonthlyPlan() {
    return (
        <section id="section7" className="mb-4 pt-3">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center my-5">
                        <h6 className='my-3 fw-bold'>OUR PLAN</h6>
                        <h2 className='display-6'>CHOOSE YOUR PRICING PLAN</h2>
                    </div>
                </div>

                <div className="row justify-content-center">
                
                
                    <div className="col-lg-3 col-md-6">
                        <div className="ps-item text-center mb-4">
                            <h3 className='mb-4'>Muscle Builder</h3>
                            <div className="pi-price mb-4">
                                <h2>$ 49.99</h2>
                                <span>3 Months</span>
                            </div>
                            <ul className="list-group mb-4">
                                <li>Intensive muscle-building program</li>
                                <li>For intermediate to advanced fitness levels</li>
                                <li>Build strength and muscle mass</li>
                                <li>Guided workout plans</li>
                                <li>Nutrition support</li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="ps-item text-center mb-4">
                            <h3 className='mb-4'>Balance Body</h3>
                            <div className="pi-price mb-4">
                                <h2>$ 39.99</h2>
                                <span>2 Months</span>
                            </div>
                            <ul className="list-group mb-4">
                                <li>Full-body balance and stability program</li>
                                <li>Focus on posture and flexibility</li>
                                <li>Core strength improvement</li>
                                <li>Guided stability exercises</li>
                                <li>Weekly progress check-ins</li>
                            </ul>
                        </div>
                    </div>

           
                    <div className="col-lg-3 col-md-6">
                        <div className="ps-item text-center mb-4">
                            <h3 className='mb-4'>Fit Burn</h3>
                            <div className="pi-price mb-4">
                                <h2>$ 59.99</h2>
                                <span>3 Months</span>
                            </div>
                            <ul className="list-group mb-4">
                                <li>Fat-burning program</li>
                                <li>Boost metabolism and endurance</li>
                                <li>Cardio-focused workouts</li>
                                <li>Designed for weight loss</li>
                                <li>Nutrition and workout plans</li>
                            </ul>
                        </div>
                    </div>

               
                    <div className="col-lg-3 col-md-6">
                        <div className="ps-item text-center mb-4">
                            <h3 className='mb-4'>Health Reset</h3>
                            <div className="pi-price mb-4">
                                <h2>$ 79.99</h2>
                                <span>2 Months</span>
                            </div>
                            <ul className="list-group mb-4">
                                <li>Wellness-focused program</li>
                                <li>Restores physical and mental balance</li>
                                <li>Helps reduce stress</li>
                                <li>Promotes overall wellness</li>
                                <li>Guided wellness exercises</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
