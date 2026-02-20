# Bug Report codice gruppo 1

ID | Tipo    | Descrizione del Bug                                  | Step per riprodurlo
---|---------|------------------------------------------------------|----------------------
01 | Minore  | Uscita dal Menu utente per ogni input non valido     | 1. Login Utente
   |         |                                                      | 2. Qualsiasi input nel menu diverso da 1,2,3,4 e 5
------------------------------------------------------------------------------------------------------
02 | Normale | Possibile Bonifico all Admin                         | 1. Login Utente
   |         |                                                      | 2. Opzione Bonifico (3)
   |         |                                                      | 3. Scrivere "admin"
   |         |                                                      | 4. Scegliere importo da mandare
------------------------------------------------------------------------------------------------------
03 | Minore  | Stampa dello storico poco leggibile per l'utente     | 1. Login Utente
   |         |                                                      | 2. Effettuare un operazione tra prelevio, versamento o bonifico
   |         |                                                      | 3. Visulalizza storico(5)
------------------------------------------------------------------------------------------------------
04 | Normale | Si possono creare account con lo stesso nome e pin   | 1. Login admin
   |         |                                                      | 2. crea utente (3)
   |         |                                                      | 3. Inserire un nome gia utilizzato e magari con lo stesso pin
------------------------------------------------------------------------------------------------------
05 | Normale | La funzione Lista conti dell'admin non funziona      | 1. Login admin
   |         |                                                      | 2. Lista conti (1)
