import React from 'react';
import './Home.css';
import Product from './Product';

export default function Home() {
	return (
		<div className="home">
			<div className="home__container">
				<img
					className="home__image"
					src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
					alt=""
				/>
				<div className="home__row">
					<Product
						id="132"
						title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
						price={29.99}
						image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
						rating={5}
					/>
					<Product
						id="13341"
						title="Fitbit Charge 4 Fitness and Activity Tracker with Built-in GPS, Heart Rate, Sleep & Swim Tracking, Rosewood/Rosewood, One Size (S &L Bands Included)"
						price={199.99}
						image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
						rating={3}
					/>
				</div>
				<div className="home__row">
					<Product
						id="234"
						title="Kenwood Mix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
						price={239.99}
						image="https://m.media-amazon.com/images/I/61hNBQpikbL._AC_UY327_FMwebp_QL65_.jpg"
						rating={4}
					/>
					<Product
						id="5632"
						title="HP 24mh FHD Monitor - Computer Monitor with 23.8-Inch IPS Display (1080p) - Built-In Speakers and VESA Mounting "
						price={199.99}
						image="https://m.media-amazon.com/images/I/91fAU6mxFsL._AC_UY327_FMwebp_QL65_.jpg"
						rating={5}
					/>
					<Product
						id="563226"
						title="All-new Echo Dot (4th Gen, 2020 release) | Smart speaker with Alexa | Charcoal"
						price={49.99}
						image="https://m.media-amazon.com/images/I/714Rq4k05UL._AC_UY327_FMwebp_QL65_.jpg"
						rating={4}
					/>
				</div>
				<div className="home__row">
					<Product
						id="6798"
						title="2020 Apple iPad Pro (11-inch, Wi-Fi, 128GB) - Space Gray (2nd Generation)"
						price={749.99}
						image="https://m.media-amazon.com/images/I/815ztYEEwYL._AC_UY327_FMwebp_QL65_.jpg"
						rating={4}
					/>
				</div>
			</div>
		</div>
	);
}
