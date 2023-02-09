IMPORTANT NOTICE. PROJECT STATUS: IN DEVELOPMENT (90% DONE)

Greetings.

The project is about using the full React functionality. The main goal is to show what technologies I have studied and successfully applied in practice:

•	The project consists entirely of functional components and uses many of React hooks: useState, useEffect, useReducer, useCallback, useRef, etc.
•	The application supports theme (dark/light) and nav panel orientation (top/aside) change (done with React.createContext and useContext hook). 
•	Applied React Router to enable client side routing.
•	Used Portals to create a modal component.
•	The application consumes REST API with Fetch API (HTTP requests GET, POST, PATCH, DELETE): created registration and login forms with validation (for example, some inputs check asynchronously whether a user with the same nickname or email exists on the server). Developed useFormValidator custom hook without the use of third-party libraries. It is also possible to change your profile data in the user's cabinet.
•	Created a chat component in which an authorized user can send messages and read messages posted by other users. The current user can only edit or delete messages sent by him. The edited message will be displayed with a "changed" flag. A new message (if it exists) will be requested from the server and displayed after any message is deleted.
•	The application also supports pagination: the chat component does not receive all messages from the server, but only a certain number. You can get more messages by clicking the show more button.
•	Created two pages using the same form component, but in one state is managed by the useReducer hook, and in the other by Redux TLK. The form also has a change counter block in which you can decrease/increase the value of the counter, while the previous value will be saved and displayed (created with React.memo).
•	Additionally used 3rd-party libraries (Ant Design/Font Awesome).

In the project directory, you can run:

### `npm run start:all`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Runs JSON server. 
Open [http://localhost:3001/posts](http://localhost:3001/posts) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.