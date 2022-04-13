# race-js
Love race conditions? Miss them in JS? You've come to the right place!

## Ok what?
As I've been programming more and more in JS, I've really began to miss race conditions.
It's a huge bummer that all of my operations are almost guaranteed to be atomic and
will act as intended. But fear not! With a little elbow grease and some (basic) event
loop knowledge we can fix that!

## But how?
It's simple, really. One way to think of `async/await` is that `await` allows us to
hint to the JS runtime that it's a good time to do a context switch. All we have to do
is tell JS it's a good time to context switch when it's really a bad time. Devious!

## How can we fix it?
How else do we fix race conditions other than mutexes (mutices?)! We used our knowledge
of the JS runtime to get ourselves into this mess, so we can use it to get out as well.
Programming in JS never felt so good.

## What's in this repo?
Explore the commit history on master to watch JS slowly transform into an async-y language
to a thread-y language. It displays a simple website with a button which calls increment
on a counter 100x. However, the counter doesn't seem to work. Follow our journey as we
spiral down into synchronous hell.
