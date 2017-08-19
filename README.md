# Alexa Cheats
This project provides a web and print-friendly front-end for interacting with cheatsheets, specifically for Amazon Alexa commands. It can be used with any cheatsheet in Markdown format that is hosted on GitHub Gist, though it's designed for use with Alexa voice command cheatsheets.

View it through the app here:  
https://ugotsta.github.io/alexa-cheats/

The actual cheatsheet itself (alexa-cheats.md) is located here:  
https://gist.github.com/Ugotsta/2a06603706fd7c2eb5c93f34ed316354

The front-end provides an info panel to help with navigation. It can be hidden by pressing <kbd>?</kbd> or <kbd>h</kbd>.

Url parameters can be used for added control:  
https://ugotsta.github.io/alexa-cheats/?columns=3

Up to 4 columns are currently allowed. Sections can be dragged around (kudos to the [Dragula](https://bevacqua.github.io/dragula/) project devs) for easier access and especially for getting things neatly arranged before printing.

## Command format
The alexa-cheats.md file holds all the key details (commands, questions, etc). The file follows standard Markdown rules along with the following for best practice.

Commands are arranged in sections with a descriptive header:  
`## Time and Date`

Each command should be added under headers as unordered list items using '- ':  
`- Command.`

Emphases (asterisks) are used to designate authors, song/movie titles and other special notes:  
`"Alexa, do you know Hal?" *- 2001*`

Strong emphases (double underscores) and forward slashes designate variations:  
`__Hawaii/Paris/London__`
