# Delucreziotto
Creato in sostituzione al sito 'campigotto' per giocare le gare a squadre online delle Olimpiadi di Matematica.

Ideal domain: https://www.delucreziotto.com

## Tecnologies Used
In teoria l'app dovrebbe sfruttare la struttura MVC (Model View Controller) su cui Angular.js si basa.

*Server*:
- Express.js

### View
- Framework: Angular.js
- Css Preprocessor: Less
- JS Preprocessor: Coffescript

## Structure
### Routers

| Method | Path  | Action |
| ---    | ---   | ---    |
|  GET  | / | get the homepage (corrispondente alla pagina di "Progetto Phi^2") |
|  GET  | /app | get the whole app |
|  GET  | /app/:match | get match json data (*only safe data*) |
|  GET  | /app/:match/:key | get team specific json data (*only safe data*) |
|  POST  | /app/action | post an action to the server * |

\* = Vedi paragrafo sotto

### Actions
Qui è spiegato come è strutturata una richiesta di azione al server.

```javascript
var request = {
  type: ''
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
