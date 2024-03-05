import { FC } from 'react';
import styles from './index.module.scss';

interface SequenceProps {
	sequences: number[][],
	isIncreasing?: boolean,
}

const Sequence: FC<SequenceProps> = ({ sequences, isIncreasing = true }) => (
	<div>
		<h4>The largest {isIncreasing ? 'increasing' : 'decreasing'} sequence(s):</h4>
		<ul>
			{ sequences.map((value)=> (
			<li key={value[0]}>
				{value.slice(1).join(', ')}
			</li>
			)
			)}
		</ul>
		<div className={styles.textSmall}>Sequences amount: {sequences.length}</div>
		<div className={styles.textSmall}>Elements amount in (every) sequence: {sequences[0].length - 1}</div>
	</div>
	)

export { Sequence };