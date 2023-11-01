const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors'); 
const app = express();

app.use(bodyParser.json());

app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const EntrySchema = new mongoose.Schema({
  title: String,
  text: String,
  userId: String,
  color: String,
  entryDate: String,
  entryTime: String,
  originalEntryDate: Date, 
});


const Entry = mongoose.model('Entry', EntrySchema);


function generateRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const lightness = 80 + Math.floor(Math.random() * 10); 
  return `hsl(${hue}, 50%, ${lightness}%)`;
}


app.post('/api/entries', async (req, res) => {
  try {
    const { title, text, userId } = req.body;
    const color = generateRandomPastelColor();

    const currentDate = new Date();
    const currentDateTime = currentDate.getTime();
    const entry = new Entry({
      title,
      text,
      userId,
      color,
      entryDate: formatDate(currentDateTime),
      entryTime: formatTime(currentDateTime),
      originalEntryDate: currentDate,
    });
    await entry.save();

    res.status(200).json({ message: 'Entry saved successfully', entry: entry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save entry' });
  }
});
function formatTime(timestamp) {
  const entryTime = new Date(timestamp);
  const timeString = entryTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return timeString.replace(/\s/g, '').toLowerCase();
}


function formatDate(timestamp) {
  const entryTime = new Date(timestamp);

  function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  const day = entryTime.getDate();
  const month = getMonthName(entryTime.getMonth());
  const year = entryTime.getFullYear();
  const hour = entryTime.getHours();
  const minute = entryTime.getMinutes();

  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
  const formattedTime = entryTime.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const timeWithoutSpace = formattedTime.replace(/\s/g, '').toLowerCase();

  return `${dayWithSuffix} ${month} ${year}, ${timeWithoutSpace}`;
}

function getMonthName(monthIndex) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
}

const timestamp = Date.now(); 
const formattedDate = formatDate(timestamp);
console.log(formattedDate);


function getMonthName(month) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[month];
}


function updateEntryDate() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  Entry.updateMany(
    {
      originalEntryDate: { $lt: yesterday },
    },
    {
      $set: { entryDate: formatDate(currentDateTime) },
    },
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${result.modifiedCount} entries updated to regular format.`);
      }
    }
  );
}



app.get('/api/entries/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const entries = await Entry.find({ userId });
      if (!entries) {
        return res.status(404).json({ message: 'No entries found' });
      }
      res.status(200).json({ entries });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch entries', error: error.message });
    }
  });

  app.get('/api/entry/:entryId', async (req, res) => {
    try {
      const entryId = req.params.entryId;
      const entry = await Entry.findById(entryId);

      if (!entry) {
        return res.status(404).json({ message: 'Entry not found' });
      }

      res.status(200).json(entry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch entry', error: error.message });
    }
  });

app.put('/api/entry/:entryId', async (req, res) => {
    try {
      const entryId = req.params.entryId;
      const updatedEntry = req.body; 
      const result = await Entry.findByIdAndUpdate(entryId, updatedEntry, { new: true });

      if (!result) {
        return res.status(404).json({ message: 'Entry not found' });
      }

      res.status(200).json({ message: 'Entry updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update entry', error: error.message });
    }
  });
  app.delete('/api/entries', async (req, res) => {
    try {
      const { entryIds } = req.body;
      const result = await Entry.deleteMany({ _id: { $in: entryIds } });
      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Entries deleted successfully' });
      } else {
        res.status(404).json({ message: 'No entries found to delete' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete entries', error: error.message });
    }
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  console.log('MONGODB_URI:', process.env.MONGODB_URI);