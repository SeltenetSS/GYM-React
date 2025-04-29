import React from 'react'

export default function Contact() {
    const map = {
        border: '0px',
        height: '550px',
        width:'-webkit-fill-available'

    };
    return (
        <div id="contact" className='container'>
            <div className="row">
                <div className="col-md-6 mb-md-0 mb-5">
                    <div>
                        <h4>CONTACT US</h4>
                        <h2 className='display-5 mb-4'>GET IN TOUCH</h2>
                    </div>
                    <div className='contact-info d-flex flex-column'>

                        <div className='d-flex align-items-center mb-3'>
                            <div className='bg-primary rounded-circle d-flex align-items-center justify-content-center me-3'>
                                <i className="fa fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <p className='m-0'>123 Street, New York, USA</p>
                            </div>
                        </div>

                        <div className='d-flex align-items-center mb-3'>
                            <div className='bg-primary rounded-circle d-flex align-items-center justify-content-center me-3'>
                                <i className="fa fa-phone"></i>
                            </div>
                            <div>
                                <p className='m-0'>+012 345 6789</p>
                            </div>
                        </div>

                        <div className='d-flex align-items-center'>
                            <div className='bg-primary rounded-circle d-flex align-items-center justify-content-center me-3'>
                                <i className="fa fa-envelope"></i>
                            </div>
                            <div>
                                <p className='m-0'>info@example.com</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-md-6">
                    <form action="/action_page.php">
                        <div className="mb-3 mt-3">

                            <input type="name" className="form-control rounded-0" placeholder="Name" name="name" />
                        </div>
                        <div className="mb-3">

                            <input type="email" className="form-control rounded-0" placeholder="Email" name="email" />
                        </div>

                        <div className="mb-3">

                            <input type="text" className="form-control rounded-0" placeholder="Website" name="web" />
                        </div>

                        <div className="mb-3">

                            <textarea class="form-control rounded-0" rows="5" id="comment" name="text" placeholder='Comment'></textarea>

                        </div>
                        <div className='d-grid'>

                            <button type="submit" className="btn btn-block rounded-0">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                <iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.7250066623983!2d49.850507375867565!3d40.41494237143991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403087fbef6b3dfb%3A0xc32b1d5765759234!2sSTEP%20%C4%B0T%20ACADEMY!5e0!3m2!1str!2saz!4v1745617342741!5m2!1str!2saz" 
  width="600" 
  height="450" 
  style={{ border: '0', width: '100%', height: '450px' }} 
  allowfullscreen="" 
  loading="lazy" 
  referrerpolicy="no-referrer-when-downgrade">
</iframe>



                </div>
            </div>
        </div>
    )
}
