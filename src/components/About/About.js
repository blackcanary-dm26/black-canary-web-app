import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import TweenMax from 'gsap';
import $ from 'jquery';
import logo from './../../images/canaryLogo.svg';
import placeholder from './../../images/exampleScreenshotDemo.gif';
import js from './../../images/janiseSuski.jpg';
import jsSilly from './../../images/janiseSuskiSilly.jpg';
import ek from './../../images/emilyKeator.png';
import ekSilly from './../../images/emilyKeatorSilly.png';
import ap from './../../images/andiPlatter.jpeg';
import apSilly from './../../images/andiPlatterSilly.jpeg';
import at from './../../images/abigailThelin.JPG';
import atSilly from './../../images/abigailThelinSilly.JPG';
import {sendCurrentUser} from './../../controllers/socketCTRL';

export default class About extends Component{
    constructor() {
        super();

        this.state = {
            aboutOpen: false,
            levelsOpen: false,
            techOpen: false,
            creatorsOpen: false
        }
    }

    componentDidMount() {
        if(this.props.user.id){
            sendCurrentUser(this.props.user)
        }
        this.setState({
            aboutHeight: $('#about .withinSection').css('height'),
            levelsHeight: $('#levels .withinSection').css('height'),
            techHeight: $('#tech .withinSection').css('height'),
            creatorsHeight: $('#creators .withinSection').css('height')
        })
        TweenMax.to($('#about .withinSection'), 0, {height: '0', delay: -1});
        TweenMax.to($('#levels .withinSection'), 0, {height: '0', delay: -1});
        TweenMax.to($('#tech .withinSection'), 0, {height: '0', delay: -1});
        TweenMax.to($('#creators .withinSection'), 0, {height: '0', delay: -1});
    }

    toggleSection(id) {
        switch(id) {
            case 'about':
                if(this.state.aboutOpen) {
                    TweenMax.to($('#about .withinSection'), 1, {height: '0',  ease: TweenMax.Power1.easeInOut});
                    this.setState({
                        aboutOpen: false
                    })
                } else {
                    TweenMax.to($('#about .withinSection'), 1, {height: this.state.aboutHeight, ease: TweenMax.Power1.easeInOut});
                    this.setState({
                        aboutOpen: true
                    })
                }
                break;
            case 'levels':
                if(this.state.levelsOpen) {
                    TweenMax.to($('#levels .withinSection'), 1, {height: '0',  ease: TweenMax.Power1.easeInOut});
                    this.setState({
                        levelsOpen: false
                    })
                } else {
                    TweenMax.to($('#levels .withinSection'), 1, {height: this.state.levelsHeight, ease: TweenMax.Power1.easeInOut});
                    this.setState({
                        levelsOpen: true
                    })
                }
                break;
            case 'tech':
                if(this.state.techOpen) {
                    TweenMax.to($('#tech .withinSection'), 1, {height: '0',  ease: TweenMax.Power1.easeInOut});
                    this.setState({
                        techOpen: false
                    })
                } else {
                    TweenMax.to($('#tech .withinSection'), 1, {height: this.state.techHeight, ease: TweenMax.Power1.easeInOut});
                    this.setState({
                        techOpen: true
                    })
                }
                break;
            case 'creators':
                if(this.state.creatorsOpen) {
                    TweenMax.to($('#creators .withinSection'), 1, {height: '0',  ease: TweenMax.Power1.easeInOut});
                    this.setState({
                        creatorsOpen: false
                    })
                } else {
                    TweenMax.to($('#creators .withinSection'), 1, {height: this.state.creatorsHeight, ease: TweenMax.Power1.easeInOut});
                    this.setState({
                        creatorsOpen: true
                    })
                }
                break;
            default:
                break;
        }
    }

