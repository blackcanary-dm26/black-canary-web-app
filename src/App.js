import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './main.css';
import hamburger from './images/pngHamburger.png'
import bell from './images/bell.svg'
import Menu from './components/Menu/Menu'
import router from './router'
import TweenMax from 'gsap'
import $ from 'jquery'


class App extends Component {

  constructor(){
    super()
    this.state={
      menuModal: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu(input){
    console.log(input);
    if(input ==='on'){
      this.setState({
        menuModal: true
      })
      TweenMax.to($('.line2'), 0.5, {transform: 'none', opacity: '0', width: '0', ease: TweenMax.Power1.easeInOut});
      TweenMax.to($('.line1'), 0.5, {transform: 'none', opacity: '0', width: '0', ease: TweenMax.Power1.easeInOut});
      TweenMax.to($('.line3'), 0.5, {transform: 'none', opacity: '0', width: '0', ease: TweenMax.Power1.easeInOut});
      TweenMax.to($('.Menu'), 0, {display: 'flex'});
      TweenMax.to($('.Menu'), 1.25, {opacity: 1, delay: 0.25, ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.menuContainer'), 1.25, {transform:'rotate(0deg)', ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.x'), 1.25, {opacity: 1, scale: '1', delay: 0.35, ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.home'), 1.25, {opacity: 1, scale: '1', top: '-100px', delay: 0.35, ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.profile'), 1.25, {opacity: 1, scale: '1', top: '-5px', left: '-100px', delay: 0.35, ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.situations'), 1.25, {opacity: 1, scale: '1', top: '-5px', right: '-100px', delay: 0.35, ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.about'), 1.25, {opacity: 1, scale: '1', bottom: '-130px', right: '-70px', delay: 0.35, ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.logout'), 1.25, {opacity: 1, scale: '1', bottom: '-130px', left: '-70px', delay: 0.35, ease: TweenMax.Power1.easeInOut})
    }else if(input ==='exit'){
      this.setState({
        menuModal: false
      })
      TweenMax.to($('.line2'), 0.5, {transform: 'none', opacity: '1', width: '30px', ease: TweenMax.Power1.easeInOut});
      TweenMax.to($('.line1'), 0.5, {transform: 'none', opacity: '1', width: '30px', ease: TweenMax.Power1.easeInOut});
      TweenMax.to($('.line3'), 0.5, {transform: 'none', opacity: '1', width: '30px', ease: TweenMax.Power1.easeInOut});
      TweenMax.to($('.Menu'), 0, {display: 'none', delay: 2.7});
      TweenMax.to($('.Menu'), 1.25, {opacity: 0, delay: 0.25, ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.menuContainer'), 1.25, {transform:'rotate(90deg)', ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.x'), 1.25, {opacity: 0, scale: '0.2', delay: 0, ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.home'), 1.25, {opacity: 0, scale: '0.2', top: '0px', delay: 0, ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.profile'), 1.25, {opacity: 0, scale: '0.2', top: '0px', left: '0px', delay: 0, ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.situations'), 1.25, {opacity: 0, scale: '0.2', top: '0px', right: '0px', delay: 0, ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.about'), 1.25, {opacity: 0, scale: '0.2', bottom: '0px', right: '0px', delay: 0, ease: TweenMax.Power1.easeInOut})
      TweenMax.to($('.logout'), 1.25, {opacity: 0, scale: '0.2', bottom: '0px', left: '0px', delay: 0, ease: TweenMax.Power1.easeInOut})
    }
  }

  render() {
    return (
     <div className="App">

        {/*
          !this.state.menuModal
          ?
            <img className="menu" src={hamburger} alt="menu" onClick={()=>this.toggleMenu('on')}/>
          :
          <Menu toggleMenu={this.toggleMenu} amIOpen={this.state.menuModal}/>
        */}
        <div className="navbar">
          <div className="menu" onClick={()=>this.toggleMenu('on')}>
            <div className="hamburger line1"/>
            <div className="hamburger line2"/>
            <div className="hamburger line3"/>
          </div>
          <div className="bell">
              <Link to='/alerts'><img className="bellIcon" src={bell} alt="alert"/></Link>
          </div>
        </div>
        <Menu toggleMenu={this.toggleMenu} amIOpen={this.state.menuModal}/>

       {router}
     </div>
    );
  }
}

export default App;
