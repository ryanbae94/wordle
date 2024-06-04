import React from 'react';
import { Dict } from '../../types';
import DictCard from './DictCard';
import BaseModal from './BaseModal';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	answer: string;
	dict: Dict;
};

export default function AiWinModal({
	isOpen,
	onClose,
	answer,
	dict,
}: ModalProps) {
	return (
		<BaseModal isOpen={isOpen} onClose={onClose} title='패배 했습니다.'>
			<p className='text-sm text-gray-500'>AI는 무자비합니다.</p>
			<div className='flex justify-center mb-1 mt-4'>
				{Array.from({ length: answer.length }, (_, answerIndex) => (
					<div
						key={answerIndex}
						className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-red-200 border-black cell-animation uppercase'
					>
						{answer[answerIndex]}
					</div>
				))}
			</div>
			<DictCard dict={dict} />
		</BaseModal>
	);
}
