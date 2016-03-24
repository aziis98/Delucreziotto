# Delucreziotto
Creato in sostituzione al sito 'campigotto' per giocare le gare a squadre online delle Olimpiadi di Matematica.

Ideal domain: https://www.delucreziotto.com

## Technologies Used
In teoria l'app dovrebbe sfruttare la struttura MVC (Model View Controller) su cui Angular.js si basa.

*Server*:
- Express.js

### View
- Framework: Angular.js
- Css Preprocessor: Less
- JS Preprocessor: Coffescript

## Structure
### Routers

La struttura generale sarà la seguente:

| Path | Description |
| ---  | --- |
| /    | all the static pages |
| /api | all the api code that returns **JSON** data |
| /app | all the webapp code will be go in this route * |

| Method | Path  | Action |
| ---    | ---   | ---    |
|  GET  | / | get the homepage (corrispondente alla pagina di "Progetto Phi^2") |
|  GET  | /api | get the whole app |
|  GET  | /api/:match | get match json data (*only safe data*) |
|  GET  | /api/:match/:key | get team specific json data (*only safe data*) |
|  POST  | /api/action | post an action to the server * |

\* = Vedi paragrafo sotto

### Actions
Qui è spiegato come è strutturata una richiesta di azione al server.

```javascript
var request = {
  type: '???'
}
```

### Model
Legenda: **type : label**, 42 = any number, 3.14 = any decimal

```javascript
var model = {
  matches: {
    'hash:matchKey': {
      teams: {
        'hash:teamKey': {
          name: 'string:Euclidei'
        }
      },
      actions: [
        {
          type: 'set-jolly',
          time: new Date(), // a date to tell when the command should be located in the time line
          
          questionIndex: 42
        }
      ]
    }
  }
}
```

## Code Specifics
To simplify things I've added a polyfill* for to the Date prototype, esempio:
```javascript
var a = new Date();
a.minutes(10); // Sets the minutes to 10 -- Setter polyfill
var am = a.minutes(); // Gets the minutes of the Date -- Getter polyfill
```

\* = is polyfill the right term?

## Webapp

| Path     | Description |
| ---      | --- |
| /app | renders the main app page (dove si possono creare nuove partite, decidere se assistere ad una partita già in corso oppure partecipare ad una partita come squadra. Sarà anche presente una lista con le partite recenti e future) |
| /app/:match | used for the direct link to the match (for spectators). Here every one can watch a match |
| /app/:match/:team | direct link to the team setting page, here the team can choose the "Jolly" and answer questions |

Userò AngularJS solo lato client e nessun 'template engine' lato server
