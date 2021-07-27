export function createAudio(serverURL: string, sound: string): HTMLAudioElement {
  const audio = new Audio(`${serverURL}/uploads/${sound}`);
  return audio;
}

export function getResult(result: 'correct' | 'error'): HTMLAudioElement {
  const audio = new Audio(`./${result}.mp3`);
  return audio;
}

export function hideAnswers() {
  const answers = document.querySelectorAll('.game__answers-item');
  const answersContainer = document.querySelector('.game__answers');
  const container = document.querySelector('.game__container');
  if (answers && answersContainer && container) {
    let answersWidth = +window.getComputedStyle(answersContainer).width.split('px')[0];
    const containerWidth = +window.getComputedStyle(container).width.split('px')[0];
    let i = 0;
    while (answersWidth > containerWidth) {
      answers[i].classList.add('hidden');
      answersWidth = +window.getComputedStyle(answersContainer).width.split('px')[0];
      i++;
    }
  }
}
