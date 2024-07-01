import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* Navigation */}
            <nav className="navigation-main">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar"><i className="fa fa-bars" aria-hidden="true"></i></button>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="navigation-items nav navbar-nav navbar-right">
                            <li className="current"><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/explore">Explore Data</Link></li>
                            <li><Link to="/alter-schema">Alter Schema</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Intro Section */}
            <section id="intro" className="container-mid">
                <h1 style={{ color: 'white' }}>Microbialites</h1>
            </section>

            {/* About Section */}
            <section id="about" className="white">
                <div className="container-fluid text-center">
                    <h3 className="headline">This is a microbialite database.</h3>
                    <p className="subline">Here is some text about the microbialite database.</p>
                    {/* Columns with images */}
                    <div className="col-sm-4 text-left about-item">
                        <img className="img-responsive" src="" alt="image"/>
                        <p>Macrostructures.</p>
                    </div>
                    {/* Additional columns can be similarly added */}
                </div>
            </section>

            


            {/* Contact Section */}
            <section id="contact" className="white">
                <div className="container-fluid text-center">
                    <ul className="contact-list">
                        <li className="contact-list-item">
                            <div className="contact-type">
                                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                <h6>Email</h6>
                            </div>
                            <h6>tahickson@stthomas.edu</h6>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Footer */}
            <section id="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-left">
                            <p>© 2024 University of St.Thomas Geology Department</p>
                        </div>
                        <div className="col-sm-6 text-right">
                        <img src={require('../assets/images/CAS_Lockup_2line_white.png')} alt="St.Thomas College Logo" />
                        </div>
                        <div className="col-sm-12 text-center">
                            <p style={{ fontSize: '12px' }}>This research was made possible in part by the Undergraduate Research Opportunities Program at the University of St. Thomas</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Background Content */}
            <div className="background-content parallax-on">
                <div className="background-content-inner">
                    <div className="background-overlay"></div>
                    <div className="background-img layer" data-depth="0.1"></div>
                </div>
            </div>
        </div>
    );
}

export default Home;
