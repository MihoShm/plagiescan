document.addEventListener('DOMContentLoaded', () => {
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    const compareBtn = document.getElementById('compareBtn');
    const scoreDisplay = document.getElementById('plagiarismScore');
    const file1Input = document.getElementById('file1');
    const file2Input = document.getElementById('file2');
  
    file1Input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => text1.value = e.target.result;
        reader.readAsText(file);
      }
    });
  
    file2Input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => text2.value = e.target.result;
        reader.readAsText(file);
      }
    });
  
    compareBtn.addEventListener('click', () => {
      const words1 = text1.value.toLowerCase().split(/\s+/);
      const words2 = text2.value.toLowerCase().split(/\s+/);
      
      const similarWords = new Set();
      words1.forEach(word => {
        if (words2.includes(word) && word.length > 2) {
          similarWords.add(word);
        }
      });
  
      const score = Math.round((similarWords.size / Math.max(words1.length, words2.length)) * 100);
      scoreDisplay.textContent = `Similarity Score: ${score}%`;
  
      // Highlight similar words
      let highlightedText1 = text1.value;
      let highlightedText2 = text2.value;
  
      similarWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        highlightedText1 = highlightedText1.replace(regex, `<span class="highlight">${word}</span>`);
        highlightedText2 = highlightedText2.replace(regex, `<span class="highlight">${word}</span>`);
      });
  
      text1.innerHTML = highlightedText1;
      text2.innerHTML = highlightedText2;
    });
  });
  
  