import React from 'react';
import { Dict } from '../../types';
import DictCard from './DictCard';

type BaseModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
};

export default function BaseModal({
	isOpen,
	onClose,
	title,
	children,
}: BaseModalProps) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
			<div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
				<div className='absolute top-4 right-4'>
					<button className='text-2xl' onClick={onClose}>
						X
					</button>
				</div>
				<div className='text-center'>
					<h1 className='font-bold text-2xl leading-6'>{title}</h1>
					<div className='mt-2'>{children}</div>
				</div>
				<button
					className='mt-5 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
					onClick={onClose}
				>
					닫기
				</button>
			</div>
		</div>
	);
}
