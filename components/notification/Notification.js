import React from 'react';
import style from './Notification.module.css';
import Link from 'next/link'

function Notification(props) {
  return (
	<div className = {style.container}>
		<div>
			<div>
				<img src="" alt=""/>
			</div>
			<div>
				<p>Order placed successfully</p>
			</div>
			<div className = {style.buttons}>
				<button onClick = {()=>props.handleShowNotification(false)}>close</button>

				<Link 
					href="/my-orders"
				>
					<button className ={"bg-primary text-white"}>My orders</button>
				</Link>
			</div>
		</div>
	</div>
  )
}

export default Notification;
