let accounts = [
    {
        username: "utente1",
        pin: "12121",
        saldo: 1000,
        movimenti: [],
    },
    {
        username: "utente2",
        pin: "22222",
        saldo: 100,
        movimenti: [],
    }
];

//  LOGIN 
while (true) {

    let user = prompt("Inserisci username");
    let pin = prompt("Inserisci PIN");

    let currentUser = null;

    // ricerca utente
    for (let account of accounts) {
        if (user === account.username && pin === account.pin) {
            currentUser = account;
            break;
        }
    }

    if (currentUser === null) {
        alert("Errore, riprova!");
        continue;
    }

    //  CONTROLLO ADMIN 
    if (currentUser.username === "admin") {
        adminMenu();
        continue; // torna al login dopo uscita admin
    }

    //  MENU UTENTE 
    while (true) {

        let menu = parseInt(prompt(`Ciao ${user} cosa vuoi fare?\n
        1. Visualizza saldo
        2. Effettua prelievo
        3. Effettua bonifico
        4. Visualizza storico movimenti
        5. Esci`));

        if (menu === 1) {
            alert(`Saldo attuale: €${currentUser.saldo.toFixed(2)}`);

        } else if (menu === 3) {
            eseguiBonifico(currentUser);

        } else if (menu === 5) {
            alert("Logout...");
            break;
        }
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

            console.log("LISTA CONTI");
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
