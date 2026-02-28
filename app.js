document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.sound-btn');
    const stopButton = document.getElementById('stop-all');
    const audios = document.querySelectorAll('audio');

    // Funzione per fermare tutti i suoni
    function stopAllAudio() {
        audios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0; // Riparti da capo
        });
        
        buttons.forEach(btn => btn.classList.remove('playing'));
    }

    // Aggiungi event listener ad ogni bottone
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const soundId = button.getAttribute('data-sound');
            const audioElement = document.getElementById(`audio-${soundId}`);
            
            if (audioElement) {
                // Ferma gli altri prima di iniziare
                // Se si vuole sovrapporre i suoni, si può commentare la riga qui sotto.
                // Nel caso delle soundboard di vario tipo è spesso utile poter fermare e ripartire
                stopAllAudio();
                
                audioElement.play().catch(error => {
                    console.error("Non è stato possibile riprodurre l'audio:", error);
                });
                
                button.classList.add('playing');
                
                // Rimuovi l'animazione al termine dell'audio
                audioElement.onended = () => {
                    button.classList.remove('playing');
                };
            }
        });
    });

    // Bottone Stop
    if (stopButton) {
        stopButton.addEventListener('click', stopAllAudio);
    }
});
