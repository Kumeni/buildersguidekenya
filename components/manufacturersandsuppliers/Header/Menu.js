import React from 'react';
import style from './Menu.module.css';

function Menu(props) {
	return (
		<div className = {style.menu}>
			<div className = {style.menuImg}>
				<img src={props.src}/>
			</div>
			<span>
				{props.menu}
			</span>
		</div>
	);
}

export default Menu;
