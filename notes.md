In requirements, the user will need a modern browser (chrome, firefox, etc, not old IE) to 
run es2015 style syntax etc.

You should state up front any assumed knowledge. i.e. How much javascript should I know, is 
this for complete beginners (probably not)?

How comfortable should they be with npm etc?

I feel like the first video finishes slightly abruptly. This also happens in 
some others. You might want to finish some of the others by restating what you 
achieved in the video and what you will do in the next. With reference with the 
first video I think rephrasing with something along the lines of, the aim of 
the of this course is such that should you be required to craft a test-driven 
solution to an interview problem, you'll have a solid understanding of the tdd 
process to do attack the problem confidently.

When outlining jest, I would perhaps include a clip of the jest 
documentation. and show the user where to go. Maybe reference which version 
you are using. Currently its the latest, but in the future it won't be, so 
should a user do this course in a year, they might want to be aware if the 
code of the course is with v24.9.

Definitions file - small issue, but text on my computer overflows mid 
character. (see definitions-overflow.png)

In system setup - perhaps explain that they need to click the resources 
folder, and explain that they will need to clone the git repo and work from 
the folder there. I would probably reference the github repo directly in your 
video and put a link or the url of the repo.

This is super nitpicky and probs not that important, I would change the file 
name of index to be .html rather than have .htm

I would add a jest:watch command in npm scripts so that they can easily reuse 
the command later.

I would add a section explaining the core components of a test-runner before 
diving in to the code. e.g. describe, it / test, hooks, and how scopes work in 
testing.

Might be worth while explaining what a unit test is, in contrast to integration 
and e2e tests for example.

I've encountered the idea of 'triangulation' which captures the tdd process 
well. You mention the clean code rules etc where you should only write the 
miniumum necessary and so on. 

Section 2

part 5:

Wrapping the cell in a Boolean isn't required. it's more explicit, but 0 and 1 
convert to false and true implicitly.

For the isAlive testing I would probably have written 'it / test' blocks for 
each of the criteria of the cycle of life algorithm. Just to be explicit.

part 6:

This feels fine

part 7:

This is a very long video. It should probably be split up.

I think it could be split up in this way:
  - regenerate function - with initial test
  - move on to second part of regenerate function with countNeighbours
    - 2 * 2 grid
  - 3 * 3 grid
  - refactor

regenerate function, I would stub in pseudo code how I am going to tackle it 
up front perhaps. while probably closer to how alot of people work in real 
life. when you first write the mapping function, the test which is initially 
just written as `test('should', () => ...)` is no longer driving the 
development.

For the first test I would write it like so instead of using generate

```javascript
  test('should kill live cells with no neighhbours', () => {
    const cells = [1] // a single live cell in 1 x 1 grid
    const expectedCells = [0] // a single dead cell in same size grid
    expect(regenerate(cells)).toEqual(expectedCells)
  })
```
I've now seen that you roughly write your later test this way. I would do 
the same too here for ease and consistency

when you skip the test using xtest, I would explain what it's doing, and 
perhaps explain that test.skip is equivalent and also the opposite, test.only
allows you to focus on a specific test. (I realise you do this later on, 
but still think explaining equivalents would be valuable)

Need to refactor the description of the first countNeighbours test when you 
notice the logic was initially wrong. 'should count 1 for array of one'. Shoyld 
be 0. Just checked in source code and this is still wrong.

Should you write tests for any helper functions. add? for example. Perhaps not 
as you aren't currently exposing it within window.game. but it is defined in 
the global scope of the application anyhow so another team member should one 
exist (hypothetical) might start  using it. Perhaps now is a good time to 
mention that your tests should be testing the api, i.e. inputs and outputs, not 
implementation details, as these can and will change. Not testing add would be 
inline with classing it as an implementation detail.

in tests of countNeighbours, is it worth adding another describe block level to 
indicate the size of the grid under test. (I've stuctured mine this way)

I really like the way you got countNeighbours and then refactored into 
rightColumn, leftColumn etc. 👍 That really drives home the whole point of tdd. 
get something working and then make more elegant as you did. Only thing that 
might be missing is explicit mention of the whole "red, green, refactor" phrase.

General note which I forgot to add the other day:
I don't think you've mentioned the 3a's of unit testing
- arrange
- act
- assert

Other possible thing to mention but potentially less important is the testing triangle,
Where large proportion of tests should be unit tests, with integration tests being second, and the top being slow e2e tests.

Section 3
part 8:

I think most of this is really good. In the video you have a type with the div tag not 
being closed by a div tag, it says grid. But I see you've caught this as source code 
is correct.

I think at the end of the video, when transitioning the grid to have rows, alot of assertions and criteria are being tested in one test block. Personally I think these assertions should either be independently, potential for using another describe block with a beforeEach to set the tests up. Some say (although I'm yet to see someone do this in real life), that you should have one assertion per test.

Perhaps the row stuff should be split into it's own test.

I think draw grid should be broken up, with drawRow being it's own function. Feel like alot is being done in drawGrid.