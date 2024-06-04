Hello! 

This is my little project to develop my React and Next.js skills and whatever else I am currently learning.
It’s very small and **very much a work in progress** (It's my sandbox), I took the user stories from here as a starting point:  https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-drum-machine and have been slowly adding more functionality - starting with a feature to create your own ‘Drum Machine’ by recording your own sound effects via the MediaRecorder API (I created a custom React hook for this).

**What I aware of that needs immediate work before we can progress to the next big piece of work**:

- Probably make better use of built in React Types
- Styling and create Storybook stories for existing components
- Refactor work so far into custom hooks/separate layer at least - get biz logic out of UI
- Improve error handling/make consistent
- Probably should plan a way to moderate user generated content/protect against abuse (people could record any old thing!) before this is available publicly,

**Next big piece of work planned:**  
Sync data from client app in IndexedDB with a server datastore - PROB USE GRAPHQL

**Where to view online:** https://rockin-drum-machine.vercel.app/  

**How to run locally:**

    cd rockin-drum-machine 
    npm i
    npm run dev  
    
    open http://localhost:3000/

Thanks for reading 🙂 