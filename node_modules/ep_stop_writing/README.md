# ep_stop_writing

Pad authors can send a message to all other pad editors to stop them writing.

## How to use

* Click the "Stop Writing" icon in the editbar, this will pop up a "Stop Writing" screen on other authors browsers

## Set as disabled by default

1. Open `settings.json`
2. Append:
   `"ep_stop_writing" : {
      "disabled_by_default" : true
    }
   `

##Todo
* Only allow pad creator or so to be able to see the "Stop writing" button
* Fancy UI
* Allow string replacements for Stop writing and continue writing button

