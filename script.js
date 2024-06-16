//only shit that happens on main page.

//fill past thread list
var threads_list = document.getElementsByClassName("past-threads-list")[0]
threads.forEach(function(thread, index) {
    let link = document.createElement('a');
    link.textContent = ">>"+String(thread);
    if (index === threads.length - 1) {
        link.textContent += ' (Current)'
    }
    link.setAttribute('href', 'https://desuarchive.org/co/thread/'+String(thread))
    let list_item = document.createElement('li');
    list_item.appendChild(link)
    threads_list.appendChild(list_item)
});

// Get the current date and time
const now = new Date();

// Function to determine if the user's locale typically uses day/month/year format
function usesDayMonthYear(locale) {
    const format = new Intl.DateTimeFormat(locale).formatToParts(new Date(2000, 11, 31));
    return format.find(part => part.type === 'day').value === '31';
}

// Get user's locale (language-country code, e.g., "en-US")
const userLocale = navigator.language;

// Determine date format based on locale
const dateOptions = usesDayMonthYear(userLocale) ? 
    { day: '2-digit', month: '2-digit', year: 'numeric' } : 
    { month: '2-digit', day: '2-digit', year: 'numeric' };

const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

function set_last_updated(last_updated_date) {
    // Format the last updated date to user's time zone with appropriate date format
    const formattedDate = `${new Intl.DateTimeFormat(userLocale, dateOptions).format(last_updated_date)} ${new Intl.DateTimeFormat(userLocale, timeOptions).format(last_updated_date)}`;

    // Calculate the time difference in milliseconds
    const timeDifference = now - last_updated_date;

    // Convert time difference to a human-readable format
    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Create a string for the time difference
    let timeDifferences = [];
    if (days > 0) timeDifferences.push(`${days} day${days > 1 ? 's' : ''} `);
    if (hours > 0) timeDifferences.push(`${hours} hour${hours > 1 ? 's' : ''} `);
    if (minutes > 0) timeDifferences.push(`${minutes} minute${minutes > 1 ? 's' : ''} `);
    if (seconds > 0) timeDifferences.push(`${seconds} second${seconds > 1 ? 's' : ''} `);
    timeDifferences.push('');
    //if (minutes > 0) timeDifferenceString += `${minutes} minutes `;
    //if (seconds > 0) timeDifferenceString += `${seconds} seconds`;

    timeDifferenceString = timeDifferences[0] + timeDifferences[1]

    // Display the formatted date with the time difference
    document.getElementById("last-updated").textContent += `${formattedDate}`+` (${timeDifferenceString} ago)`

    //set current thread to last thread in the threads list
    document.getElementById("current-thread").setAttribute('href', 'https://boards.4chan.org/co/thread/'+String(threads[threads.length-1]))
}

const repoOwner = 'blimborepo';
const repoName = 'main';

async function fetchLastUpdatedDate() {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch repository information');
    }
    const data = await response.json();
    const lastUpdatedDate = new Date(data.updated_at);
    set_last_updated(lastUpdatedDate); // Assuming set_last_updated is a function you define elsewhere
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchLastUpdatedDate();

document.getElementsByClassName("top-gif")[0].style.backgroundImage = "url('https://desu-usergeneratedcontent.xyz/co/image/1718/03/1718034770816.gif";