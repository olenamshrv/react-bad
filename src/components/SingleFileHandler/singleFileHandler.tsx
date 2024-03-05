import React, { useState, useEffect } from "react";
import { Status } from "../../utils/constants";
import { Sequence } from "../Sequence/sequence";
import { findMaxSequence } from "../../helpers/helpers";
import styles from './index.module.scss';

interface StateSet {
  minNumber: number,
  maxNumber: number,
  mediana: number,
  arithmeticMean: number,
  maxIncreasingSeq: number[][],
  maxDecreasingSeq: number[][],
}

const initialState = {
  minNumber: 0,
  maxNumber: 0,
  mediana: 0,
  arithmeticMean: 0,
  maxIncreasingSeq: [[]],
  maxDecreasingSeq: [[]],
  isEmpty: false,
}

const SingleFileHandler = () => {
  const [status, setStatus] = useState(Status.NOT_STARTED);
	const [fileContent, setFileContent] = useState<string | null>(null);
  const [calculations, setCalculations]  = useState<StateSet>(initialState);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nextFile = event.target.files?.[0];
		if (nextFile) {
      setStatus(Status.IN_PROGRESS);
			const reader = new FileReader();
			reader.addEventListener("load", () => {
        const content = reader.result as string;
        setFileContent(content);
      });
			reader.readAsText(nextFile);
		} else {
      setFileContent(null);
    }
	};

  useEffect(() => {
    if (fileContent !== null) {
      const trimmedContent = fileContent.trim();
      if ( trimmedContent !== '') {
        const numbersList = trimmedContent.split(`\n`).filter(item => item !== '').map(Number).filter(number => !isNaN(number));
        const numbersAmount = numbersList.length;

        const maxNumber = numbersList.reduce(
          (maxValue, currentValue) => currentValue > maxValue ? currentValue : maxValue,
          numbersList[0]
        );
        const minNumber = numbersList.reduce(
          (minValue, currentValue) =>  currentValue < minValue ? currentValue : minValue,
          numbersList[0]
        );

        const sortedNumbersList = [...numbersList].sort((a,b) => a - b);
        const mediana = numbersAmount % 2 === 0 ?
          (sortedNumbersList[numbersAmount / 2] + sortedNumbersList[numbersAmount / 2 - 1]) / 2 :
          sortedNumbersList[Math.floor(numbersAmount / 2)]

        const sum = numbersList.reduce((sum, currentNumber) => sum + currentNumber, 0);
        const arithmeticMean = sum / numbersAmount;
        const maxIncreasingSeq = findMaxSequence(numbersList, true);
        const maxDecreasingSeq = findMaxSequence(numbersList, false);

        setCalculations({
          minNumber,
          maxNumber,
          mediana,
          arithmeticMean,
          maxIncreasingSeq,
          maxDecreasingSeq,
        });
      }
      setStatus(Status.COMPLETE);
    }
  }, [fileContent]);

  return (
    <div className={styles.main}>
      <div>
        <label htmlFor="file" className={styles.label}>
          Choose a file:
        </label>
        <input id="file" type="file" onChange={handleFileChange}/>
      </div>
      { status === Status.IN_PROGRESS && (
        <div>Loading...</div>
      )}
      { status === Status.COMPLETE && fileContent && (
        <>
          <div>
            <div className={styles.textBold}>
              Max Number: <span className={styles.text}> {calculations.maxNumber}</span>
            </div>
            <div className={styles.textBold}>
              Min Number: <span className={styles.text}>{calculations.minNumber}</span>
            </div>
            <div className={styles.textBold}>
              Mediana: <span className={styles.text}>{calculations.mediana}</span>
            </div>
            <div className={styles.textBold}>
              Arithmetic Mean: <span className={styles.text}>{calculations.arithmeticMean}</span>
            </div>
          </div>

          { calculations.maxIncreasingSeq.length > 0 && <Sequence sequences={calculations.maxIncreasingSeq} />}
          { calculations.maxDecreasingSeq.length > 0 && <Sequence sequences={calculations.maxDecreasingSeq} isIncreasing={false} />}
        </>
      )}
      { status === Status.COMPLETE && fileContent === '' && (
        <div className="alert">File is empty or does not contain any numbers or valid numbers</div>
      )}
    </div>
  )
};

export default SingleFileHandler;