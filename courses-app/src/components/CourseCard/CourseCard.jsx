import React, { useState } from 'react';
import Button from '../Button/Button';

const courseCardStyle = {
	border: 'green solid 2px',
	margin: '20px',
	display: 'flex',
	flexDirection: 'row',
};
const courseInfoStyle = {
	display: 'flex',
	flexDirection: 'column',
	margin: '20px',
	width: '70%',
	textAlign: 'left',
};
const courseDataStyle = {
	width: '30%',
	display: 'flex',
	flexDirection: 'column',
	margin: '20px',
	textAlign: 'left',
};

const CourseCard = () => (
	<div style={courseCardStyle}>
		<div style={courseInfoStyle}>
			<h1>Lore Ipsum Title</h1>
			<p>
				Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro.
				De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo
				vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.
				Hi mindless mortuis soulless creaturas, imo evil stalking monstra
				adventus resi dentevil vultus comedat cerebella viventium. Qui animated
				corpse, cricket bat max brucks terribilem incessu zomby. The voodoo
				sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi
				tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains
				an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv
				ingdead.
			</p>
		</div>
		<div style={courseDataStyle}>
			<span>
				<b>Authors:</b> Lore Ipsum Author
			</span>
			<span>
				<b>Duration:</b> Lore Ipsum Duration
			</span>
			<span>
				<b>Created:</b> Created
			</span>
			<Button />
		</div>
	</div>
);

export default CourseCard;
