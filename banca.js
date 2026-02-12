
// DATABASE BANCA

let accounts = [
    {
    username:"utente1", //nome utente per il login
    pin: "12121",        //pin personale dell'utente
    saldo: 1000,        //saldo iniziale del conto
    movimenti: [],      //storico delle operazioni
},
{
    username: "utente2",
    pin: "22222",
    saldo: 100,
    movimenti:[]
},
{
    username: "admin", //utente speciale con permessi da amministratore 
    pin: "12345",
    saldo: 0,       //non ha saldo per coerenza al codice.
    movimenti: []
}
];

while (true) {
    let user = prompt("Inserisci username");
    let pin = prompt("Inserisci PIN");
    let currentUser = null;


    for(key in accounts) {
        if (user === accounts[key].username && pin === accounts[key].pin) {
          currentUser = accounts[key];

            while (true) {
                let menu = parseInt(prompt(`Ciao ${user} cosa vuoi fare?\n
            1. Visualizza il saldo \n
            2. Effettua prelievo \n
            3. Effettua bonifico \n
            4. Visualizza saldo attuale \n
            5. Visualizza storico movimenti \n
            6. Esci`));

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
            break;
        }
    }

    if (currentUser === null){

        alert("Errore, riprova!!!")
    }
        }
    

