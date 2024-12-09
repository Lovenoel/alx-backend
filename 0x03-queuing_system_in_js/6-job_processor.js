// 6-job_processor.js
const kue = require('kue');

// Create Kue queue
const queue = kue.createQueue();

/**
 * Function to send notifications
 * @param {string} phoneNumber - The phone number to send the notification to
 * @param {string} message - The notification message
 */
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs in the 'push_notification_code' queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;

  try {
    sendNotification(phoneNumber, message);
    done();
  } catch (error) {
    done(error);
  }
});