    render(){
        return(
            <div id="About">
                <header>
                    <div className="imgWrapper">
                        <div id="spotlight1"></div>
                        <div id="spotlight2"></div>
                        <img src={logo}/>
                    </div>
                    {/* <h3>Safety App</h3> */}
                </header>
                <section id="about">
                    <h1 onClick={()=> this.toggleSection('about')}>About</h1>
                    <div className="withinSection">
                        <p className="paragraphs">Ever been traveling, and had to text your mother, your best friend, your best
                        friend's roommate, and...everyone and their dog...that you boarded the plane
                        safely, and landed safely?</p>
                        <p className="paragraphs">Or gone for a night out and needed an easy way to
                            track the same three friends you always go out with?</p>
                        <p className="paragraphs">Or been walking home late at night, and felt unsafe?</p>
                        <p className="paragraphs">Black Canary is a web application designed to allow the user to
                            share their location with specifically chosen contacts or groups of contacts.</p>
                        <div className="ulWrapper">
                            <ul>
                                <li>1. Log into your account.</li>
                                <li>2. Select a situation.</li>
                                <li>3. Add an optional message detailing why you are sharing your location.</li>
                                <li>4. Select your contacts.</li>
                                <li>5. Set a time.</li>
                                <li>6. Send!</li>
                            </ul>
                            <img src={placeholder}/>
                        </div>
                        <p className="paragraphs">Your chosen recipients will be alerted as to your situation and will be updated
                            in real-time as to your location. If you receive an alert from one of
                            your contacts, you can view their location & situation on the home screen.
                        </p>
                    </div>

                </section>
                <section id="levels">
                    <h1 onClick={()=> this.toggleSection('levels')}>Situations</h1>
                    <div className="withinSection">
                        <p className="paragraphs">
                            Black Canary offers three levels of situations, for a variety
                            of use cases.
                        </p>

                        <p className="paragraphs">
                            <em>Level One:</em> situations such as being out with friends, going for a run,
                            traveling, going on a date, even a custom situation you can adjust to
                            your needs. With Level One situations, colored grey on the situations
                            page, you can add your message, choose your recipients, and set the
                            time active.
                        </p>

                        <p className="paragraphs">
                            <em>Level Two:</em> for situations where you are in an uncomfortable
                            situation or walking through a bad area, and you want to
                            discreetly alert certain people to your location and situation. In Level
                            Two situations, you can add a message (or leave it blank) and set the time
                            active. The alert will be sent to a pre-set list of contacts, which you can
                            create on your profile page.
                        </p>

                        <p className="paragraphs">
                            <em>Level Three:</em> the emergency situation. Please note, this is NOT intended to
                            replace calling 911! Rather, it is a discreet way to let your contacts
                            know that you need them to contact you or come get you immediately --
                            or even contact the authorities if you are unable. In Level
                            Three situations, simply click send. The alert will be sent to a pre-set
                            list of contacts, with a pre-set message, which you can
                            create on your profile page. It will be active for 12 hours.
                        </p>
                    </div>

                </section>
                <section id="tech">
                    <h1 onClick={()=> this.toggleSection('tech')}>Technology</h1>
                    <div className="withinSection">
                        <ul className="ulWrapper">
                            <li>React</li>
                            <li>Node.js</li>
                            <li>Express.js</li>
                            <li>Massive.js</li>
                            <li>Socket.io</li>
                            <li>Auth0</li>
                            <li>Passport.js</li>
                            <li>Google Maps API</li>
                            <li>Greensock Animation</li>
                            <li>Sass/Scss</li>
                            <li>Redux</li>
                            <li>PostgreSQL</li>
                            <li>Heroku Database</li>
                            <li>Hosted on Digital Ocean</li>
                        </ul>
                    </div>
                </section>
                <section id="creators">
                    <h1 onClick={()=> this.toggleSection('creators')}>Creators</h1>
                    <div className="withinSection">
                        <div className="ulWrapper">
                            <div className="creatorImgWrapper">
                                <img src={ekSilly}/>
                                <img className="imgSerious" src={ek}/>
                            </div>
                            <em>Emily Keator</em>
                            <p>While creating the Black Canary web app, Emily was in
                                charge of the geolocation/Google Maps services, and
                                developed the design for the web app. She created and styled
                                multiple React components. Much of her work was oriented towards
                                the front-end, but she assisted with some of the server-side
                                javascript code and logic.
                                Emily is a first-degree backbelt and is mildly obsessed with
                                Parmesan cheese (Andi often asks is she would like some pasta with her cheese).</p>
                        </div>
                        <div className="ulWrapper">
                            <div className="creatorImgWrapper">
                                <img src={apSilly}/>
                                <img className="imgSerious" src={ap}/>
                            </div>
                            <em>Andi Platter</em>
                            <p>Within the Black Canary team, Andi worked on both front
                                and back-end. She helped create several React components, set up
                                the database, and create endpoints. Andi spearheaded the
                                effort to get Auth0 set up and styled, and helped design
                                the message alert system.
                                Andi grew up in Idaho and California, and loves dogs, providing
                                daily dog facts for all of DevMountain.
                            </p>
                        </div>
                        <div className="ulWrapper">
                            <div className="creatorImgWrapper">
                                <img src={jsSilly}/>
                                <img className="imgSerious" src={js}/>
                            </div>
                            <em>Janise Suski</em>
                            <p>Janise's role on the Black Canary team was to work primarily with the back-end.
                                She worked on setting up the server and Redux, and helped create the
                                database in PostgreSQL. While most of her work was on the server-side,
                                her work with websockets required interaction and preparation with the
                                front-end, including collaborating on the design on endpoints.
                                Janise served in the Peace Corps in Micronesia for 27 months
                                and EATS KIT-KATS LIKE A MONSTER. </p>
                        </div>
                        <div className="ulWrapper">

                            <div className="creatorImgWrapper">
                                <img src={atSilly}/>
                                <img className="imgSerious" src={at}/>
                            </div>
                            <em>Abigail Thelin</em>
                            <p>Abigail acted as a front-end developer for the Black Canary web app,
                                creating and styling multiple components. She was particularly responsible for
                                implementing the design and creating the functionality for the
                                user profile, including contacts, groups, and alerts. She collaborated
                                on the development of the message alert system.
                                Abigail grew up in Alpine, UT and loves to knit while watching the Lord of the Rings.
                            </p>
                        </div>
                    </div>
                </section>
                <footer>
                    <a href="https://www.linkedin.com/in/emkeator" target="_blank"><img src={ek} className="creatorImg"/></a>
                    <a href="https://www.linkedin.com/in/andiplatter" target="_blank"><img src={ap} className="creatorImg"/></a>
                    <a href="https://www.linkedin.com/in/janise-suski" target="_blank"><img src={js} className="creatorImg"/></a>
                    <a href="http://www.linkedin.com/in/abigail-thelin" target="_blank"><img src={at} className="creatorImg"/></a>
                    <span>We do not own the name "Black Canary". This was created as a group project as DevMountain Student Developers.</span>
                </footer>
            </div>
        )
    }
}
