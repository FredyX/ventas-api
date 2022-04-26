const { loadSuscriptionsByDay, sendEmails } = require('./pdf.js');
const path = require('path');

let cron = require('node-cron');

const startConcurrent = async () => {
    cron.schedule('0 6 * * Monday', async () => {
        ret = await loadSuscriptionsByDay('L')
        return sendEmails(ret);
    },
        {
            scheduled: true,
            timezone: "America/Tegucigalpa"
        });
    cron.schedule('0 6 * * Tuesday', async () => {
        ret = await loadSuscriptionsByDay('M')
        return sendEmails(ret);
    },
        {
            scheduled: true,
            timezone: "America/Tegucigalpa"
        });
    cron.schedule('0 6 * * Wednesday', async () => {
        ret = await loadSuscriptionsByDay('X')
        return sendEmails(ret);
    },
        {
            scheduled: true,
            timezone: "America/Tegucigalpa"
        });
    cron.schedule('0 6 * * Thursday', async () => {
        ret = await loadSuscriptionsByDay('J')
        return sendEmails(ret);
    },
        {
            scheduled: true,
            timezone: "America/Tegucigalpa"
        });
    cron.schedule('0 6 * * Friday', async () => {
        ret = await loadSuscriptionsByDay('V')
        return sendEmails(ret);
    },
        {
            scheduled: true,
            timezone: "America/Tegucigalpa"
        });
    cron.schedule('0 6 * * Saturday', async () => {
        ret = await loadSuscriptionsByDay('S')
        return sendEmails(ret);
    },
        {
            scheduled: true,
            timezone: "America/Tegucigalpa"
        });
    cron.schedule('0 6 * * Sunday', async () => {
        ret = await loadSuscriptionsByDay('D')
        return sendEmails(ret);
    },
        {
            scheduled: true,
            timezone: "America/Tegucigalpa"
        });
    cron.schedule('0 23 * * Sunday', async () => {
        fs.readdir(path.join(__dirname, '../public/pdf/'), (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(path.join(__dirname, '../public/pdf/'), file), err => {
                    if (err) throw err;
                });
            }
        });
    });
    //para probarlo
    cron.schedule('0 * * * *', async () => {
        ret = await loadSuscriptionsByDay('L')
        return sendEmails(ret);
    });
}


module.exports = {
    startConcurrent
}