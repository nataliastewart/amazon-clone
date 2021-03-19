import React from 'react';
import './Header.css';

function Header() {
	return (
		<div className="header">
			<img
				src="C:\Users\natal\Git\amazon-clone\images\Amazon-Symbol.jpg"
				className="header__logo"
			/>
			<div className="header__search">
				<input className="header__searchInput" type="text" />
				{/*logo */}
			</div>
			<div className="header__nav"></div>
		</div>
	);
}

export default Header;
