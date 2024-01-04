import React from 'react';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	answer: string;
};

export default function LoseModal({ isOpen, onClose, answer }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
			<div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
				<div className='absolute top-4 right-4'></div>
				<div>
					<div className='text-center'>
						<h1 className='font-bold text-2xl leading-6'>실패했습니다!</h1>
						<div className='mt-2'>
							<p className='text-sm text-gray-500'>
								너 운 없어. 다시 도전 해봐.
							</p>
							<div className='flex justify-center mb-1 mt-4'>
								{Array.from({ length: answer.length }, (_, answerIndex) => {
									return (
										<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-red-200  border-black cell-animation uppercase'>
											{answer[answerIndex]}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				<button
					className='flex items-center justify-center mx-auto mt-4 rounded border-solid border-2 border-blue-400 bg-blue-400 w-1/3 h-10 text-white cursor-pointer hover:bg-blue-600'
					onClick={onClose}
				>
					이번엔 반드시
				</button>
			</div>
		</div>
	);
}
