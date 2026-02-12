// DATABASE BANCA

let accounts = [
    {
        username: "utente1", //nome utente per il login
        pin: "12121",        //pin personale dell'utente
        saldo: 1000,        //saldo iniziale del conto
        movimenti: [],      //storico delle operazioni
    },
    {
        username: "utente2",
        pin: "22222",
        saldo: 100,
        movimenti: []
    },
    {
        username: "admin", //utente speciale con permessi da amministratore 
        pin: "12345",
        saldo: 0,       //non ha saldo per coerenza al codice.
        movimenti: []
    }
];


function prelievo() { // funzione per il prelievo
    let importo = parseFloat(prompt("Quanto vuoi prelevare?"));
    if (importo > saldo) {
        alert("Saldo insufficiente!");
    } else {
        alert(`Operazione riuscita! Hai prelevato ${importo}€. Nuovo saldo: ${saldo}€`)
        return saldo -= importo
    }
}

function versamento() { // funzione per il versamento
    let importo = parseFloat(prompt("Quanto vuoi versare?"));
    if (importo <= 0) {
        alert("Importo non valido!");
    } else {
        alert(`Operazione riuscita! Hai versato ${importo}€. Nuovo saldo: ${saldo}€`);
        return saldo + importo;
    }
}

function saldoAttuale() { // funzione per visualizzare il saldo attuale
    alert(`Saldo attualmente disponibile: ${saldo.toFixed(2)}`)
}

function storicoMovimenti(data, tipo, importo) { // funzione per registrare movimenti e visualizzare lo storico
    tipo = prompt("Inserisci tipo di movimento da registrare: ");
    importo = prompt("Inserisci importo del movimento da registrare: ")
    const nuovoMovimento = {
        data: new Date().toLocaleString('it-IT'),
        tipo: tipo,
        importo: importo
    }
    movimenti.push(nuovoMovimento)
    alert(`Storico movimenti: ${movimenti}`)
}


while (true) {
    let user = prompt("Inserisci username");
    let pin = prompt("Inserisci PIN");
    let currentUser = null;


    for (key in accounts) {
        if (user === accounts[key].username && pin === accounts[key].pin) {
            currentUser = accounts[key];

            while (true) {
                let menu = parseInt(prompt(`Ciao ${user} cosa vuoi fare?\n
            1. Effettua versamento \n
            2. Effettua prelievo \n
            3. Effettua bonifico \n
            4. Visualizza saldo attuale \n
            5. Visualizza storico movimenti \n
            6. Esci`));

                if (menu === 1) {
                    versamento();
                } else if (menu === 2) {
                    prelievo();
                } else if (menu === 3) {
                    effettuabonifico();
                } else if (menu === 4) {
                    saldoAttuale();
                } else if (menu === 5) {
                    storicoMovimenti();
                } else {
                    alert(`Arrivederci ${user}`);
                    break
                }
            }
            break;
        }
    }

    if (currentUser === null) {

        alert("Errore, riprova!!!")
    }

    //  CONTROLLO ADMIN 
    if (currentUser.username === "admin") {
        adminMenu();
        continue; // torna al login dopo uscita admin
    }
}

//  MENU ADMIN 
function adminMenu() {

    while (true) {

        let scelta = parseInt(prompt(`MENU ADMIN\n
1. Lista conti
2. Totale soldi banca
3. Crea utente
4. Esci`));

        if (scelta === 1) {

            console.log("=== LISTA CONTI ===");
            for (let acc of accounts) {
                console.log(`${acc.username}: €${acc.saldo.toFixed(2)}`);
            }

        } else if (scelta === 2) {

            let totale = 0;

            for (let acc of accounts) {
                totale += acc.saldo;
            }

            alert(`Totale banca: €${totale.toFixed(2)}`);

        } else if (scelta === 3) {

            let nuovoUser = prompt("Nuovo username:");
            let nuovoPin = prompt("Nuovo PIN:");

            if (!nuovoUser || !nuovoPin) {
                alert("Dati non validi!");
                continue;
            }

            accounts.push({
                username: nuovoUser,
                pin: nuovoPin,
                saldo: 0,
                movimenti: []
            });

            alert("Utente creato!");

        } else if (scelta === 4) {
            alert("Uscita admin...");
            break;
        }
    }
}


//  FUNZIONE BONIFICO 
function eseguiBonifico(utenteCorrente) {

    let usernameDestinatario = prompt("Inserisci username destinatario:");
    let destinatario = null;

    for (let account of accounts) {
        if (account.username === usernameDestinatario) {
            destinatario = account;
            break;
        }
    }

    if (destinatario === null) {
        alert("Errore: Utente non trovato.");
        return;
    }

    if (destinatario.username === utenteCorrente.username) {
        alert("Errore: Non puoi fare un bonifico a te stesso.");
        return;
    }

    let input = prompt("Inserisci importo:");

    if (input === null) return;

    let importo = Number(input);

    if (isNaN(importo) || importo <= 0) {
        alert("Errore: Importo non valido.");
        return;
    }

    if (importo > utenteCorrente.saldo) {
        alert("Errore: Saldo insufficiente.");
        return;
    }

    // aggiorna saldi
    utenteCorrente.saldo -= importo;
    destinatario.saldo += importo;

    // registra movimenti
    utenteCorrente.movimenti.push({
        data: new Date().toLocaleString(),
        tipo: "Bonifico inviato",
        importo: -importo,
        destinatario: destinatario.username
    });

    destinatario.movimenti.push({
        data: new Date().toLocaleString(),
        tipo: "Bonifico ricevuto",
        importo: importo,
        mittente: utenteCorrente.username
    });

    alert("Bonifico effettuato con successo!");
}