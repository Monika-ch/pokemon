This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# Game objective
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
 
 
### Project Highlights
 -  Based on React
 -  API fetch at the background of the home page load from ​ Rest API(​ https://pokeapi.co/api/v2/pokemon/​ )
 -  Usage of ​ Redux ​ to store data obtained from API fetch
 -  Functional ​ ​ Components ​ to hold logic and functionality of the game
 -  Presentational ​ ​ Components ​ to control the configs of the game
 -  Moving Background, Hover Effects
 -  Custom CSS - animations included
 -  Usage of ​ React Animation Libraries
 -  Funky Modals ​ (self-designed)


#### UI and Navigation
        The first page is a home page with the different playing modes. There is also a section about the rules of the game. The UI is kept 
     center aligned to give a look and feel of the game. The styling of the title (shadow effect, transforms on text etc) and images to
     give it a funky look. But the page is deliberately kept simple with few limited options to keep the focus on the game. 
    
        Once the user clicks the play vs computer he/she is redirected to the actual game. The game can be played by mouse and is pretty 
     self-explanatory.On game end, the user is given an option to either start a new game or go to the home page.

        Again, there is no menu in the actual game to avoid any distractions and keep the focus on the game. One thing that is missing is an
     option to reset the game, or quit the game and start fresh.
     

 ### Credits:
 
 Paul Hallett and [PokéAPI](https://pokeapi.co/) contributors. Pokémon and Pokémon character names are trademarks of Nintendo
