import React from 'react';
import './Sample.module.css';
import getSamples from './apiDataManager/getSamples';

export default function Sample() {
	const listSamples = getSamples();

	return (
		<div className="container">
			<h2>Sample page</h2>
			{listSamples.map((sample) => {
				return <p>{sample.name}</p>;
			})}
		</div>
	);
}
