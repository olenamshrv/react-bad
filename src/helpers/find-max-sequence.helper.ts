interface MaxSequence {
	firstIndex: number,
	lastIndex: number,
}

const findMaxSequence = (
  sequence: number[],
	isIncreasing: boolean = true,
  ) => {
    if (sequence.length === 0) {
      return [];
    } else {
      let maxQuantity = 0;
      let maxSequence: MaxSequence[] = [];
      let firstIndex = 0;
      let currentMaxQuantity = 1;

      for(let i = 1; i <= sequence.length; i++) {
      
        const isChanging = isIncreasing ? sequence[i] > sequence[i - 1] : sequence[i] < sequence[i - 1];

        if (isChanging) {
          currentMaxQuantity++; 
        } else {
            if (currentMaxQuantity === maxQuantity) { 
              maxSequence.push({
                firstIndex,
                lastIndex: i - 1,
              });
            } 

            if (currentMaxQuantity > maxQuantity) { 
              maxQuantity = currentMaxQuantity;
              maxSequence = [{
                firstIndex,
                lastIndex: i- 1,
              }];
            } 

            firstIndex = i;
            currentMaxQuantity = 1;
        }     
      }

      const allSequences = maxSequence.map(item => 
        [item.firstIndex, ...sequence.slice(item.firstIndex, item.lastIndex + 1)]);

      return allSequences;
  }
}

export { findMaxSequence };