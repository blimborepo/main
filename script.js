document.getElementsByClassName("top-gif")[0].style.backgroundImage = "url('https://desu-usergeneratedcontent.xyz/co/image/1718/03/1718034770816.gif";

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

//link images from /co/ back to /co/
var co_images = Array.from(document.getElementsByClassName("co-image"));
co_images.forEach(function(co_image) {
    co_image.setAttribute('src', 'https://desu-usergeneratedcontent.xyz/co/image/' + co_image.getAttribute('desu'))
    let link = document.createElement('a');
    let thread_to_link = null;
    threads.forEach(function(thread) {
        if (thread < parseInt(co_image.getAttribute('post'))) {
            thread_to_link = thread;
        }
    })
    link.setAttribute('href', 'https://desuarchive.org/co/thread/'+String(thread_to_link)+'/#'+co_image.getAttribute('post'))
    co_image.insertAdjacentElement('beforeBegin', link);
    link.appendChild(co_image);
})

// /co/ references ---- <ref>
var refs = document.getElementsByTagName("ref");
for (let i = 0; i < refs.length;) {
    let ref = refs[i];
    let posts = ref.getAttribute('post').replace(/\s/g, "").split(',');
    let post_links = [];
    posts.forEach(function(post) { // get thread the post was from
        post_thread = 0
        threads.forEach(function(thread) {
            if (thread < parseInt(post)) {
                post_thread = thread
            }
        })
        post_links.push(String(post_thread)+'/#'+post);
    })

    var parent_html = ref.parentNode.innerHTML
    
    var tag_appears_at = parent_html.indexOf(ref.getAttribute('post'))
    var tag_ends_at = parent_html.indexOf('>', tag_appears_at)+1
    var tag_starts_at = parent_html.lastIndexOf('<', tag_appears_at)
    
    var last_word_start = parent_html.lastIndexOf(' ', tag_starts_at)
    
    var last_word = parent_html.slice(last_word_start, tag_starts_at)
    var html_without_last_and_tag_start = parent_html.slice(0, last_word_start)
    var html_without_last_and_tag_end = parent_html.slice(tag_ends_at, parent_html.length)

    let reference_html = ' <span style="white-space: nowrap;">'+last_word+'<sup class="reference">['
    post_links.forEach(function(post_link, i){
        if (i>0) {
            reference_html += ']['
        }
        reference_html += '<a href=https://desuarchive.org/co/thread/'+post_link+'>'+posts[i]+'</a>';
    }) 
    reference_html += ']</sup></span>'

    ref.parentNode.innerHTML = html_without_last_and_tag_start + reference_html + html_without_last_and_tag_end;
}

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
let timeDifferenceString = "";
if (days > 0) timeDifferenceString += `${days} days `;
if (hours > 0) timeDifferenceString += `${hours} hours `;
if (minutes > 0) timeDifferenceString += `${minutes} minutes `;
if (seconds > 0) timeDifferenceString += `${seconds} seconds`;

// Display the formatted date with the time difference
console.log(last_updated_date)
document.getElementById("last-updated").textContent += `${formattedDate}`//(${timeDifferenceString} ago)`

//set current thread to last thread in the threads list
document.getElementById("current-thread").setAttribute('href', 'https://boards.4chan.org/co/thread/'+String(threads[threads.length-1]))