import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import taskManagerRoutes from './routes/taskManager.ts';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', taskManagerRoutes);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } as any)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5001, () => console.log('Task Manager server running on port 5001'));
  })
  .catch(err => console.error('MongoDB connection error:', err)); 

//   The purpose of using Postman in this workflow was to **test and verify that your backend API for the Task Manager is working correctly** before connecting it to your frontend.

//   ### Here’s why this is important:
  
//   ---
  
//   ## 1. **API Verification**
//   - **POST** requests to `/api/session` ensure you can save new task sessions (with subtasks and messages) to MongoDB.
//   - **GET** requests to `/api/sessions` ensure you can retrieve all saved sessions from MongoDB.
  
//   ---
  
//   ## 2. **Debugging**
//   - By using Postman, you can easily see if your backend is:
//     - Accepting and storing data correctly
//     - Returning the expected data format
//     - Handling errors properly
//   - This helps you catch backend issues early, before you write or debug frontend code.
  
//   ---
  
//   ## 3. **Backend-Frontend Separation**
//   - You can confirm your backend is solid and reliable, so if you have issues later, you’ll know they’re in the frontend, not the backend.
  
//   ---
  
//   ## 4. **Faster Development**
//   - You can quickly test different payloads, see responses, and iterate on your backend without having to change or reload your frontend.
  
//   ---
  
//   ## 5. **Documentation**
//   - Postman collections can serve as living documentation for your API, making it easier for you (or teammates) to understand and use your backend endpoints.
  
//   ---
  
//   **In summary:**  
//   **Postman was used to confirm that your backend API and MongoDB are working as expected, so you can confidently move on to frontend integration.**  
//   This is a best practice in modern web development!
  
//   Let me know if you want to proceed with the React integration or have any other questions!