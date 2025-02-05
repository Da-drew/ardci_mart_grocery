import React from 'react'
import './Banner.css';


import bannerRight from '../Assets/banner-right.jpg';
import bannerMidTop from '../Assets/banner-mid-top.jpg';
import bannerMidBottom from '../Assets/banner-mid-bottom.jpg';
import bannerLeft from '../Assets/banner-left.jpg';

function Banner() {
  return (
    <div className='banner-container container'>
        <div className='banner-right-big'>
            <div className='banner-right-content'>
                <span className='banner-right-img-con'>
                    <img src={bannerRight} alt='banner'/>
                </span>
                <div className='banner-right-text-con'>
                    <span className='rb-first-text'>Lorem ipsum dolor sit</span>
                    <h1 className='rb-big-text'>Lorem ipsum dolor<br />
                    Lorem ipsum</h1>
                    <div className='rb-second-text'>Lorem ipsum dolor sit amet consectetur.</div>
                    <div className='rb-price'>₱599.00</div>
                    <div className='rb-button'>
                        <a href='#!' className='rb-shop-now'>Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
        <div className='banner-mid-container'>
            <div className='banner-mid-top'>
                <div className='mbt-image-container'>
                    <span>
                        <img src={bannerMidTop} alt=''/>
                    </span>
                    <div className='mbb-text-container'>
                        <h2>Lorem Ipsum</h2>
                        <div className='mbb-text-sub'>Lorem Ipsum</div>
                        <div className='mbb-text-price'>
                            <span>Only</span>
                            ₱299.00
                        </div>
                        <div>
                            <a href='#!' className='rb-shop-now mbb-text-btn'>Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='banner-mid-bottom banner-mid-top'>
                <div className='mbt-image-container'>
                    <span>
                        <img src={bannerMidBottom} alt=''/>
                    </span>
                    <div className='mbb-text-container'>
                        <h2>Lorem Ipsum</h2>
                        <div className='mbb-text-sub'>Lorem Ipsum</div>
                        <div className='mbb-text-price'>
                            <span>Only</span>
                            ₱299.00
                        </div>
                        <div>
                            <a href='#!' className='rb-shop-now mbb-text-btn-bottom'>Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div className='banner-left-big'>
            <div className='max-w-[100%]'>
                <div className='bl-container'>
                    <span>
                        <img src={bannerLeft} alt=''className='bl-img'/>
                    </span>
                    <div className='bl-text'>
                        <h2>100% Lorem Ipsum
                            <br />
                            Lorem Ipsum dolor
                        </h2>
                        <div className='bl-product-label'>Lorem Ipsum dolor.</div>
                        <div className='bl-price'>
                            <span>Only</span>
                            ₱999.99
                        </div>
                        <div>
                            <a href='#!' className='rb-shop-now bl-button'>Shop Now</a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner;