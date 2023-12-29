import React from 'react';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	message: string;
};

export default function Modal({ isOpen, onClose, message }: ModalProps) {
	if (!isOpen) return null;
	const handleModalClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.stopPropagation();
	};
	return (
		<div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
			<div
				className='flex flex-col items-center justify-center bg-white p-5 rounded w-2/5 h-1/5'
				onClick={handleModalClick}
			>
				<p>{message}</p>
				<button
					className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
					onClick={onClose}
				>
					다시하기
				</button>
			</div>
		</div>
	);
}
