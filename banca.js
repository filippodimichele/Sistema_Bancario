while (true) {
    let user = prompt("Inserisci username")
    let pin = prompt("Inserisci PIN")
    for(key in accounts) {
        if (user === accounts[key].nome && pin === accounts[key].pin) {
          while (true) {
                let menu = parseint(prompt(`Ciao ${user} cosa vuoi fare?/n
            1. Visualizza il saldo /n
            2. Effettua prelievo /n
            3. Effettua bonifico /n
            4. Visualizza saldo attuale /n
            5. Visualizza storico movimenti /n
            6. Esci`))
                if (menu === 1) {
                    mostrasaldo();
                } else if (menu === 2) {
                    effettuaprelievo();
                } else if (menu === 3) {
                    effettuabonifico();
                } else if (menu === 4) {
                    visualizzasaldoattuale();
                } else if (menu === 5) {
                    visualizzastoricomovimenti();
                } else {
                    alert(`Arrivederci ${user}`);
                    break
                }
            }
        } else {
            alert("Errore, riprova!!!")
        }
    }
}
