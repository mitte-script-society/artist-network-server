# Artist Connection Project (Frontend)

- Description
  - This is the Express Backend for our Artist Connection Project. The idea is that artists can sign up and be listed in a publicly available database. Users can then book artists in their town for a live concert.
  - We used Cloudinary API for the image upload of the users and socket.io for Web Sockets and the Chat Implementation
  - A repository with the frontend code can be found here: https://github.com/mitte-script-society/artist-network-client

- Instructions to run this app in my computer.
  - git clone
  - install dependencies (`npm install`)
  - create a `.env` file with`
    `VITE_API_URL=http://localhost:5005`
    `PORT=5005`
    `ORIGIN=http://localhost:5173`
    `TOKEN_SECRET=[defined by you]`
    `CLOUDINARY_NAME = [your cloudinary name]`
    `CLOUDINARY_KEY = [your cloudinary API]`
    `CLOUDINARY_SECRET = [your cloudinary secret]`
  - run the application (`npm run dev`)

- Demo
  - Netlify: https://artist-connection.netlify.app/
  - API: https://artistconnection-api.adaptable.app/