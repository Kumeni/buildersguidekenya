import React from 'react';
import style from './Menu.module.css';
import Link from 'next/link';

function Menu(props) {
	return (
		<div className = {style.menu}>
			{
				props.link?
					<Link href={props.link}>
						<a>
							<div className = {style.menuImg}>
								<img src={props.src}/>
							</div>
							<span>
								{props.menu}
							</span>
						</a>
					</Link>
				:	<>
					<div className = {style.menuImg + " " + style.user}>
						<img src={props.src}/>
					</div>
					{/* <span>
						{props.menu}
					</span> */}
				</>
			}
			
		</div>
	);
}

export default Menu;
