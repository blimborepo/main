function toggle_dropdown(element) {
    //console.log("Toggling dropdown for:", element);
    element.classList.toggle("active");
    var content = element.nextElementSibling;

    if (content.style.maxHeight) {
        element.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/60/60781.png";
        content.style.maxHeight = null;
    } else {
        element.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/566/566094.png')";
        content.style.display = "block";
        content.style.maxHeight = content.scrollHeight + "px";
        
        // Recalculate the height for all parent elements
        var parentContent = content.parentNode;
        while (parentContent.classList.contains("content")) {
        parentContent.style.display = "block";
        parentContent.style.maxHeight = parseInt(parentContent.style.maxHeight) + parseInt(content.scrollHeight) + "px";
        parentContent = parentContent.parentNode;
        }
    }
}

//create dropdowns from divs
var dropdowns = document.getElementsByTagName("dropset");

for (let i = 0; i < dropdowns.length;) {
    var dropdown = dropdowns[i];

    var dropdown_button = document.createElement('button');
    dropdown_button.classList.add('dropdown-button');

    var dropdown_title = document.createElement('span');
    dropdown_title.classList.add('dropdown-text');
    dropdown_title.innerHTML = dropdown.getAttribute('title');;
    dropdown_button.appendChild(dropdown_title);

    var dropdown_content = document.createElement('div');
    dropdown_content.classList.add('content');

    dropdown_content.innerHTML = dropdown.innerHTML;
    dropdown.insertAdjacentElement('afterend', dropdown_content);
    dropdown.insertAdjacentElement('afterend', dropdown_button);

    if (dropdown.classList.contains('active')) {
        dropdown_button.classList.add('active');
    }

    dropdown.remove();

    dropdown_button.addEventListener("click", function() {
        toggle_dropdown(this)
    });
};

//open all dropdowns toggled by default
document.addEventListener("DOMContentLoaded", function() {
    window.onload = function() {
        let actives = Array.from(document.getElementsByClassName("active"));
        for (let i = 0; i < actives.length; i++) {
            actives[i].classList.toggle("active");
            toggle_dropdown(actives[i])
        }
    }
});

document.getElementsByClassName("top-gif")[0].style.backgroundImage = "url('https://desu-usergeneratedcontent.xyz/co/image/1717/96/1717966876506.gif";

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

const last_updated_date = new Date(last_updated);
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
document.getElementById("last-updated").textContent += `${formattedDate}`; //(${timeDifferenceString} ago)