# iCharts

## Running

### iOS

First, meet the [requirements](http://facebook.github.io/react-native/docs/getting-started.html#requirements) on the getting started guide.

Then, check out the repository and run the following inside it:

`$ npm install`

Open `iCharts/ios/iCharts.xcodeproj`, follow these [instructions](https://github.com/react-native-community/react-native-linear-gradient) to add react-native-linear-gradient to the project, and hit run.

If you have errors compiling due to linking errors, removing the derived data may help. Quit Xcode, delete `/Users/{you}/Library/Developer/Xcode/DerivedData`, and re-open Xcode.

## Style Guide

### Code

#### General

* **Most important: Look around.** Match the style you see used in the rest of the project. This includes formatting, naming things in code, naming things in documentation.
* Add trailing commas,
* 2 spaces for indentation (no tabs)
* "Attractive"

#### JavaScript

* Use semicolons;
* `'use strict';`
* Prefer `'` over `"`
* Do not use the optional parameters of `setTimeout` and `setInterval`
* 80 character line length

#### JSX

* Prefer `"` over `'` for string literal props
* When wrapping opening tags over multiple lines, place one prop per line
* `{}` of props should hug their values (no spaces)
* Place the closing `>` of opening tags on the same line as the last prop
* Place the closing `/>` of self-closing tags on their own line and left-align them with the opening `<`

#### Objective-C

* Space after `@property` declarations
* Brackets on *every* `if`, on the *same* line
* `- method`, `@interface`, and `@implementation` brackets on the following line
* *Try* to keep it around 80 characters line length (sometimes it's just not possible...)
* `*` operator goes with the variable name (e.g. `NSObject *variableName;`)
