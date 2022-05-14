# odin-calculator

pseudo code project steps

HTML steps
1. create the calculator container with a div
2. create the fixed buttons using div tags with specific IDs
3. create a screen that represents what the user is typing in before an operator and displays the results

divs:
0 1 2 3 4 5 6 7 8 9 + - * / = AC C . plusminus ENTER (19 units)

big screen
little screen

CSS steps
1. use "display: grid" to align the items in the proper format
2. create the default state and keydown & click state (with transition) for the buttons. both keydown/click

javascript steps
1. append a user's keydown/click inputs (initially blank) to a string that shows on the screen while they are typing something
2. lock that value in a string? when they press or click an operator function
3. do the same thing for the user's second inputs/clicks until they hit equals or another operator
4. show the answer on the big screen along

more of the pseudocode

pass the key code as an argument to useButton

useButton 
    checks if the key is an operator (found residing in operator object via operator[key])
        if the key is a operator
            check if the key is "AC"
                if it is "AC"
                    clear the calculator's priorInput, currentInput, and currentOperator
            else if check if it's a math operator ("+-*/") or "=" (equals) operator first
                if it is a math or equals operator
                    check to see if there is already an +-*/ in currentOperator stored
                        if there is a currentOperator stored
                            set the priorInput equal to the result of the stored operator on priorInput and currentInput
                            display the result
                            check to see if the operator was an equals sign
                                if it is
                                    clear the operator
                                if it's not
                                    set the currentOperator equal to the new operator[key]
                    else if there isn't a currentOperator stored
                        check to see if operator[key] is a +-*/ mathmatical operator
                            if it's an operator
                                set the currentOperator equal to the new operator[key]
                        do nothing if it's an equals sign
            else do nothing because we don't know what it is?
    else if it is a number (found residing in number object via number[key])
        if it is a number operator
            check if the number is  %
                if the currentValue contains % already
                    remove the percentage
                else
                    add the percentage to the current number
            else if the number is .
                if the currentValue contains . already
                    do nothing
                else
                    add the .
            else if the number is +-
                if the currentValue contains - already
                    remove the - (from the front)
                else
                    add the - (to the front)
            else
                if the current value contains % already
                    insert the number before the %
                else
                    append the number to the end of current value

reusable functions:

done / setMathOperator(string) // calls isMathOperatorchecks if the string passed is +-*/ or blank and if so, sets the global value of operator to the passed string. if it's blank, sets it to blank.

done / doMath(a, b, operator) // performs a mathmatical operation between a and b based on the passed operator (string) and returns the result of the mathmatical operation.

done / isMathOperator(string) // returns true if the string passed is +-*/ otherwise it returns false

done / isEqualsOperator(string) // returns true if the string passed is = otherwise it returns false

done / foundKey(string, object, key) // returns true if the string passed is a value in the object's key

done / setDisplay(element, string) // displays the string on element using textElement in javascript.

done / containsOperator() // returns true if there is a +-*/ stored in currentOperator, returns false otherwise

done / clearCalculator() // clears the calculator's priorInput, currentInput, and currentOperator and sets screen to blank

done / valueContains(operator) // returns true if the operator is found in the currentValue (specifically % or .)


    if it's a number (residing in number object) then
        append the number or decimal to the currentInput