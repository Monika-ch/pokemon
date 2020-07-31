This project [**POKEMON**](https://monika-ch.github.io/pokemon) was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Game objective
 -  The goal of the game is to make a powerful pokemon team before your opponent. A powerful team is one with cumulative **EXP > 2200**
    or one which has **4 sets of different types**.
    
 -  To make a set, collect 3 pokemon of the same type, i.e. **1 complete set = 3 cards of same pokemon types**.
    For example, 3 different pokemons of water type will complete a set.


## Game rules
 -  Each player gets 7 random pokemon cards to begin with.
 
 -  On the turn a player can either:
    - PICK a random card from Card-Deck (by clicking on the `pokeball` image)
    - DISCARD a card (Remember a player can only hold **7 cards** in hand at a time)
    - SWAP a card from the discard pile by clicking on the discard pile followed by click on the card that has to swapped. A swap can
      only be done with a card of **higher EXP value from hand**.
      
 -  Player can press ‘r’ in between the game to recheck on the game rules.
 
 
## Highlights
 -  Pokemon is based on React.
 -  Functional components hold logic and functionality of the game.
 -  Presentational components control the configs of the game.
 -  API fetch from [Rest API](https://pokeapi.co/api/v2/pokemon/) works at the background of the home page load.
 -  Redux is used to store data obtained from API fetch.
 
 
## Deployed Pokemon Game
   Do check out my [Pokemon](https://monika-ch.github.io/pokemon) game. Play now, to win the battle against your opponent. If you like my
   game, dont forget to star it and give it reviews.
   

   ![Image of Pokemon Home Page](https://Monika-ch/pokemon/public/pokehome.png)
   ![Image of Pokemon Game Page](https://Monika-ch/pokemon/pokemon/public/pokegame.png)

 ### Credits:
 
   Paul Hallett and [PokéAPI](https://pokeapi.co/) contributors. Pokémon and Pokémon character names are trademarks of Nintendo.
