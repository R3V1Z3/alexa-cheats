# Alexa Cheats
An accessible, print-friendly way to interact with cheatsheets for Amazon Alexa commands. This project comprises a viewer and a cheatsheet file formatted with [Markdown](https://en.wikipedia.org/wiki/Markdown) and hosted through GitHub Gist.

View it through the app here:  
https://ugotsta.github.io/alexa-cheats/

The actual cheatsheet itself (alexa-cheats.md):  
https://gist.github.com/Ugotsta/2a06603706fd7c2eb5c93f34ed316354

## Controls
The front-end provides an info panel to help with navigation and provide additional details. Besides a total command count, it includes a link to the Gist document being viewed and a table of contents. Easily jump to sections by clicking the name in the table of contents, or toggle the sections from view using the dash symbol to the right of the name.

The info panel can be toggled by pressing <kbd>?</kbd> or <kbd>h</kbd>.

### URL Parameters

URL parameters can be used for added control, for example:  
https://ugotsta.github.io/alexa-cheats/?columns=1

Up to 4 columns are currently allowed. Sections can be dragged around (kudos to the [Dragula](https://bevacqua.github.io/dragula/) project devs) for easier access and especially for getting things neatly arranged before printing.

Change the overall font-size using the fontsize parameter:
https://ugotsta.github.io/alexa-cheats/?fontsize=80

View other documents by specifying a GitHub Gist ID:
https://ugotsta.github.io/alexa-cheats/?gist=4907dd4e07dcf10ee8cde13f19b027e7

#### Combining Parameters

URL Parameters can also be combined using an ampersand:
https://ugotsta.github.io/alexa-cheats/?fontsize=80&columns=3

## Command Format
The alexa-cheats.md file holds all the key details (commands, questions, etc). The file follows standard Markdown rules along with the following for best practice.

Commands are arranged in sections with a descriptive header:  
`## Time and Date`

Each command should be added under headers as unordered list items using '- ':  
`- Command.`

Emphases (asterisks) are used to designate authors, song/movie titles and other special notes:  
`"Alexa, do you know Hal?" *- 2001*`

Strong emphases (double underscores) and forward slashes designate variations:  
`__Hawaii/Paris/London__`
