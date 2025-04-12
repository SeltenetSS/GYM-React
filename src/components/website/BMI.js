

import React, { useState } from 'react';
import axios from 'axios';

export default function BMI() {
    const [myStyle, setMyStyle] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [suggestedPackage, setSuggestedPackage] = useState('');

    const WeightVal = (event) => {
        setWeight(event.target.value);
    };

    const HeightVal = (event) => {
        setHeight(event.target.value);
    };

    const calculateBmi = async () => {
        if (weight && height) {
            const userData = {
                WeightKg: parseFloat(weight),
                HeightCm: parseFloat(height),
            };
    
            try {
                const response = await axios.post('https://localhost:7054/api/Package/suggest-package', userData);
                console.log(response.data); 
    
                const { calculatedBmi, suggestedPackage } = response.data;
    
                if (calculatedBmi !== undefined) {
                    setMyStyle(`Your BMI value: ${calculatedBmi}`);
                } else {
                    setMyStyle('An error occurred while calculating BMI.');
                }
    
                
                if (suggestedPackage && suggestedPackage.packageName) {
                    setSuggestedPackage(suggestedPackage.packageName);
                } else {
                    setSuggestedPackage('No packages offered');
                }
            } catch (error) {
                console.error("Error when calculating BMI:", error);
                setMyStyle('An error occurred while calculating BMI.');
            }
        } else {
            setMyStyle('Please enter the correct weight and height..');
        }
    };
    

    return (
        <div className="container-fluid-lg position-relative bmi my-5">
            <div className="container-lg">
                <div className="row px-lg-3 align-items-center mt-5">
                    <div className="col-md-6">
                        <div className="pe-md-3 d-none d-md-block">
                            <h4 className="text-primary">Body Mass Index</h4>
                            <h4 className="display-4 text-white fw-bold mb-4">What is BMI?</h4>
                            <p className="m-0 text-white">Lorem ipsum...</p>
                        </div>
                    </div>
                    <div className="col-md-6 bg-secondary py-5">
                        <div className="py-md-5 px-3">
                            <h1 className="mb-4 text-white text-center text-md-start">Calculate Your BMI</h1>
                            <form>
                                <div className="row">
                                    <div className="col-sm mb-sm-0 mb-4">
                                        <input type="text" className="form-control bg-dark text-white rounded-0" value={weight} onChange={WeightVal} placeholder="Weight (KG)" />
                                    </div>
                                    <div className="col">
                                        <input type="text" className="form-control bg-dark text-white rounded-0" value={height} onChange={HeightVal} placeholder="Height (CM)" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col btn-wrap">
                                        <input type="button" onClick={calculateBmi} className="form-control bg-dark text-white rounded-0" value="Calculate Now" />
                                    </div>
                                    <div className="col">
                                        <input type="text" className="form-control bg-dark text-white rounded-0" value={myStyle} placeholder="BMI" />
                                    </div>
                                </div>
                            </form>
                            {suggestedPackage && (
                                <div className="mt-4">
                                    <h4 className="text-white">Suggested Package: {suggestedPackage}</h4>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
