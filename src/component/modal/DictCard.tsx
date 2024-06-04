import React from 'react';
import { Dict } from '../../types';

type DictCardProps = {
	dict: Dict;
};

export default function DictCard({ dict }: DictCardProps) {
	return (
		<div className='flex flex-col p-4 border rounded shadow-md gap-4 mt-5'>
			<div className='flex justify-start'>
				<p className='text-xl font-bold'>
					{dict.word} <span className='text-sm text-gray-400'>{dict.type}</span>
				</p>
			</div>
			<div className='text-sm text-gray-600 flex justify-start'>
				<p className='text-left'>{dict.definition}</p>
			</div>
			<div className='text-sm text-gray-500 flex justify-start'>
				<p className='text-left'>{dict.example}</p>
			</div>
		</div>
	);
}
