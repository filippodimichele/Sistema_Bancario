# Bug Report codice gruppo 2

ID | Tipo    | Descrizione del Bug | Step per riprodurlo
---|---------|----------------------|----------------------
01 | Normale | Bonifico a utente inesistente → l’alert “Receiver not found” non sempre appare | 1. Login  
   |         |                      | 2. Bonifico → inserire nome inesistente  
   |         |                      | 3. L’alert non compare o compare in modo errato  
02 | Normale| Login fallito mostra più volte “fail… try again loser!” 
                                    | 1. Login  
   |         |                      | 2. Inserire username inesistente  
   |         |                      | 3. Messaggio ripetuto più volte  
03 | Normale | Creazione account admin senza validazione (username duplicati, PIN vuoti, ecc.) | 1. Login admin  
   |         |                      | 2. Add Account  
   |         |                      | 3. Inserire dati non validi  
   |         |                      | 4. L’account viene comunque creato  