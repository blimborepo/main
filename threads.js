var threads = [143975428, 144000789, 144052342, 144104722, 144115354] //last in list is latest, you retard

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
    
    var tag_starts_at = parent_html.indexOf('<ref', 0)
    var tag_ends_at = parent_html.indexOf('>', tag_starts_at)+1
    
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