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

function prelievo(user) { // funzione per il prelievo
    const input = prompt("Quanto vuoi prelevare?");
    if (input === null) {
        alert("Operazione annullata.");
        return;
    }

    const importo = parseFloat(input);

    if (isNaN(importo) || importo <= 0) {
        alert("Importo non valido!");
        return;
    }

    if (importo > user.saldo) {
        alert("Saldo insufficiente!");
        return;
    }

    user.saldo -= importo;

    const nuovoMovimento = {
        data: new Date().toLocaleString('it-IT'),
        tipo: "prelievo",
        importo: importo
    };
    user.movimenti.push(nuovoMovimento)
    alert(`Operazione riuscita!\nHai prelevato ${importo}€. \nNuovo saldo: ${user.saldo}€`)
}

function versamento(user) { // funzione per il versamento
    const input = prompt("Quanto vuoi versare?");
    if (input === null) {
        alert("Operazione annullata.");
        return;
    }
    const importo = parseFloat(input);
    
    if (isNaN(importo) || importo <= 0) {
        alert("Importo non valido!");
        return;
    }
    user.saldo += importo;

    const nuovoMovimento = {
        data: new Date().toLocaleString('it-IT'),
        tipo: "versamento",
        importo: importo
    };
    user.movimenti.push(nuovoMovimento)
    alert(`Operazione riuscita!\nHai versato ${importo}€.\nNuovo saldo: ${user.saldo}€`);
}

function saldoAttuale(user) { // funzione per visualizzare il saldo attuale
    alert(`Saldo attualmente disponibile: ${user.saldo.toFixed(2)}€`)
}

function storicoMovimenti(user) { // funzione per registrare movimenti e visualizzare lo storico
    if (user.movimenti.length === 0) {
        alert("Nessun movimento registrato.")
        return;
    }

    let testo = "";  //modifica per debug
    for( let mov of user.movimenti){
        testo += `${mov.data} - ${mov.tipo}: ${mov.importo}€\n`;
    }
    alert(testo);
    
    
}

while (true) {
    let user = prompt("Inserisci username");
    let pin = prompt("Inserisci PIN");
    let currentUser = null;

    for (let key in accounts) { //inserimento let per variabile
        if (user === accounts[key].username && pin === accounts[key].pin) {
            currentUser = accounts[key];

            if (currentUser.username === "admin") {
                adminMenu();
                break;
            }

            while (true) {
                let menu = parseInt(prompt(`Ciao ${user} cosa vuoi fare?\n
            1. Effettua versamento \n
            2. Effettua prelievo \n
            3. Effettua bonifico \n
            4. Visualizza saldo attuale \n
            5. Visualizza storico movimenti \n
            6. Esci`));

                if (menu === 1) {
                    versamento(currentUser);
                } else if (menu === 2) {
                    prelievo(currentUser);
                } else if (menu === 3) {
                    eseguiBonifico(currentUser);
                } else if (menu === 4) {
                    saldoAttuale(currentUser);
                } else if (menu === 5) {
                    storicoMovimenti(currentUser);
                } else if (menu === 6) {            //modifica per debug
                    alert(`Arrivederci ${user}`);
                    break;
                } else{
                    alert("Scelta non valida");
                    continue;
                }
            }
            break;
        }
    }

    if (currentUser === null) {
        alert("Errore, riprova!!!")
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

            // === LISTA CONTI ===
            let lista = "=== LISTA CONTI ===\n";
            for (let acc of accounts) {
                lista += `${acc.username}: €${acc.saldo.toFixed(2)}\n`;
            }
            alert(lista);
          

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

            for (let acc of accounts){
                if(acc.username === nuovoUser || acc.pin === nuovoPin){   // modifica per debug
                    alert("Errore: Username o PIN già esistenti!");
                    return
                }
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

    if (destinatario.username === "admin"){
        alert("Errore: Non puoi fare un bonifico all'admin!"); //nuovo if per debug
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

    utenteCorrente.saldo -= importo;
    destinatario.saldo += importo;

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